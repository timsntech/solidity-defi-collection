// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "./abstracts/BaseContract.sol";
import "./Interfaces/IBorrowerOperations.sol";
import "./Interfaces/IVaultManager.sol";
import "./Interfaces/IActivePool.sol";
import "./Interfaces/IFURUSDToken.sol";
import "./Interfaces/ICollSurplusPool.sol";
import "./Interfaces/ISortedVaults.sol";
import "./Interfaces/ILOANStaking.sol";
import "./Dependencies/LiquityBase.sol";
import "hardhat/console.sol";

contract BorrowerOperations is BaseContract, LiquityBase, IBorrowerOperations {

    using SafeERC20Upgradeable for IERC20Upgradeable;
    using SafeMath for uint;

    function initialize() public initializer {
        __BaseContract_init();
    }

    string constant public NAME = "BorrowerOperations";

    // --- Connected contract declarations ---

    IVaultManager public vaultManager;

    address stabilityPoolAddress;

    ICollSurplusPool collSurplusPool;

    ILOANStaking public loanStaking;
    address public loanStakingAddress;

    IFURUSDToken public furUSDToken;

    IERC20Upgradeable public furFiToken;

    // A doubly linked list of Vaults, sorted by their collateral ratios
    ISortedVaults public sortedVaults;

    /* --- Variable container structs  ---

    Used to hold, return and assign variables inside a function, in order to avoid the error:
    "CompilerError: Stack too deep". */

    struct LocalVariables_adjustVault {
        uint price;
        uint collChange;
        uint netDebtChange;
        bool isCollIncrease;
        uint debt;
        uint coll;
        uint oldICR;
        uint newICR;
        uint newTCR;
        uint FURUSDFee;
        uint newDebt;
        uint newColl;
        uint stake;
    }

    struct LocalVariables_openVault {
        uint price;
        uint FURUSDFee;
        uint netDebt;
        uint ICR;
        uint NICR;
        uint stake;
        uint arrayIndex;
    }

    struct ContractsCache {
        IVaultManager vaultManager;
        IActivePool activePool;
        IFURUSDToken furUSDToken;
    }

    enum BorrowerOperation {
        openVault,
        closeVault,
        adjustVault
    }

    // --- Events ---
    event VaultCreated(address indexed _borrower, uint arrayIndex);
    event VaultUpdated(address indexed _borrower, uint _debt, uint _coll, uint stake, BorrowerOperation indexed operation);
    event FURUSDBorrowingFeePaid(address indexed _borrower, uint _FURUSDFee);
    
    // --- Dependency setters ---

    function setAddresses(
        address _vaultManagerAddress,
        address _activePoolAddress,
        address _defaultPoolAddress,
        address _stabilityPoolAddress,
        address _collSurplusPoolAddress,
        address _priceFeedAddress,
        address _sortedVaultsAddress,
        address _furUSDTokenAddress,
        address _loanStakingAddress,
        address _furFiAddress
    )
        external
        onlyOwner
    {
        vaultManager = IVaultManager(_vaultManagerAddress);
        activePool = IActivePool(_activePoolAddress);
        defaultPool = IDefaultPool(_defaultPoolAddress);
        stabilityPoolAddress = _stabilityPoolAddress;
        collSurplusPool = ICollSurplusPool(_collSurplusPoolAddress);
        priceFeed = IPriceFeed(_priceFeedAddress);
        sortedVaults = ISortedVaults(_sortedVaultsAddress);
        furUSDToken = IFURUSDToken(_furUSDTokenAddress);
        loanStakingAddress = _loanStakingAddress;
        loanStaking = ILOANStaking(_loanStakingAddress);
        furFiToken = IERC20Upgradeable(_furFiAddress);
    }

    // --- Borrower Vault Operations ---

    function openVault(uint _maxFeePercentage, uint _FurFiAmount, uint _FURUSDAmount, address _upperHint, address _lowerHint) external override whenNotPaused {
        ContractsCache memory contractsCache = ContractsCache(vaultManager, activePool, furUSDToken);
        LocalVariables_openVault memory vars;
        
        vars.price = priceFeed.fetchPrice();
        bool isRecoveryMode = _checkRecoveryMode(vars.price);

        _requireValidMaxFeePercentage(_maxFeePercentage, isRecoveryMode);
        _requireVaultisNotActive(contractsCache.vaultManager, msg.sender);

        vars.netDebt = _FURUSDAmount;

        if (!isRecoveryMode) {
            vars.FURUSDFee = _triggerBorrowingFee(contractsCache.vaultManager, contractsCache.furUSDToken, _FURUSDAmount, _maxFeePercentage);
            vars.netDebt += vars.FURUSDFee;
        }
        _requireAtLeastMinNetDebt(vars.netDebt);

        vars.ICR = LiquityMath._computeCR(_FurFiAmount, vars.netDebt, vars.price);
        vars.NICR = LiquityMath._computeNominalCR(_FurFiAmount, vars.netDebt);

        if (isRecoveryMode) {
            _requireICRisAboveCCR(vars.ICR);
        } else {
            _requireICRisAboveMCR(vars.ICR);
            uint newTCR = _getNewTCRFromVaultChange(_FurFiAmount, true, vars.netDebt, true, vars.price);  // bools: coll increase, debt increase
            _requireNewTCRisAboveCCR(newTCR); 
        }

        // Set the vault struct's properties
        contractsCache.vaultManager.setVaultStatus(msg.sender, 1);
        contractsCache.vaultManager.increaseVaultColl(msg.sender, _FurFiAmount);
        contractsCache.vaultManager.increaseVaultDebt(msg.sender, vars.netDebt);

        contractsCache.vaultManager.updateVaultRewardSnapshots(msg.sender);
        vars.stake = contractsCache.vaultManager.updateStakeAndTotalStakes(msg.sender);

        sortedVaults.insert(msg.sender, vars.NICR, _upperHint, _lowerHint);
        vars.arrayIndex = contractsCache.vaultManager.addVaultOwnerToArray(msg.sender);
        emit VaultCreated(msg.sender, vars.arrayIndex);

        // Move the FURFI to the Active Pool, and mint the FURUSDAmount to the borrower
        _activePoolAddColl(contractsCache.activePool, _FurFiAmount);
        _withdrawFURUSD(contractsCache.activePool, contractsCache.furUSDToken, msg.sender, _FURUSDAmount, vars.netDebt);

        emit VaultUpdated(msg.sender, vars.netDebt, _FurFiAmount, vars.stake, BorrowerOperation.openVault);
        emit FURUSDBorrowingFeePaid(msg.sender, vars.FURUSDFee);
    }

    // Send FURFI as collateral to a vault
    function addColl(uint _collDeposital, address _upperHint, address _lowerHint) external override whenNotPaused {
        _adjustVault(msg.sender, _collDeposital, 0, 0, false, _upperHint, _lowerHint, 0);
    }

    // Send FURFI as collateral to a vault. Called by only the Stability Pool.
    function moveFURFIGainToVault(address _borrower, uint _collDeposital, address _upperHint, address _lowerHint) external override whenNotPaused {
        _requireCallerIsStabilityPool();
        _adjustVault(_borrower, _collDeposital, 0, 0, false, _upperHint, _lowerHint, 0);
    }

    // Withdraw FURFI collateral from a vault
    function withdrawColl(uint _collWithdrawal, address _upperHint, address _lowerHint) external override whenNotPaused {
        _adjustVault(msg.sender, 0, _collWithdrawal, 0, false, _upperHint, _lowerHint, 0);
    }

    // Withdraw FURUSD tokens from a vault: mint new FURUSD tokens to the owner, and increase the vault's debt accordingly
    function withdrawFURUSD(uint _maxFeePercentage, uint _FURUSDAmount, address _upperHint, address _lowerHint) external override whenNotPaused{
        _adjustVault(msg.sender, 0, 0, _FURUSDAmount, true, _upperHint, _lowerHint, _maxFeePercentage);
    }

    // Repay FURUSD tokens to a Vault: Burn the repaid FURUSD tokens, and reduce the vault's debt accordingly
    function repayFURUSD(uint _FURUSDAmount, address _upperHint, address _lowerHint) external override whenNotPaused {
        _adjustVault(msg.sender, 0, 0, _FURUSDAmount, false, _upperHint, _lowerHint, 0);
    }

    function adjustVault(uint _maxFeePercentage, uint _collDeposital, uint _collWithdrawal, uint _FURUSDChange, bool _isDebtIncrease, address _upperHint, address _lowerHint) external override whenNotPaused {
        _adjustVault(msg.sender, _collDeposital, _collWithdrawal, _FURUSDChange, _isDebtIncrease, _upperHint, _lowerHint, _maxFeePercentage);
    }

    /*
    * _adjustVault(): Alongside a debt change, this function can perform either a collateral top-up or a collateral withdrawal. 
    *
    * It therefore expects either a positive _collDeposital, or a positive _collWithdrawal argument.
    *
    * If both are positive, it will revert.
    */
    function _adjustVault(address _borrower, uint _collDeposital, uint _collWithdrawal, uint _FURUSDChange, bool _isDebtIncrease, address _upperHint, address _lowerHint, uint _maxFeePercentage) internal {
        ContractsCache memory contractsCache = ContractsCache(vaultManager, activePool, furUSDToken);
        LocalVariables_adjustVault memory vars;

        vars.price = priceFeed.fetchPrice();
        bool isRecoveryMode = _checkRecoveryMode(vars.price);

        if (_isDebtIncrease) {
            _requireValidMaxFeePercentage(_maxFeePercentage, isRecoveryMode);
            _requireNonZeroDebtChange(_FURUSDChange);
        }
        _requireSingularCollChange(_collDeposital, _collWithdrawal);
        _requireNonZeroAdjustment(_collDeposital, _collWithdrawal, _FURUSDChange);
        _requireVaultisActive(contractsCache.vaultManager, _borrower);

        // Confirm the operation is either a borrower adjusting their own vault, or a pure FURFI transfer from the Stability Pool to a vault
        assert(msg.sender == _borrower || (msg.sender == stabilityPoolAddress && _collDeposital > 0 && _FURUSDChange == 0));

        contractsCache.vaultManager.applyPendingRewards(_borrower);

        // Get the collChange based on FURFI or not FURFI was sent in the transaction
        (vars.collChange, vars.isCollIncrease) = _getCollChange(_collDeposital, _collWithdrawal);

        vars.netDebtChange = _FURUSDChange;

        // If the adjustment incorporates a debt increase and system is in Normal Mode, then trigger a borrowing fee
        if (_isDebtIncrease && !isRecoveryMode) { 
            vars.FURUSDFee = _triggerBorrowingFee(contractsCache.vaultManager, contractsCache.furUSDToken, _FURUSDChange, _maxFeePercentage);
            vars.netDebtChange = vars.netDebtChange.add(vars.FURUSDFee); // The raw debt change includes the fee
        }

        vars.debt = contractsCache.vaultManager.getVaultDebt(_borrower);
        vars.coll = contractsCache.vaultManager.getVaultColl(_borrower);
        
        // Get the vault's old ICR before the adjustment, and what its new ICR will be after the adjustment
        vars.oldICR = LiquityMath._computeCR(vars.coll, vars.debt, vars.price);
        vars.newICR = _getNewICRFromVaultChange(vars.coll, vars.debt, vars.collChange, vars.isCollIncrease, vars.netDebtChange, _isDebtIncrease, vars.price);
        assert(_collWithdrawal <= vars.coll); 

        // Check the adjustment satisfies all conditions for the current system mode
        _requireValidAdjustmentInCurrentMode(isRecoveryMode, _collWithdrawal, _isDebtIncrease, vars);
            
        // When the adjustment is a debt repayment, check it's a valid amount and that the caller has enough FURUSD
        if (!_isDebtIncrease && _FURUSDChange > 0) {
            _requireAtLeastMinNetDebt(vars.debt.sub(vars.netDebtChange));
            _requireValidFURUSDRepayment(vars.debt, vars.netDebtChange);
            _requireSufficientFURUSDBalance(contractsCache.furUSDToken, _borrower, vars.netDebtChange);
        }

        (vars.newColl, vars.newDebt) = _updateVaultFromAdjustment(contractsCache.vaultManager, _borrower, vars.collChange, vars.isCollIncrease, vars.netDebtChange, _isDebtIncrease);
        vars.stake = contractsCache.vaultManager.updateStakeAndTotalStakes(_borrower);

        // Re-insert vault in to the sorted list
        uint newNICR = _getNewNominalICRFromVaultChange(vars.coll, vars.debt, vars.collChange, vars.isCollIncrease, vars.netDebtChange, _isDebtIncrease);
        sortedVaults.reInsert(_borrower, newNICR, _upperHint, _lowerHint);

        emit VaultUpdated(_borrower, vars.newDebt, vars.newColl, vars.stake, BorrowerOperation.adjustVault);
        emit FURUSDBorrowingFeePaid(msg.sender,  vars.FURUSDFee);

        _moveTokensAndFURFIfromAdjustment(
            contractsCache.activePool,
            contractsCache.furUSDToken,
            msg.sender,
            vars.collChange,
            vars.isCollIncrease,
            _FURUSDChange,
            _isDebtIncrease,
            vars.netDebtChange
        );
    }

    function closeVault() external override whenNotPaused {
        IVaultManager vaultManagerCached = vaultManager;
        IActivePool activePoolCached = activePool;
        IFURUSDToken furUSDTokenCached = furUSDToken;

        _requireVaultisActive(vaultManagerCached, msg.sender);
                
        uint price = priceFeed.fetchPrice();
        _requireNotInRecoveryMode(price);

        vaultManagerCached.applyPendingRewards(msg.sender);

        uint coll = vaultManagerCached.getVaultColl(msg.sender);
        uint debt = vaultManagerCached.getVaultDebt(msg.sender);

        _requireSufficientFURUSDBalance(furUSDTokenCached, msg.sender, debt);

        uint newTCR = _getNewTCRFromVaultChange(coll, false, debt, false, price);
        _requireNewTCRisAboveCCR(newTCR);

        vaultManagerCached.removeStake(msg.sender);
        vaultManagerCached.closeVault(msg.sender);

        emit VaultUpdated(msg.sender, 0, 0, 0, BorrowerOperation.closeVault);

        // Burn the repaid FURUSD from the user's balance
        _repayFURUSD(activePoolCached, furUSDTokenCached, msg.sender, debt);

        // Send the collateral back to the user
        activePoolCached.sendFURFI(msg.sender, coll);
    }

    /**
     * Claim remaining collateral from a redemption or from a liquidation with ICR > MCR in Recovery Mode
     */
    function claimCollateral() external override whenNotPaused {
        // send FURFI from CollSurplus Pool to owner
        collSurplusPool.claimColl(msg.sender);
    }

    // --- Helper functions ---

    function _triggerBorrowingFee(IVaultManager _vaultManager, IFURUSDToken _furUSDToken, uint _FURUSDAmount, uint _maxFeePercentage) internal returns (uint) {
        _vaultManager.decayBaseRateFromBorrowing(); // decay the baseRate state variable
        uint FURUSDFee = _vaultManager.getBorrowingFee(_FURUSDAmount);

        _requireUserAcceptsFee(FURUSDFee, _FURUSDAmount, _maxFeePercentage);
        
        // Send fee to LOAN staking contract
        loanStaking.increaseF_FURUSD(FURUSDFee);
        _furUSDToken.mint(loanStakingAddress, FURUSDFee);

        return FURUSDFee;
    }

    function _getUSDValue(uint _coll, uint _price) internal pure returns (uint) {
        uint usdValue = _price.mul(_coll).div(DECIMAL_PRECISION);

        return usdValue;
    }

    function _getCollChange(
        uint _collReceived,
        uint _requestedCollWithdrawal
    )
        internal
        pure
        returns(uint collChange, bool isCollIncrease)
    {
        if (_collReceived != 0) {
            collChange = _collReceived;
            isCollIncrease = true;
        } else {
            collChange = _requestedCollWithdrawal;
        }
    }

    // Update vault's coll and debt based on whFURFI they increase or decrease
    function _updateVaultFromAdjustment(
        IVaultManager _vaultManager,
        address _borrower,
        uint _collChange,
        bool _isCollIncrease,
        uint _debtChange,
        bool _isDebtIncrease
    )
        internal
        returns (uint, uint)
    {
        uint newColl = (_isCollIncrease) ? _vaultManager.increaseVaultColl(_borrower, _collChange)
                                        : _vaultManager.decreaseVaultColl(_borrower, _collChange);
        uint newDebt = (_isDebtIncrease) ? _vaultManager.increaseVaultDebt(_borrower, _debtChange)
                                        : _vaultManager.decreaseVaultDebt(_borrower, _debtChange);

        return (newColl, newDebt);
    }

    function _moveTokensAndFURFIfromAdjustment(
        IActivePool _activePool,
        IFURUSDToken _furUSDToken,
        address _borrower,
        uint _collChange,
        bool _isCollIncrease,
        uint _FURUSDChange,
        bool _isDebtIncrease,
        uint _netDebtChange
    )
        internal
    {
        if (_isDebtIncrease) {
            _withdrawFURUSD(_activePool, _furUSDToken, _borrower, _FURUSDChange, _netDebtChange);
        } else {
            _repayFURUSD(_activePool, _furUSDToken, _borrower, _FURUSDChange);
        }

        if (_isCollIncrease) {
            _activePoolAddColl(_activePool, _collChange);
        } else {
            _activePool.sendFURFI(_borrower, _collChange);
        }
    }

    // Send FURFI to Active Pool
    function _activePoolAddColl(IActivePool _activePool, uint _amount) internal {
        furFiToken.transferFrom(msg.sender, address(_activePool), _amount);
    }

    // Issue the specified amount of FURUSD to _account and increases the total active debt (_netDebtIncrease potentially includes a FURUSDFee)
    function _withdrawFURUSD(IActivePool _activePool, IFURUSDToken _furUSDToken, address _account, uint _FURUSDAmount, uint _netDebtIncrease) internal {
        _activePool.increaseFURUSDDebt(_netDebtIncrease);
        _furUSDToken.mint(_account, _FURUSDAmount);
    }

    // Burn the specified amount of FURUSD from _account and decreases the total active debt
    function _repayFURUSD(IActivePool _activePool, IFURUSDToken _furUSDToken, address _account, uint _FURUSD) internal {
        _activePool.decreaseFURUSDDebt(_FURUSD);
        _furUSDToken.burn(_account, _FURUSD);
    }

    // --- 'Require' wrapper functions ---

    function _requireSingularCollChange(uint _collDeposital, uint _collWithdrawal) internal pure {
        require(_collDeposital == 0 || _collWithdrawal == 0, "BorrowerOperations: Cannot withdraw and add coll");
    }

    function _requireCallerIsBorrower(address _borrower) internal view {
        require(msg.sender == _borrower, "BorrowerOps: Caller must be the borrower for a withdrawal");
    }

    function _requireNonZeroAdjustment(uint _collDeposital, uint _collWithdrawal, uint _FURUSDChange) internal pure {
        require(_collDeposital != 0 || _collWithdrawal != 0 || _FURUSDChange != 0, "BorrowerOps: There must be either a collateral change or a debt change");
    }

    function _requireVaultisActive(IVaultManager _vaultManager, address _borrower) internal view {
        uint status = _vaultManager.getVaultStatus(_borrower);
        require(status == 1, "BorrowerOps: Vault does not exist or is closed");
    }

    function _requireVaultisNotActive(IVaultManager _vaultManager, address _borrower) internal view {
        uint status = _vaultManager.getVaultStatus(_borrower);
        require(status != 1, "BorrowerOps: Vault is active");
    }

    function _requireNonZeroDebtChange(uint _FURUSDChange) internal pure {
        require(_FURUSDChange > 0, "BorrowerOps: Debt increase requires non-zero debtChange");
    }
   
    function _requireNotInRecoveryMode(uint _price) internal view {
        require(!_checkRecoveryMode(_price), "BorrowerOps: Operation not permitted during Recovery Mode");
    }

    function _requireNoCollWithdrawal(uint _collWithdrawal) internal pure {
        require(_collWithdrawal == 0, "BorrowerOps: Collateral withdrawal not permitted Recovery Mode");
    }

    function _requireValidAdjustmentInCurrentMode (
        bool _isRecoveryMode,
        uint _collWithdrawal,
        bool _isDebtIncrease, 
        LocalVariables_adjustVault memory _vars
    ) 
        internal 
        view 
    {
        /* 
        *In Recovery Mode, only allow:
        *
        * - Pure collateral top-up
        * - Pure debt repayment
        * - Collateral top-up with debt repayment
        * - A debt increase combined with a collateral top-up which makes the ICR >= 150% and improves the ICR (and by extension improves the TCR).
        *
        * In Normal Mode, ensure:
        *
        * - The new ICR is above MCR
        * - The adjustment won't pull the TCR below CCR
        */
        if (_isRecoveryMode) {
            _requireNoCollWithdrawal(_collWithdrawal);
            if (_isDebtIncrease) {
                _requireICRisAboveCCR(_vars.newICR);
                _requireNewICRisAboveOldICR(_vars.newICR, _vars.oldICR);
            }       
        } else { // if Normal Mode
            _requireICRisAboveMCR(_vars.newICR);
            _vars.newTCR = _getNewTCRFromVaultChange(_vars.collChange, _vars.isCollIncrease, _vars.netDebtChange, _isDebtIncrease, _vars.price);
            _requireNewTCRisAboveCCR(_vars.newTCR);  
        }
    }

    function _requireICRisAboveMCR(uint _newICR) internal pure {
        require(_newICR >= MCR, "BorrowerOps: An operation that would result in ICR < MCR is not permitted");
    }

    function _requireICRisAboveCCR(uint _newICR) internal pure {
        require(_newICR >= CCR, "BorrowerOps: Operation must leave vault with ICR >= CCR");
    }

    function _requireNewICRisAboveOldICR(uint _newICR, uint _oldICR) internal pure {
        require(_newICR >= _oldICR, "BorrowerOps: Cannot decrease your Vault's ICR in Recovery Mode");
    }

    function _requireNewTCRisAboveCCR(uint _newTCR) internal pure {
        require(_newTCR >= CCR, "BorrowerOps: An operation that would result in TCR < CCR is not permitted");
    }

    function _requireAtLeastMinNetDebt(uint _netDebt) internal pure {
        require (_netDebt >= MIN_NET_DEBT, "BorrowerOps: Vault's net debt must be greater than minimum");
    }

    function _requireValidFURUSDRepayment(uint _currentDebt, uint _debtRepayment) internal pure {
        require(_debtRepayment <= _currentDebt, "BorrowerOps: Amount repaid must not be larger than the Vault's debt");
    }

    function _requireCallerIsStabilityPool() internal view {
        require(msg.sender == stabilityPoolAddress, "BorrowerOps: Caller is not Stability Pool");
    }

     function _requireSufficientFURUSDBalance(IFURUSDToken _furUSDToken, address _borrower, uint _debtRepayment) internal view {
        require(_furUSDToken.balanceOf(_borrower) >= _debtRepayment, "BorrowerOps: Caller doesnt have enough FURUSD to make repayment");
    }

    function _requireValidMaxFeePercentage(uint _maxFeePercentage, bool _isRecoveryMode) internal pure {
        if (_isRecoveryMode) {
            require(_maxFeePercentage <= DECIMAL_PRECISION,
                "Max fee percentage must less than or equal to 100%");
        } else {
            // require(_maxFeePercentage >= BORROWING_FEE_FLOOR && _maxFeePercentage <= DECIMAL_PRECISION,
            //     "Max fee percentage must be between 0.5% and 100%");
                        require(_maxFeePercentage >= BORROWING_FEE_FLOOR && _maxFeePercentage <= DECIMAL_PRECISION,
                "Max fee percentage must be between 0.5% and 100%");
        }
    }

    // --- ICR and TCR getters ---

    // Compute the new collateral ratio, considering the change in coll and debt. Assumes 0 pending rewards.
    function _getNewNominalICRFromVaultChange(
        uint _coll,
        uint _debt,
        uint _collChange,
        bool _isCollIncrease,
        uint _debtChange,
        bool _isDebtIncrease
    )
        pure
        internal
        returns (uint)
    {
        (uint newColl, uint newDebt) = _getNewVaultAmounts(_coll, _debt, _collChange, _isCollIncrease, _debtChange, _isDebtIncrease);

        uint newNICR = LiquityMath._computeNominalCR(newColl, newDebt);
        return newNICR;
    }

    // Compute the new collateral ratio, considering the change in coll and debt. Assumes 0 pending rewards.
    function _getNewICRFromVaultChange(
        uint _coll,
        uint _debt,
        uint _collChange,
        bool _isCollIncrease,
        uint _debtChange,
        bool _isDebtIncrease,
        uint _price
    )
        pure
        internal
        returns (uint)
    {
        (uint newColl, uint newDebt) = _getNewVaultAmounts(_coll, _debt, _collChange, _isCollIncrease, _debtChange, _isDebtIncrease);

        uint newICR = LiquityMath._computeCR(newColl, newDebt, _price);
        return newICR;
    }

    function _getNewVaultAmounts(
        uint _coll,
        uint _debt,
        uint _collChange,
        bool _isCollIncrease,
        uint _debtChange,
        bool _isDebtIncrease
    )
        internal
        pure
        returns (uint, uint)
    {
        uint newColl = _coll;
        uint newDebt = _debt;

        newColl = _isCollIncrease ? _coll.add(_collChange) :  _coll.sub(_collChange);
        newDebt = _isDebtIncrease ? _debt.add(_debtChange) : _debt.sub(_debtChange);

        return (newColl, newDebt);
    }

    function _getNewTCRFromVaultChange(
        uint _collChange,
        bool _isCollIncrease,
        uint _debtChange,
        bool _isDebtIncrease,
        uint _price
    )
        internal
        view
        returns (uint)
    {
        uint totalColl = getEntireSystemColl();
        uint totalDebt = getEntireSystemDebt();

        totalColl = _isCollIncrease ? totalColl.add(_collChange) : totalColl.sub(_collChange);
        totalDebt = _isDebtIncrease ? totalDebt.add(_debtChange) : totalDebt.sub(_debtChange);

        uint newTCR = LiquityMath._computeCR(totalColl, totalDebt, _price);
        return newTCR;
    }
}
