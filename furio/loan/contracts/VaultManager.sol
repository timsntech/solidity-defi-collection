// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./abstracts/BaseContract.sol";
import "./Interfaces/IVaultManager.sol";
import "./Interfaces/IStabilityPool.sol";
import "./Interfaces/ICollSurplusPool.sol";
import "./Interfaces/IFURUSDToken.sol";
import "./Interfaces/ISortedVaults.sol";
import "./Interfaces/ILOANToken.sol";
import "./Interfaces/ILOANStaking.sol";
import "./Dependencies/LiquityBase.sol";
import "hardhat/console.sol";

contract VaultManager is BaseContract, LiquityBase, IVaultManager {

    using SafeMath for uint;

    function initialize() public initializer {
        __BaseContract_init();
    }

    // string constant public NAME = "VaultManager";

    // --- Connected contract declarations ---

    address public borrowerOperationsAddress;

    IStabilityPool public stabilityPool;

    ICollSurplusPool collSurplusPool;

    IFURUSDToken public furUSDToken;

    ILOANToken public  loanToken;

    ILOANStaking public  loanStaking;

    // A doubly linked list of Vaults, sorted by their sorted by their collateral ratios
    ISortedVaults public sortedVaults;

    // --- Data structures ---



    // uint constant public SECONDS_IN_ONE_MINUTE = 60;
    /*
     * Half-life of 12h. 12h = 720 min
     * (1/2) = d^720 => d = (1/2)^(1/720)
     */
    // uint constant public MINUTE_DECAY_FACTOR = 999037758833783000;
    // uint constant public REDEMPTION_FEE_FLOOR = DECIMAL_PRECISION / 1000 * 5; // 0.5%
    // uint constant public MAX_BORROWING_FEE = DECIMAL_PRECISION / 100 * 5; // 5%

    /* During bootsrap period redemptions are not allowed */
    // uint constant public BOOTSTRAP_PERIOD = 14 days;

    /*
    * BETA: 18 digit decimal. Parameter by which to divide the redeemed fraction, in order to calc the new base rate from a redemption.
    * Corresponds to (1 / ALPHA) in the white paper.
    */
    // uint constant public BETA = 2;



    uint public baseRate;

    // The timestamp of the latest fee operation (redemption or new FURUSD issuance)
    uint public lastFeeOperationTime;

    enum Status {
        nonExistent,
        active,
        closedByOwner,
        closedByLiquidation,
        closedByRedemption
    }

    // Store the necessary data for a vault
    struct Vault {
        uint debt;
        uint coll;
        uint stake;
        Status status;
        uint128 arrayIndex;
    }

    mapping (address => Vault) public Vaults;

    uint public totalStakes;

    // Snapshot of the value of totalStakes, taken immediately after the latest liquidation
    uint public totalStakesSnapshot;

    // Snapshot of the total collateral across the ActivePool and DefaultPool, immediately after the latest liquidation.
    uint public totalCollateralSnapshot;

    /*
    * L_FURFI and L_FURUSDDebt track the sums of accumulated liquidation rewards per unit staked. During its lifetime, each stake earns:
    *
    * An FURFI gain of ( stake * [L_FURFI - L_FURFI(0)] )
    * A FURUSDDebt increase  of ( stake * [L_FURUSDDebt - L_FURUSDDebt(0)] )
    *
    * Where L_FURFI(0) and L_FURUSDDebt(0) are snapshots of L_FURFI and L_FURUSDDebt for the active Vault taken at the instant the stake was made
    */
    uint public L_FURFI;
    uint public L_FURUSDDebt;

    // Map addresses with active vaults to their RewardSnapshot
    mapping (address => RewardSnapshot) public rewardSnapshots;

    // Object containing the FURFI and FURUSD snapshots for a given active vault
    struct RewardSnapshot { uint FURFI; uint FURUSDDebt;}

    // Array of all active vault addresses - used to to compute an approximate hint off-chain, for the sorted list insertion
    address[] public VaultOwners;

    /*
    * --- Variable container structs for liquidations ---
    *
    * These structs are used to hold, return and assign variables inside the liquidation functions,
    * in order to avoid the error: "CompilerError: Stack too deep".
    **/

    struct LocalVariables_OuterLiquidationFunction {
        uint price;
        uint FURUSDInStabPool;
        bool recoveryModeAtStart;
        uint liquidatedDebt;
        uint liquidatedColl;
    }

    struct LocalVariables_InnerSingleLiquidateFunction {
        uint pendingDebtReward;
        uint pendingCollReward;
    }

    struct LocalVariables_LiquidationSequence {
        uint remainingFURUSDInStabPool;
        uint i;
        uint ICR;
        address user;
        bool backToNormalMode;
        uint entireSystemDebt;
        uint entireSystemColl;
    }

    struct LiquidationValues {
        uint entireVaultDebt;
        uint entireVaultColl;
        uint debtToOffset;
        uint collToSendToSP;
        uint debtToRedistribute;
        uint collToRedistribute;
        uint collSurplus;
    }

    struct LiquidationTotals {
        uint totalCollInSequence;
        uint totalDebtInSequence;
        uint totalDebtToOffset;
        uint totalCollToSendToSP;
        uint totalDebtToRedistribute;
        uint totalCollToRedistribute;
        uint totalCollSurplus;
    }

    struct ContractsCache {
        IActivePool activePool;
        IDefaultPool defaultPool;
        IFURUSDToken furUSDToken;
        ILOANStaking loanStaking;
        ISortedVaults sortedVaults;
        ICollSurplusPool collSurplusPool;
    }
    // --- Variable container structs for redemptions ---

    struct RedemptionTotals {
        uint remainingFURUSD;
        uint totalFURUSDToRedeem;
        uint totalFURFIDrawn;
        uint FURFIFee;
        uint FURFIToSendToRedeemer;
        uint decayedBaseRate;
        uint price;
        uint totalFURUSDSupplyAtStart;
    }

    struct SingleRedemptionValues {
        uint FURUSDLot;
        uint FURFILot;
        bool cancelledPartial;
    }

    // --- Events ---
    event Liquidation(uint _liquidatedDebt, uint _liquidatedColl);
    event Redemption(uint _attemptedFURUSDAmount, uint _actualFURUSDAmount, uint _FURFISent, uint _FURFIFee);
    event VaultUpdated(address indexed _borrower, uint _debt, uint _coll, uint _stake, VaultManagerOperation _operation);
    event VaultLiquidated(address indexed _borrower, uint _debt, uint _coll, VaultManagerOperation _operation);
    event BaseRateUpdated(uint _baseRate);
    event LastFeeOpTimeUpdated(uint _lastFeeOpTime);
    event TotalStakesUpdated(uint _newTotalStakes);
    event SystemSnapshotsUpdated(uint _totalStakesSnapshot, uint _totalCollateralSnapshot);
    event LTermsUpdated(uint _L_FURFI, uint _L_FURUSDDebt);
    event VaultSnapshotsUpdated(uint _L_FURFI, uint _L_FURUSDDebt);
    event VaultIndexUpdated(address _borrower, uint _newIndex);

    enum VaultManagerOperation {
        applyPendingRewards,
        liquidateInNormalMode,
        liquidateInRecoveryMode,
        redeemCollateral
    }


    // --- Dependency setter ---

    function setAddresses(
        address _borrowerOperationsAddress,
        address _activePoolAddress,
        address _defaultPoolAddress,
        address _stabilityPoolAddress,
        address _collSurplusPoolAddress,
        address _priceFeedAddress,
        address _furUSDTokenAddress,
        address _sortedVaultsAddress,
        address _loanTokenAddress,
        address _loanStakingAddress
    )
        external
        onlyOwner
    {
        borrowerOperationsAddress = _borrowerOperationsAddress;
        activePool = IActivePool(_activePoolAddress);
        defaultPool = IDefaultPool(_defaultPoolAddress);
        stabilityPool = IStabilityPool(_stabilityPoolAddress);
        collSurplusPool = ICollSurplusPool(_collSurplusPoolAddress);
        priceFeed = IPriceFeed(_priceFeedAddress);
        furUSDToken = IFURUSDToken(_furUSDTokenAddress);
        sortedVaults = ISortedVaults(_sortedVaultsAddress);
        loanToken = ILOANToken(_loanTokenAddress);
        loanStaking = ILOANStaking(_loanStakingAddress);
    }

    // --- Getters ---

    function getVaultOwnersCount() external view override returns (uint) {
        return VaultOwners.length;
    }

    function getVaultFromVaultOwnersArray(uint _index) external view override returns (address) {
        return VaultOwners[_index];
    }

    // --- Vault Liquidation functions ---

    // Single liquidation function. Closes the vault if its ICR is lower than the minimum collateral ratio.
    function liquidate(address _borrower) external override {
        _requireVaultIsActive(_borrower);

        address[] memory borrowers = new address[](1);
        borrowers[0] = _borrower;
        batchLiquidateVaults(borrowers);
    }

    // --- Inner single liquidation functions ---

    // Liquidate one vault, in Normal Mode.
    function _liquidateNormalMode(
        IActivePool _activePool,
        IDefaultPool _defaultPool,
        address _borrower,
        uint _FURUSDInStabPool
    )
        internal
        returns (LiquidationValues memory singleLiquidation)
    {
        LocalVariables_InnerSingleLiquidateFunction memory vars;

        (singleLiquidation.entireVaultDebt,
        singleLiquidation.entireVaultColl,
        vars.pendingDebtReward,
        vars.pendingCollReward) = getEntireDebtAndColl(_borrower);

        _movePendingVaultRewardsToActivePool(_activePool, _defaultPool, vars.pendingDebtReward, vars.pendingCollReward);
        _removeStake(_borrower);

        (singleLiquidation.debtToOffset,
        singleLiquidation.collToSendToSP,
        singleLiquidation.debtToRedistribute,
        singleLiquidation.collToRedistribute) = _getOffsetAndRedistributionVals(singleLiquidation.entireVaultDebt, singleLiquidation.entireVaultColl, _FURUSDInStabPool);

        _closeVault(_borrower, Status.closedByLiquidation);
        emit VaultLiquidated(_borrower, singleLiquidation.entireVaultDebt, singleLiquidation.entireVaultColl, VaultManagerOperation.liquidateInNormalMode);
        emit VaultUpdated(_borrower, 0, 0, 0, VaultManagerOperation.liquidateInNormalMode);
        return singleLiquidation;
    }

    // Liquidate one vault, in Recovery Mode.
    function _liquidateRecoveryMode(
        IActivePool _activePool,
        IDefaultPool _defaultPool,
        address _borrower,
        uint _ICR,
        uint _FURUSDInStabPool,
        uint _TCR,
        uint _price
    )
        internal
        returns (LiquidationValues memory singleLiquidation)
    {
        LocalVariables_InnerSingleLiquidateFunction memory vars;
        if (VaultOwners.length <= 1) {return singleLiquidation;} // don't liquidate if last vault
        (singleLiquidation.entireVaultDebt,
        singleLiquidation.entireVaultColl,
        vars.pendingDebtReward,
        vars.pendingCollReward) = getEntireDebtAndColl(_borrower);

        // If ICR <= 100%, purely redistribute the Vault across all active Vaults
        if (_ICR <= _100pct) {
            _movePendingVaultRewardsToActivePool(_activePool, _defaultPool, vars.pendingDebtReward, vars.pendingCollReward);
            _removeStake(_borrower);
           
            singleLiquidation.debtToOffset = 0;
            singleLiquidation.collToSendToSP = 0;
            singleLiquidation.debtToRedistribute = singleLiquidation.entireVaultDebt;
            singleLiquidation.collToRedistribute = singleLiquidation.entireVaultColl;

            _closeVault(_borrower, Status.closedByLiquidation);
            emit VaultLiquidated(_borrower, singleLiquidation.entireVaultDebt, singleLiquidation.entireVaultColl, VaultManagerOperation.liquidateInRecoveryMode);
            emit VaultUpdated(_borrower, 0, 0, 0, VaultManagerOperation.liquidateInRecoveryMode);
            
        // If 100% < ICR < MCR, offset as much as possible, and redistribute the remainder
        } else if ((_ICR > _100pct) && (_ICR < MCR)) {
            _movePendingVaultRewardsToActivePool(_activePool, _defaultPool, vars.pendingDebtReward, vars.pendingCollReward);
            _removeStake(_borrower);

            (singleLiquidation.debtToOffset,
            singleLiquidation.collToSendToSP,
            singleLiquidation.debtToRedistribute,
            singleLiquidation.collToRedistribute) = _getOffsetAndRedistributionVals(singleLiquidation.entireVaultDebt, singleLiquidation.entireVaultColl, _FURUSDInStabPool);

            _closeVault(_borrower, Status.closedByLiquidation);
            emit VaultLiquidated(_borrower, singleLiquidation.entireVaultDebt, singleLiquidation.entireVaultColl, VaultManagerOperation.liquidateInRecoveryMode);
            emit VaultUpdated(_borrower, 0, 0, 0, VaultManagerOperation.liquidateInRecoveryMode);
        /*
        * If 110% <= ICR < current TCR (accounting for the preceding liquidations in the current sequence)
        * and there is FURUSD in the Stability Pool, only offset, with no redistribution,
        * but at a capped rate of 1.1 and only if the whole debt can be liquidated.
        * The remainder due to the capped rate will be claimable as collateral surplus.
        */
        } else if ((_ICR >= MCR) && (_ICR < _TCR) && (singleLiquidation.entireVaultDebt <= _FURUSDInStabPool)) {
            _movePendingVaultRewardsToActivePool(_activePool, _defaultPool, vars.pendingDebtReward, vars.pendingCollReward);
            assert(_FURUSDInStabPool != 0);

            _removeStake(_borrower);
            singleLiquidation =_getCappedOffsetVals(singleLiquidation.entireVaultDebt, singleLiquidation.entireVaultColl, _price);

            _closeVault(_borrower, Status.closedByLiquidation);
            if (singleLiquidation.collSurplus > 0) {
                collSurplusPool.accountSurplus(_borrower, singleLiquidation.collSurplus);
            }

            emit VaultLiquidated(_borrower, singleLiquidation.entireVaultDebt, singleLiquidation.collToSendToSP, VaultManagerOperation.liquidateInRecoveryMode);
            emit VaultUpdated(_borrower, 0, 0, 0, VaultManagerOperation.liquidateInRecoveryMode);

        } else { // if (_ICR >= MCR && ( _ICR >= _TCR || singleLiquidation.entireVaultDebt > _FURUSDInStabPool))
            LiquidationValues memory zeroVals;
            return zeroVals;
        }

        return singleLiquidation;
    }

    /* In a full liquidation, returns the values for a vault's coll and debt to be offset, and coll and debt to be
    * redistributed to active vaults.
    */
    function _getOffsetAndRedistributionVals(
        uint _debt,
        uint _coll,
        uint _FURUSDInStabPool
    )
        internal
        pure
        returns (uint debtToOffset, uint collToSendToSP, uint debtToRedistribute, uint collToRedistribute)
    {
        if (_FURUSDInStabPool > 0) {
        /*
        * Offset as much debt & collateral as possible against the Stability Pool, and redistribute the remainder
        * between all active vaults.
        *
        *  If the vault's debt is larger than the deposited FURUSD in the Stability Pool:
        *
        *  - Offset an amount of the vault's debt equal to the FURUSD in the Stability Pool
        *  - Send a fraction of the vault's collateral to the Stability Pool, equal to the fraction of its offset debt
        *
        */
            debtToOffset = LiquityMath._min(_debt, _FURUSDInStabPool);
            collToSendToSP = _coll.mul(debtToOffset).div(_debt);
            debtToRedistribute = _debt.sub(debtToOffset);
            collToRedistribute = _coll.sub(collToSendToSP);
        } else {
            debtToOffset = 0;
            collToSendToSP = 0;
            debtToRedistribute = _debt;
            collToRedistribute = _coll;
        }
    }

    /*
    *  Get its offset coll/debt, and close the vault.
    */
    function _getCappedOffsetVals(
        uint _entireVaultDebt,
        uint _entireVaultColl,
        uint _price
    )
        internal
        pure
        returns (LiquidationValues memory singleLiquidation)
    {
        singleLiquidation.entireVaultDebt = _entireVaultDebt;
        singleLiquidation.entireVaultColl = _entireVaultColl;
        uint cappedCollPortion = _entireVaultDebt.mul(MCR).div(_price);

        singleLiquidation.debtToOffset = _entireVaultDebt;
        singleLiquidation.collToSendToSP = cappedCollPortion;
        singleLiquidation.collSurplus = _entireVaultColl.sub(cappedCollPortion);
        singleLiquidation.debtToRedistribute = 0;
        singleLiquidation.collToRedistribute = 0;
    }

    /*
    * Liquidate a sequence of vaults. Closes a maximum number of n under-collateralized Vaults,
    * starting from the one with the lowest collateral ratio in the system, and moving upwards
    */
    function liquidateVaults(uint _n) external override {
        ContractsCache memory contractsCache = ContractsCache(
            activePool,
            defaultPool,
            IFURUSDToken(address(0)),
            ILOANStaking(address(0)),
            sortedVaults,
            ICollSurplusPool(address(0))
        );
        IStabilityPool stabilityPoolCached = stabilityPool;

        LocalVariables_OuterLiquidationFunction memory vars;

        LiquidationTotals memory totals;

        vars.price = priceFeed.fetchPrice();

        vars.FURUSDInStabPool = stabilityPoolCached.getTotalFURUSDDeposits();
        vars.recoveryModeAtStart = _checkRecoveryMode(vars.price);

        // Perform the appropriate liquidation sequence - tally the values, and obtain their totals
        if (vars.recoveryModeAtStart) {
            totals = _getTotalsFromLiquidateVaultsSequence_RecoveryMode(contractsCache, vars.price, vars.FURUSDInStabPool, _n);
        } else { // if !vars.recoveryModeAtStart
            totals = _getTotalsFromLiquidateVaultsSequence_NormalMode(contractsCache.activePool, contractsCache.defaultPool, vars.price, vars.FURUSDInStabPool, _n);
        }

        require(totals.totalDebtInSequence > 0, "VaultManager: nothing to liquidate");

        // Move liquidated FURFI and FURUSD to the appropriate pools
        stabilityPoolCached.offset(totals.totalDebtToOffset, totals.totalCollToSendToSP);
        _redistributeDebtAndColl(contractsCache.activePool, contractsCache.defaultPool, totals.totalDebtToRedistribute, totals.totalCollToRedistribute);
        if (totals.totalCollSurplus > 0) {
            contractsCache.activePool.sendFURFI(address(collSurplusPool), totals.totalCollSurplus);
        }

        // Update system snapshots
        _updateSystemSnapshots(contractsCache.activePool);

        vars.liquidatedDebt = totals.totalDebtInSequence;
        vars.liquidatedColl = totals.totalCollInSequence.sub(totals.totalCollSurplus);
        emit Liquidation(vars.liquidatedDebt, vars.liquidatedColl);

    }

    /*
    * This function is used when the liquidateVaults sequence starts during Recovery Mode. However, it
    * handle the case where the system *leaves* Recovery Mode, part way through the liquidation sequence
    */
    function _getTotalsFromLiquidateVaultsSequence_RecoveryMode(
        ContractsCache memory _contractsCache,
        uint _price,
        uint _FURUSDInStabPool,
        uint _n
    )
        internal
        returns(LiquidationTotals memory totals)
    {
        LocalVariables_LiquidationSequence memory vars;
        LiquidationValues memory singleLiquidation;

        vars.remainingFURUSDInStabPool = _FURUSDInStabPool;
        vars.backToNormalMode = false;
        vars.entireSystemDebt = getEntireSystemDebt();
        vars.entireSystemColl = getEntireSystemColl();

        vars.user = _contractsCache.sortedVaults.getLast();
        address firstUser = _contractsCache.sortedVaults.getFirst();
        for (vars.i = 0; vars.i < _n && vars.user != firstUser; vars.i++) {
            // we need to cache it, because current user is likely going to be deleted
            address nextUser = _contractsCache.sortedVaults.getPrev(vars.user);

            vars.ICR = getCurrentICR(vars.user, _price);

            if (!vars.backToNormalMode) {
                // Break the loop if ICR is greater than MCR and Stability Pool is empty
                if (vars.ICR >= MCR && vars.remainingFURUSDInStabPool == 0) { break; }

                uint TCR = LiquityMath._computeCR(vars.entireSystemColl, vars.entireSystemDebt, _price);

                singleLiquidation = _liquidateRecoveryMode(_contractsCache.activePool, _contractsCache.defaultPool, vars.user, vars.ICR, vars.remainingFURUSDInStabPool, TCR, _price);

                // Update aggregate trackers
                vars.remainingFURUSDInStabPool = vars.remainingFURUSDInStabPool.sub(singleLiquidation.debtToOffset);
                vars.entireSystemDebt = vars.entireSystemDebt.sub(singleLiquidation.debtToOffset);
                vars.entireSystemColl = vars.entireSystemColl.
                    sub(singleLiquidation.collToSendToSP).
                    sub(singleLiquidation.collSurplus);

                // Add liquidation values to their respective running totals
                totals = _addLiquidationValuesToTotals(totals, singleLiquidation);

                vars.backToNormalMode = !_checkPotentialRecoveryMode(vars.entireSystemColl, vars.entireSystemDebt, _price);
            }
            else if (vars.backToNormalMode && vars.ICR < MCR) {
                singleLiquidation = _liquidateNormalMode(_contractsCache.activePool, _contractsCache.defaultPool, vars.user, vars.remainingFURUSDInStabPool);

                vars.remainingFURUSDInStabPool = vars.remainingFURUSDInStabPool.sub(singleLiquidation.debtToOffset);

                // Add liquidation values to their respective running totals
                totals = _addLiquidationValuesToTotals(totals, singleLiquidation);

            }  else break;  // break if the loop reaches a Vault with ICR >= MCR

            vars.user = nextUser;
        }
    }

    function _getTotalsFromLiquidateVaultsSequence_NormalMode(
        IActivePool _activePool,
        IDefaultPool _defaultPool,
        uint _price,
        uint _FURUSDInStabPool,
        uint _n
    )
        internal
        returns(LiquidationTotals memory totals)
    {
        LocalVariables_LiquidationSequence memory vars;
        LiquidationValues memory singleLiquidation;
        ISortedVaults sortedVaultsCached = sortedVaults;

        vars.remainingFURUSDInStabPool = _FURUSDInStabPool;

        for (vars.i = 0; vars.i < _n; vars.i++) {
            vars.user = sortedVaultsCached.getLast();
            vars.ICR = getCurrentICR(vars.user, _price);

            if (vars.ICR < MCR) {
                singleLiquidation = _liquidateNormalMode(_activePool, _defaultPool, vars.user, vars.remainingFURUSDInStabPool);

                vars.remainingFURUSDInStabPool = vars.remainingFURUSDInStabPool.sub(singleLiquidation.debtToOffset);

                // Add liquidation values to their respective running totals
                totals = _addLiquidationValuesToTotals(totals, singleLiquidation);

            } else break;  // break if the loop reaches a Vault with ICR >= MCR
        }
    }

    /*
    * Attempt to liquidate a custom list of vaults provided by the caller.
    */
    function batchLiquidateVaults(address[] memory _vaultArray) public override {
        require(_vaultArray.length != 0, "VaultManager: Calldata address array must not be empty");

        IActivePool activePoolCached = activePool;
        IDefaultPool defaultPoolCached = defaultPool;
        IStabilityPool stabilityPoolCached = stabilityPool;

        LocalVariables_OuterLiquidationFunction memory vars;
        LiquidationTotals memory totals;

        vars.price = priceFeed.fetchPrice();
        vars.FURUSDInStabPool = stabilityPoolCached.getTotalFURUSDDeposits();
        vars.recoveryModeAtStart = _checkRecoveryMode(vars.price);

        // Perform the appropriate liquidation sequence - tally values and obtain their totals.
        if (vars.recoveryModeAtStart) {
            totals = _getTotalFromBatchLiquidate_RecoveryMode(activePoolCached, defaultPoolCached, vars.price, vars.FURUSDInStabPool, _vaultArray);
        } else {  //  if !vars.recoveryModeAtStart
            totals = _getTotalsFromBatchLiquidate_NormalMode(activePoolCached, defaultPoolCached, vars.price, vars.FURUSDInStabPool, _vaultArray);
        }

        require(totals.totalDebtInSequence > 0, "VaultManager: nothing to liquidate");

        // Move liquidated FURFI and FURUSD to the appropriate pools
        stabilityPoolCached.offset(totals.totalDebtToOffset, totals.totalCollToSendToSP);
        _redistributeDebtAndColl(activePoolCached, defaultPoolCached, totals.totalDebtToRedistribute, totals.totalCollToRedistribute);
        if (totals.totalCollSurplus > 0) {
            activePoolCached.sendFURFI(address(collSurplusPool), totals.totalCollSurplus);
        }

        // Update system snapshots
        _updateSystemSnapshots(activePoolCached);

        vars.liquidatedDebt = totals.totalDebtInSequence;
        vars.liquidatedColl = totals.totalCollInSequence.sub(totals.totalCollSurplus);
        emit Liquidation(vars.liquidatedDebt, vars.liquidatedColl);
    }

    /*
    * This function is used when the batch liquidation sequence starts during Recovery Mode. However, it
    * handle the case where the system *leaves* Recovery Mode, part way through the liquidation sequence
    */
    function _getTotalFromBatchLiquidate_RecoveryMode(
        IActivePool _activePool,
        IDefaultPool _defaultPool,
        uint _price,
        uint _FURUSDInStabPool,
        address[] memory _vaultArray
    )
        internal
        returns(LiquidationTotals memory totals)
    {
        LocalVariables_LiquidationSequence memory vars;
        LiquidationValues memory singleLiquidation;

        vars.remainingFURUSDInStabPool = _FURUSDInStabPool;
        vars.backToNormalMode = false;
        vars.entireSystemDebt = getEntireSystemDebt();
        vars.entireSystemColl = getEntireSystemColl();

        for (vars.i = 0; vars.i < _vaultArray.length; vars.i++) {
            vars.user = _vaultArray[vars.i];
            // Skip non-active vaults
            if (Vaults[vars.user].status != Status.active) { continue; }
            vars.ICR = getCurrentICR(vars.user, _price);

            if (!vars.backToNormalMode) {

                // Skip this vault if ICR is greater than MCR and Stability Pool is empty
                if (vars.ICR >= MCR && vars.remainingFURUSDInStabPool == 0) { continue; }

                uint TCR = LiquityMath._computeCR(vars.entireSystemColl, vars.entireSystemDebt, _price);

                singleLiquidation = _liquidateRecoveryMode(_activePool, _defaultPool, vars.user, vars.ICR, vars.remainingFURUSDInStabPool, TCR, _price);

                // Update aggregate trackers
                vars.remainingFURUSDInStabPool = vars.remainingFURUSDInStabPool.sub(singleLiquidation.debtToOffset);
                vars.entireSystemDebt = vars.entireSystemDebt.sub(singleLiquidation.debtToOffset);
                vars.entireSystemColl = vars.entireSystemColl.
                    sub(singleLiquidation.collToSendToSP).
                    sub(singleLiquidation.collSurplus);

                // Add liquidation values to their respective running totals
                totals = _addLiquidationValuesToTotals(totals, singleLiquidation);

                vars.backToNormalMode = !_checkPotentialRecoveryMode(vars.entireSystemColl, vars.entireSystemDebt, _price);
            }

            else if (vars.backToNormalMode && vars.ICR < MCR) {
                singleLiquidation = _liquidateNormalMode(_activePool, _defaultPool, vars.user, vars.remainingFURUSDInStabPool);
                vars.remainingFURUSDInStabPool = vars.remainingFURUSDInStabPool.sub(singleLiquidation.debtToOffset);

                // Add liquidation values to their respective running totals
                totals = _addLiquidationValuesToTotals(totals, singleLiquidation);

            } else continue; // In Normal Mode skip vaults with ICR >= MCR
        }
    }

    function _getTotalsFromBatchLiquidate_NormalMode(
        IActivePool _activePool,
        IDefaultPool _defaultPool,
        uint _price,
        uint _FURUSDInStabPool,
        address[] memory _vaultArray
    )
        internal
        returns(LiquidationTotals memory totals)
    {
        LocalVariables_LiquidationSequence memory vars;
        LiquidationValues memory singleLiquidation;

        vars.remainingFURUSDInStabPool = _FURUSDInStabPool;

        for (vars.i = 0; vars.i < _vaultArray.length; vars.i++) {
            vars.user = _vaultArray[vars.i];
            vars.ICR = getCurrentICR(vars.user, _price);

            if (vars.ICR < MCR) {
                singleLiquidation = _liquidateNormalMode(_activePool, _defaultPool, vars.user, vars.remainingFURUSDInStabPool);
                vars.remainingFURUSDInStabPool = vars.remainingFURUSDInStabPool.sub(singleLiquidation.debtToOffset);

                // Add liquidation values to their respective running totals
                totals = _addLiquidationValuesToTotals(totals, singleLiquidation);
            }
        }
    }

    // --- Liquidation helper functions ---

    function _addLiquidationValuesToTotals(LiquidationTotals memory oldTotals, LiquidationValues memory singleLiquidation)
    internal pure returns(LiquidationTotals memory newTotals) {

        // Tally all the values with their respective running totals
        newTotals.totalDebtInSequence = oldTotals.totalDebtInSequence.add(singleLiquidation.entireVaultDebt);
        newTotals.totalCollInSequence = oldTotals.totalCollInSequence.add(singleLiquidation.entireVaultColl);
        newTotals.totalDebtToOffset = oldTotals.totalDebtToOffset.add(singleLiquidation.debtToOffset);
        newTotals.totalCollToSendToSP = oldTotals.totalCollToSendToSP.add(singleLiquidation.collToSendToSP);
        newTotals.totalDebtToRedistribute = oldTotals.totalDebtToRedistribute.add(singleLiquidation.debtToRedistribute);
        newTotals.totalCollToRedistribute = oldTotals.totalCollToRedistribute.add(singleLiquidation.collToRedistribute);
        newTotals.totalCollSurplus = oldTotals.totalCollSurplus.add(singleLiquidation.collSurplus);

        return newTotals;
    }

    // Move a Vault's pending debt and collateral rewards from distributions, from the Default Pool to the Active Pool
    function _movePendingVaultRewardsToActivePool(IActivePool _activePool, IDefaultPool _defaultPool, uint _FURUSD, uint _FURFI) internal {
        _defaultPool.decreaseFURUSDDebt(_FURUSD);
        _activePool.increaseFURUSDDebt(_FURUSD);
        _defaultPool.sendFURFIToActivePool(_FURFI);
    }

    // --- Redemption functions ---

    function redeemCollateral(
        uint _FURUSDamount,
        address _firstRedemptionHint,
        address _upperPartialRedemptionHint,
        address _lowerPartialRedemptionHint,
        uint _partialRedemptionHintNICR,
        uint _maxIterations,
        uint _maxFeePercentage
    )
        external
        override
    {
        ContractsCache memory contractsCache = ContractsCache(
            activePool,
            defaultPool,
            furUSDToken,
            loanStaking,
            sortedVaults,
            collSurplusPool
        );
        RedemptionTotals memory totals;

        _requireValidMaxFeePercentage(_maxFeePercentage);
        _requireAfterBootstrapPeriod();
        totals.price = priceFeed.fetchPrice();
        _requireTCRoverMCR(totals.price);
        _requireAmountGreaterThanZero(_FURUSDamount);
        _requireFURUSDBalanceCoversRedemption(contractsCache.furUSDToken, msg.sender, _FURUSDamount);

        totals.totalFURUSDSupplyAtStart = getEntireSystemDebt();
        // Confirm _FURUSDamount is less than total FURUSD supply
        assert(_FURUSDamount <= totals.totalFURUSDSupplyAtStart);

        totals.remainingFURUSD = _FURUSDamount;
        address currentBorrower;

        if (_isValidFirstRedemptionHint(contractsCache.sortedVaults, _firstRedemptionHint, totals.price)) {
            currentBorrower = _firstRedemptionHint;
        } else {
            currentBorrower = contractsCache.sortedVaults.getLast();
            // Find the first vault with ICR >= MCR
            while (currentBorrower != address(0) && getCurrentICR(currentBorrower, totals.price) < MCR) {
                currentBorrower = contractsCache.sortedVaults.getPrev(currentBorrower);
            }
        }

        // Loop through the Vaults starting from the one with lowest collateral ratio until _amount of FURUSD is exchanged for collateral
        if (_maxIterations == 0) { _maxIterations = type(uint).max; }
        while (currentBorrower != address(0) && totals.remainingFURUSD > 0 && _maxIterations > 0) {
            _maxIterations--;
            // Save the address of the Vault preceding the current one, before potentially modifying the list
            address nextUserToCheck = contractsCache.sortedVaults.getPrev(currentBorrower);

            _applyPendingRewards(contractsCache.activePool, contractsCache.defaultPool, currentBorrower);

            SingleRedemptionValues memory singleRedemption = _redeemCollateralFromVault(
                contractsCache,
                currentBorrower,
                totals.remainingFURUSD,
                totals.price,
                _upperPartialRedemptionHint,
                _lowerPartialRedemptionHint,
                _partialRedemptionHintNICR
            );

            if (singleRedemption.cancelledPartial) break; // Partial redemption was cancelled (out-of-date hint, or new net debt < minimum), therefore we could not redeem from the last Vault

            totals.totalFURUSDToRedeem  = totals.totalFURUSDToRedeem.add(singleRedemption.FURUSDLot);
            totals.totalFURFIDrawn = totals.totalFURFIDrawn.add(singleRedemption.FURFILot);

            totals.remainingFURUSD = totals.remainingFURUSD.sub(singleRedemption.FURUSDLot);
            currentBorrower = nextUserToCheck;
        }
        require(totals.totalFURFIDrawn > 0, "VaultManager: Unable to redeem any amount");

        // Decay the baseRate due to time passed, and then increase it according to the size of this redemption.
        // Use the saved total FURUSD supply value, from before it was reduced by the redemption.
        _updateBaseRateFromRedemption(totals.totalFURFIDrawn, totals.price, totals.totalFURUSDSupplyAtStart);

        // Calculate the FURFI fee
        totals.FURFIFee = _getRedemptionFee(totals.totalFURFIDrawn);
        _requireUserAcceptsFee(totals.FURFIFee, totals.totalFURFIDrawn, _maxFeePercentage);

        // Send the FURFI fee to the LOAN staking contract
        contractsCache.activePool.sendFURFI(address(contractsCache.loanStaking), totals.FURFIFee);
        contractsCache.loanStaking.increaseF_FURFI(totals.FURFIFee);

        totals.FURFIToSendToRedeemer = totals.totalFURFIDrawn.sub(totals.FURFIFee);

        emit Redemption(_FURUSDamount, totals.totalFURUSDToRedeem, totals.totalFURFIDrawn, totals.FURFIFee);

        // Burn the total FURUSD that is cancelled with debt, and send the redeemed FURFI to msg.sender
        contractsCache.furUSDToken.burn(msg.sender, totals.totalFURUSDToRedeem);
        // Update Active Pool FURUSD, and send FURFI to account
        contractsCache.activePool.decreaseFURUSDDebt(totals.totalFURUSDToRedeem);
        contractsCache.activePool.sendFURFI(msg.sender, totals.FURFIToSendToRedeemer);
    }
    
    // Redeem as much collateral as possible from _borrower's Vault in exchange for FURUSD up to _maxFURUSDamount
    function _redeemCollateralFromVault(
        ContractsCache memory _contractsCache,
        address _borrower,
        uint _maxFURUSDamount,
        uint _price,
        address _upperPartialRedemptionHint,
        address _lowerPartialRedemptionHint,
        uint _partialRedemptionHintNICR
    )
        internal returns (SingleRedemptionValues memory singleRedemption)
    {
        // Determine the remaining amount (lot) to be redeemed, capped by the entire debt of the Vault minus the liquidation reserve
        singleRedemption.FURUSDLot = LiquityMath._min(_maxFURUSDamount, Vaults[_borrower].debt);

        // Get the FURFILot of equivalent value in USD
        singleRedemption.FURFILot = singleRedemption.FURUSDLot.mul(DECIMAL_PRECISION).div(_price);

        // Decrease the debt and collateral of the current Vault according to the FURUSD lot and corresponding FURFI to send
        uint newDebt = (Vaults[_borrower].debt).sub(singleRedemption.FURUSDLot);
        uint newColl = (Vaults[_borrower].coll).sub(singleRedemption.FURFILot);

        if (newDebt == 0) {
            // No debt left in the Vault (except for the liquidation reserve), therefore the vault gets closed
            _removeStake(_borrower);
            _closeVault(_borrower, Status.closedByRedemption);
            // send FURFI from Active Pool to CollSurplus Pool
            _contractsCache.collSurplusPool.accountSurplus(_borrower, newColl);
            _contractsCache.activePool.sendFURFI(address(_contractsCache.collSurplusPool), newColl);
            emit VaultUpdated(_borrower, 0, 0, 0, VaultManagerOperation.redeemCollateral);

        } else {
            uint newNICR = LiquityMath._computeNominalCR(newColl, newDebt);

            if (newNICR != _partialRedemptionHintNICR || newDebt < MIN_NET_DEBT) {
                singleRedemption.cancelledPartial = true;
                return singleRedemption;
            }

            _contractsCache.sortedVaults.reInsert(_borrower, newNICR, _upperPartialRedemptionHint, _lowerPartialRedemptionHint);

            Vaults[_borrower].debt = newDebt;
            Vaults[_borrower].coll = newColl;
            _updateStakeAndTotalStakes(_borrower);

            emit VaultUpdated(_borrower, newDebt, newColl, Vaults[_borrower].stake, VaultManagerOperation.redeemCollateral);
        }

        return singleRedemption;
    }

    function _isValidFirstRedemptionHint(ISortedVaults _sortedVaults, address _firstRedemptionHint, uint _price) internal view returns (bool) {
        if (_firstRedemptionHint == address(0) ||
            !_sortedVaults.contains(_firstRedemptionHint) ||
            getCurrentICR(_firstRedemptionHint, _price) < MCR
        ) {
            return false;
        }

        address nextVault = _sortedVaults.getNext(_firstRedemptionHint);
        return nextVault == address(0) || getCurrentICR(nextVault, _price) < MCR;
    }

    // --- Helper functions ---

    // Return the nominal collateral ratio (ICR) of a given Vault, without the price. Takes a vault's pending coll and debt rewards from redistributions into account.
    function getNominalICR(address _borrower) public view override returns (uint) {
        (uint currentFURFI, uint currentFURUSDDebt) = _getCurrentVaultAmounts(_borrower);

        uint NICR = LiquityMath._computeNominalCR(currentFURFI, currentFURUSDDebt);
        return NICR;
    }

    // Return the current collateral ratio (ICR) of a given Vault. Takes a vault's pending coll and debt rewards from redistributions into account.
    function getCurrentICR(address _borrower, uint _price) public view override returns (uint) {
        (uint currentFURFI, uint currentFURUSDDebt) = _getCurrentVaultAmounts(_borrower);

        uint ICR = LiquityMath._computeCR(currentFURFI, currentFURUSDDebt, _price);
        return ICR;
    }

    function _getCurrentVaultAmounts(address _borrower) internal view returns (uint, uint) {
        uint pendingFURFIReward = getPendingFURFIReward(_borrower);
        uint pendingFURUSDDebtReward = getPendingFURUSDDebtReward(_borrower);

        uint currentFURFI = Vaults[_borrower].coll.add(pendingFURFIReward);
        uint currentFURUSDDebt = Vaults[_borrower].debt.add(pendingFURUSDDebtReward);

        return (currentFURFI, currentFURUSDDebt);
    }

    function applyPendingRewards(address _borrower) external override {
        _requireCallerIsBorrowerOperations();
        return _applyPendingRewards(activePool, defaultPool, _borrower);
    }

    // Add the borrowers's coll and debt rewards earned from redistributions, to their Vault
    function _applyPendingRewards(IActivePool _activePool, IDefaultPool _defaultPool, address _borrower) internal {
        if (hasPendingRewards(_borrower)) {
            _requireVaultIsActive(_borrower);

            // Compute pending rewards
            uint pendingFURFIReward = getPendingFURFIReward(_borrower);
            uint pendingFURUSDDebtReward = getPendingFURUSDDebtReward(_borrower);

            // Apply pending rewards to vault's state
            Vaults[_borrower].coll = Vaults[_borrower].coll.add(pendingFURFIReward);
            Vaults[_borrower].debt = Vaults[_borrower].debt.add(pendingFURUSDDebtReward);

            _updateVaultRewardSnapshots(_borrower);

            // Transfer from DefaultPool to ActivePool
            _movePendingVaultRewardsToActivePool(_activePool, _defaultPool, pendingFURUSDDebtReward, pendingFURFIReward);

            emit VaultUpdated(_borrower, Vaults[_borrower].debt, Vaults[_borrower].coll, Vaults[_borrower].stake, VaultManagerOperation.applyPendingRewards);
        }
    }

    // Update borrower's snapshots of L_FURFI and L_FURUSDDebt to reflect the current values
    function updateVaultRewardSnapshots(address _borrower) external override {
        _requireCallerIsBorrowerOperations();
       return _updateVaultRewardSnapshots(_borrower);
    }

    function _updateVaultRewardSnapshots(address _borrower) internal {
        rewardSnapshots[_borrower].FURFI = L_FURFI;
        rewardSnapshots[_borrower].FURUSDDebt = L_FURUSDDebt;
        emit VaultSnapshotsUpdated(L_FURFI, L_FURUSDDebt);
    }

    // Get the borrower's pending accumulated FURFI reward, earned by their stake
    function getPendingFURFIReward(address _borrower) public view override returns (uint) {
        uint snapshotFURFI = rewardSnapshots[_borrower].FURFI;
        uint rewardPerUnitStaked = L_FURFI.sub(snapshotFURFI);

        if ( rewardPerUnitStaked == 0 || Vaults[_borrower].status != Status.active) { return 0; }

        uint stake = Vaults[_borrower].stake;

        uint pendingFURFIReward = stake.mul(rewardPerUnitStaked).div(DECIMAL_PRECISION);

        return pendingFURFIReward;
    }
    
    // Get the borrower's pending accumulated FURUSD reward, earned by their stake
    function getPendingFURUSDDebtReward(address _borrower) public view override returns (uint) {
        uint snapshotFURUSDDebt = rewardSnapshots[_borrower].FURUSDDebt;
        uint rewardPerUnitStaked = L_FURUSDDebt.sub(snapshotFURUSDDebt);

        if ( rewardPerUnitStaked == 0 || Vaults[_borrower].status != Status.active) { return 0; }

        uint stake =  Vaults[_borrower].stake;

        uint pendingFURUSDDebtReward = stake.mul(rewardPerUnitStaked).div(DECIMAL_PRECISION);

        return pendingFURUSDDebtReward;
    }

    function hasPendingRewards(address _borrower) public view override returns (bool) {
        /*
        * A Vault has pending rewards if its snapshot is less than the current rewards per-unit-staked sum:
        * this indicates that rewards have occured since the snapshot was made, and the user therefore has
        * pending rewards
        */
        if (Vaults[_borrower].status != Status.active) {return false;}
       
        return (rewardSnapshots[_borrower].FURFI < L_FURFI);
    }

    // Return the Vaults entire debt and coll, including pending rewards from redistributions.
    function getEntireDebtAndColl(address _borrower)
        public
        view
        override
        returns (uint debt, uint coll, uint pendingFURUSDDebtReward, uint pendingFURFIReward)
    {
        debt = Vaults[_borrower].debt;
        coll = Vaults[_borrower].coll;

        pendingFURUSDDebtReward = getPendingFURUSDDebtReward(_borrower);
        pendingFURFIReward = getPendingFURFIReward(_borrower);

        debt = debt.add(pendingFURUSDDebtReward);
        coll = coll.add(pendingFURFIReward);
    }

    function removeStake(address _borrower) external override {
        _requireCallerIsBorrowerOperations();
        return _removeStake(_borrower);
    }

    // Remove borrower's stake from the totalStakes sum, and set their stake to 0
    function _removeStake(address _borrower) internal {
        uint stake = Vaults[_borrower].stake;
        totalStakes = totalStakes.sub(stake);
        Vaults[_borrower].stake = 0;
    }

    function updateStakeAndTotalStakes(address _borrower) public override returns (uint) {
        _requireCallerIsBorrowerOperations();
        return _updateStakeAndTotalStakes(_borrower);
    }

    // Update borrower's stake based on their latest collateral value
    function _updateStakeAndTotalStakes(address _borrower) internal returns (uint) {
        uint newStake = _computeNewStake(Vaults[_borrower].coll);
        uint oldStake = Vaults[_borrower].stake;
        Vaults[_borrower].stake = newStake;

        totalStakes = totalStakes.sub(oldStake).add(newStake);
        emit TotalStakesUpdated(totalStakes);

        return newStake;
    }

    // Calculate a new stake based on the snapshots of the totalStakes and totalCollateral taken at the last liquidation
    function _computeNewStake(uint _coll) internal view returns (uint) {
        uint stake;
        if (totalCollateralSnapshot == 0) {
            stake = _coll;
        } else {
            assert(totalStakesSnapshot > 0);
            stake = _coll.mul(totalStakesSnapshot).div(totalCollateralSnapshot);
        }
        return stake;
    }

    function _redistributeDebtAndColl(IActivePool _activePool, IDefaultPool _defaultPool, uint _debt, uint _coll) internal {
        if (_debt == 0) { return; }

        uint FURFINumerator = _coll.mul(DECIMAL_PRECISION);
        uint FURUSDDebtNumerator = _debt.mul(DECIMAL_PRECISION);
        uint FURFIRewardPerUnitStaked = FURFINumerator.div(totalStakes);
        uint FURUSDDebtRewardPerUnitStaked = FURUSDDebtNumerator.div(totalStakes);

        // Add per-unit-staked terms to the running totals
        L_FURFI = L_FURFI.add(FURFIRewardPerUnitStaked);
        L_FURUSDDebt = L_FURUSDDebt.add(FURUSDDebtRewardPerUnitStaked);

        emit LTermsUpdated(L_FURFI, L_FURUSDDebt);

        // Transfer coll and debt from ActivePool to DefaultPool
        _activePool.decreaseFURUSDDebt(_debt);
        _defaultPool.increaseFURUSDDebt(_debt);
        _activePool.sendFURFI(address(_defaultPool), _coll);
    }

    function closeVault(address _borrower) external override {
        _requireCallerIsBorrowerOperations();
        return _closeVault(_borrower, Status.closedByOwner);
    }

    function _closeVault(address _borrower, Status closedStatus) internal {
        assert(closedStatus != Status.nonExistent && closedStatus != Status.active);

        uint VaultOwnersArrayLength = VaultOwners.length;
        _requireMoreThanOneVaultInSystem(VaultOwnersArrayLength);

        Vaults[_borrower].status = closedStatus;
        Vaults[_borrower].coll = 0;
        Vaults[_borrower].debt = 0;

        rewardSnapshots[_borrower].FURFI = 0;
        rewardSnapshots[_borrower].FURUSDDebt = 0;

        _removeVaultOwner(_borrower, VaultOwnersArrayLength);
        sortedVaults.remove(_borrower);
    }

    function _updateSystemSnapshots(IActivePool _activePool) internal {
        totalStakesSnapshot = totalStakes;

        uint activeColl = _activePool.getFURFI();
        uint liquidatedColl = defaultPool.getFURFI();
        totalCollateralSnapshot = activeColl.add(liquidatedColl);

        emit SystemSnapshotsUpdated(totalStakesSnapshot, totalCollateralSnapshot);
    }

    // Push the owner's address to the Vault owners list, and record the corresponding array index on the Vault struct
    function addVaultOwnerToArray(address _borrower) external override returns (uint index) {
        _requireCallerIsBorrowerOperations();
        return _addVaultOwnerToArray(_borrower);
    }

    function _addVaultOwnerToArray(address _borrower) internal returns (uint128 index) {
        /* Max array size is 2**128 - 1, i.e. ~3e30 vaults. No risk of overflow, since vaults have minimum FURUSD
        debt of liquidation reserve plus MIN_NET_DEBT. 3e30 FURUSD dwarfs the value of all wealth in the world ( which is < 1e15 USD). */

        // Push the Vaultowner to the array
        VaultOwners.push(_borrower);

        // Record the index of the new Vaultowner on their Vault struct
        index = uint128(VaultOwners.length.sub(1));
        Vaults[_borrower].arrayIndex = index;

        return index;
    }

    /*
    * Remove a Vault owner from the VaultOwners array, not preserving array order. Removing owner 'B' does the following:
    * [A B C D E] => [A E C D], and updates E's Vault struct to point to its new array index.
    */
    function _removeVaultOwner(address _borrower, uint VaultOwnersArrayLength) internal {
        Status vaultStatus = Vaults[_borrower].status;
        // It’s set in caller function `_closeVault`
        assert(vaultStatus != Status.nonExistent && vaultStatus != Status.active);

        uint128 index = Vaults[_borrower].arrayIndex;
        uint length = VaultOwnersArrayLength;
        uint idxLast = length.sub(1);

        assert(index <= idxLast);

        address addressToMove = VaultOwners[idxLast];

        VaultOwners[index] = addressToMove;
        Vaults[addressToMove].arrayIndex = index;
        emit VaultIndexUpdated(addressToMove, index);

        VaultOwners.pop();
    }

    // --- Recovery Mode and TCR functions ---

    function getTCR(uint _price) external view override returns (uint) {
        return _getTCR(_price);
    }

    function checkRecoveryMode(uint _price) external view override returns (bool) {
        return _checkRecoveryMode(_price);
    }

    // Check whether or not the system *would be* in Recovery Mode, given an FURFI:USD price, and the entire system coll and debt.
    function _checkPotentialRecoveryMode(
        uint _entireSystemColl,
        uint _entireSystemDebt,
        uint _price
    )
        internal
        pure
    returns (bool)
    {
        uint TCR = LiquityMath._computeCR(_entireSystemColl, _entireSystemDebt, _price);

        return TCR < CCR;
    }

    // --- Redemption fee functions ---

    /*
    * This function has two impacts on the baseRate state variable:
    * 1) decays the baseRate based on time passed since last redemption or FURUSD borrowing operation.
    * then,
    * 2) increases the baseRate based on the amount redeemed, as a proportion of total supply
    */
    function _updateBaseRateFromRedemption(uint _FURFIDrawn,  uint _price, uint _totalFURUSDSupply) internal returns (uint) {
        uint decayedBaseRate = _calcDecayedBaseRate();
        /* Convert the drawn FURFI back to FURUSD at face value rate (1 FURUSD:1 USD), in order to get
        * the fraction of total supply that was redeemed at face value. */
        uint redeemedFURUSDFraction = _FURFIDrawn.mul(_price).div(_totalFURUSDSupply);

        // uint newBaseRate = decayedBaseRate.add(redeemedFURUSDFraction.div(BETA));
        uint newBaseRate = decayedBaseRate.add(redeemedFURUSDFraction.div(2));
        newBaseRate = LiquityMath._min(newBaseRate, DECIMAL_PRECISION); // cap baseRate at a maximum of 100%
        //assert(newBaseRate <= DECIMAL_PRECISION); // This is already enforced in the line above
        assert(newBaseRate > 0); // Base rate is always non-zero after redemption
        // Update the baseRate state variable
        baseRate = newBaseRate;
        emit BaseRateUpdated(newBaseRate);
        
        _updateLastFeeOpTime();

        return newBaseRate;
    }

    function getRedemptionRate() public view override returns (uint) {
        return _calcRedemptionRate(baseRate);
    }

    function getRedemptionRateWithDecay() public view override returns (uint) {
        return _calcRedemptionRate(_calcDecayedBaseRate());
    }

    function _calcRedemptionRate(uint _baseRate) internal pure returns (uint) {
        return LiquityMath._min(
            (DECIMAL_PRECISION / 1000 * 5).add(_baseRate),   //REDEMPTION_FEE_FLOOR = DECIMAL_PRECISION / 1000 * 5; // 0.5%
            DECIMAL_PRECISION // cap at a maximum of 100%
        );
    }

    function _getRedemptionFee(uint _FURFIDrawn) internal view returns (uint) {
        return _calcRedemptionFee(getRedemptionRate(), _FURFIDrawn);
    }

    function getRedemptionFeeWithDecay(uint _FURFIDrawn) external view override returns (uint) {
        return _calcRedemptionFee(getRedemptionRateWithDecay(), _FURFIDrawn);
    }

    function _calcRedemptionFee(uint _redemptionRate, uint _FURFIDrawn) internal pure returns (uint) {
        uint redemptionFee = _redemptionRate.mul(_FURFIDrawn).div(DECIMAL_PRECISION);
        require(redemptionFee < _FURFIDrawn, "VaultManager: Fee would eat up all returned collateral");
        return redemptionFee;
    }

    // --- Borrowing fee functions ---

    function getBorrowingRate() public view override returns (uint) {
        return _calcBorrowingRate(baseRate);
    }

    function getBorrowingRateWithDecay() public view override returns (uint) {
        return _calcBorrowingRate(_calcDecayedBaseRate());
    }

    function _calcBorrowingRate(uint _baseRate) internal pure returns (uint) {
        return LiquityMath._min(
            BORROWING_FEE_FLOOR.add(_baseRate),
            DECIMAL_PRECISION / 100 * 5 //MAX_BORROWING_FEE = DECIMAL_PRECISION / 100 * 5; // 5%
        );
    }

    function getBorrowingFee(uint _FURUSDDebt) external view override returns (uint) {
        return _calcBorrowingFee(getBorrowingRate(), _FURUSDDebt);
    }

    function getBorrowingFeeWithDecay(uint _FURUSDDebt) external view override returns (uint) {
        return _calcBorrowingFee(getBorrowingRateWithDecay(), _FURUSDDebt);
    }

    function _calcBorrowingFee(uint _borrowingRate, uint _FURUSDDebt) internal pure returns (uint) {
        return _borrowingRate.mul(_FURUSDDebt).div(DECIMAL_PRECISION);
    }


    // Updates the baseRate state variable based on time elapsed since the last redemption or FURUSD borrowing operation.
    function decayBaseRateFromBorrowing() external override {
        _requireCallerIsBorrowerOperations();

        uint decayedBaseRate = _calcDecayedBaseRate();
        assert(decayedBaseRate <= DECIMAL_PRECISION);  // The baseRate can decay to 0

        baseRate = decayedBaseRate;
        emit BaseRateUpdated(decayedBaseRate);

        _updateLastFeeOpTime();
    }

    // --- Internal fee functions ---

    // Update the last fee operation time only if time passed >= decay interval. This prevents base rate griefing.
    function _updateLastFeeOpTime() internal {
        uint timePassed = block.timestamp.sub(lastFeeOperationTime);

        if (timePassed >= 60) {
            lastFeeOperationTime = block.timestamp;
            emit LastFeeOpTimeUpdated(block.timestamp);
        }
    }

    function _calcDecayedBaseRate() internal view returns (uint) {
        uint minutesPassed = _minutesPassedSinceLastFeeOp();
        uint decayFactor = LiquityMath._decPow(999037758833783000, minutesPassed); //MINUTE_DECAY_FACTOR = 999037758833783000

        return baseRate.mul(decayFactor).div(DECIMAL_PRECISION);
    }

    function _minutesPassedSinceLastFeeOp() internal view returns (uint) {
        return (block.timestamp.sub(lastFeeOperationTime)).div(60);
    }

    // --- 'require' wrapper functions ---

    function _requireCallerIsBorrowerOperations() internal view {
        require(msg.sender == borrowerOperationsAddress, "addr!");
    }

    function _requireVaultIsActive(address _borrower) internal view {
        require(Vaults[_borrower].status == Status.active, "status!");
    }

    function _requireFURUSDBalanceCoversRedemption(IFURUSDToken _furUSDToken, address _redeemer, uint _amount) internal view {
        require(_furUSDToken.balanceOf(_redeemer) >= _amount, "balance!");
    }

    function _requireMoreThanOneVaultInSystem(uint VaultOwnersArrayLength) internal view {
        require (VaultOwnersArrayLength > 1 && sortedVaults.getSize() > 1, "length!");
    }

    function _requireAmountGreaterThanZero(uint _amount) internal pure {
        require(_amount > 0, "amount!");
    }

    function _requireTCRoverMCR(uint _price) internal view {
        require(_getTCR(_price) >= MCR, "tcr!");
    }

    function _requireAfterBootstrapPeriod() internal view {
        //14 days
        uint systemDeploymentTime = loanToken.getDeploymentStartTime();
        require(block.timestamp >= systemDeploymentTime.add(30 minutes), "lock period!");
    }

    function _requireValidMaxFeePercentage(uint _maxFeePercentage) internal pure {
        require(_maxFeePercentage >= (DECIMAL_PRECISION / 1000 * 5) && _maxFeePercentage <= DECIMAL_PRECISION,
            "max fee percentage!"); //REDEMPTION_FEE_FLOOR = DECIMAL_PRECISION / 1000 * 5; // 0.5%
    }

    // --- Vault property getters ---

    function getVaultStatus(address _borrower) external view override returns (uint) {
        return uint(Vaults[_borrower].status);
    }

    function getVaultStake(address _borrower) external view override returns (uint) {
        return Vaults[_borrower].stake;
    }

    function getVaultDebt(address _borrower) external view override returns (uint) {
        return Vaults[_borrower].debt;
    }

    function getVaultColl(address _borrower) external view override returns (uint) {
        return Vaults[_borrower].coll;
    }

    // --- Vault property setters, called by BorrowerOperations ---

    function setVaultStatus(address _borrower, uint _num) external override {
        _requireCallerIsBorrowerOperations();
        Vaults[_borrower].status = Status(_num);
    }

    function increaseVaultColl(address _borrower, uint _collIncrease) external override returns (uint) {
        _requireCallerIsBorrowerOperations();
        uint newColl = Vaults[_borrower].coll.add(_collIncrease);
        Vaults[_borrower].coll = newColl;
        return newColl;
    }

    function decreaseVaultColl(address _borrower, uint _collDecrease) external override returns (uint) {
        _requireCallerIsBorrowerOperations();
        uint newColl = Vaults[_borrower].coll.sub(_collDecrease);
        Vaults[_borrower].coll = newColl;
        return newColl;
    }

    function increaseVaultDebt(address _borrower, uint _debtIncrease) external override returns (uint) {
        _requireCallerIsBorrowerOperations();
        uint newDebt = Vaults[_borrower].debt.add(_debtIncrease);
        Vaults[_borrower].debt = newDebt;
        return newDebt;
    }

    function decreaseVaultDebt(address _borrower, uint _debtDecrease) external override returns (uint) {
        _requireCallerIsBorrowerOperations();
        uint newDebt = Vaults[_borrower].debt.sub(_debtDecrease);
        Vaults[_borrower].debt = newDebt;
        return newDebt;
    }
}
