// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "./abstracts/BaseContract.sol";
import './Interfaces/IBorrowerOperations.sol';
import './Interfaces/IStabilityPool.sol';
import './Interfaces/IBorrowerOperations.sol';
import './Interfaces/IVaultManager.sol';
import './Interfaces/IFURUSDToken.sol';
import './Interfaces/ISortedVaults.sol';
import "./Interfaces/ICommunityIssuance.sol";
import "./Dependencies/LiquityBase.sol";
import "./Dependencies/LiquitySafeMath128.sol";

contract StabilityPool is BaseContract, LiquityBase, IStabilityPool {

    using SafeMath for uint;
    using LiquitySafeMath128 for uint128;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    string constant public NAME = "StabilityPool";

    IBorrowerOperations public borrowerOperations;

    IVaultManager public vaultManager;

    IFURUSDToken public furUSDToken;

    IERC20Upgradeable public furFiToken;

    // Needed to check if there are pending liquidations
    ISortedVaults public sortedVaults;

    ICommunityIssuance public communityIssuance;

    // Tracker for FURUSD held in the pool. Changes when users deposit/withdraw, and when Vault debt is offset.
    uint256 internal totalFURUSDDeposits;
    
    struct Deposit {
        uint initialValue;
    }

    struct Snapshots {
        uint S;
        uint P;
        uint G;
        uint128 scale;
        uint128 epoch;
    }

    mapping (address => uint256) public depositorInitialValues ;  // depositor address -> Depositor initialvalue
    mapping (address => Snapshots) public depositSnapshots;  // depositor address -> snapshots struct

    /*  Product 'P': Running product by which to multiply an initial deposit, in order to find the current compounded deposit,
    * after a series of liquidations have occurred, each of which cancel some FURUSD debt with the deposit.
    *
    * During its lifetime, a deposit's value evolves from d_t to d_t * P / P_t , where P_t
    * is the snapshot of P taken at the instant the deposit was made. 18-digit decimal.
    */
    uint public P;

    uint public  SCALE_FACTOR;

    // Each time the scale of P shifts by SCALE_FACTOR, the scale is incremented by 1
    uint128 public currentScale;

    // With each offset that fully empties the Pool, the epoch is incremented by 1
    uint128 public currentEpoch;

    /* FURFI Gain sum 'S': During its lifetime, each deposit d_t earns an FURFI gain of ( d_t * [S - S_t] )/P_t, where S_t
    * is the depositor's snapshot of S taken at the time t when the deposit was made.
    *
    * The 'S' sums are stored in a nested mapping (epoch => scale => sum):
    *
    * - The inner mapping records the sum S at different scales
    * - The outer mapping records the (scale => sum) mappings, for different epochs.
    */
    mapping (uint128 => mapping(uint128 => uint)) public epochToScaleToSum;

    /*
    * Similarly, the sum 'G' is used to calculate LOAN gains. During it's lifetime, each deposit d_t earns a LOAN gain of
    *  ( d_t * [G - G_t] )/P_t, where G_t is the depositor's snapshot of G taken at time t when  the deposit was made.
    *
    *  LOAN reward events occur are triggered by depositor operations (new deposit, topup, withdrawal), and liquidations.
    *  In each case, the LOAN reward is issued (i.e. G is updated), before other state changes are made.
    */
    mapping (uint128 => mapping(uint128 => uint)) public epochToScaleToG;

    // Error tracker for the error correction in the LOAN issuance calculation
    uint public lastLOANError;
    // Error trackers for the error correction in the offset calculation
    uint public lastFURFIError_Offset;
    uint public lastFURUSDLossError_Offset;

    // --- Events ---

    event StabilityPoolFURFIBalanceUpdated(uint _newBalance);
    event StabilityPoolFURUSDBalanceUpdated(uint _newBalance);

    event P_Updated(uint _P);
    event S_Updated(uint _S, uint128 _epoch, uint128 _scale);
    event G_Updated(uint _G, uint128 _epoch, uint128 _scale);
    event EpochUpdated(uint128 _currentEpoch);
    event ScaleUpdated(uint128 _currentScale);

    event DepositSnapshotUpdated(address indexed _depositor, uint _P, uint _S, uint _G);
    event UserDepositChanged(address indexed _depositor, uint _newDeposit);

    event FURFIGainWithdrawn(address indexed _depositor, uint _FURFI, uint _FURUSDLoss);
    event LOANPaidToDepositor(address indexed _depositor, uint _LOAN);
    event FURFISent(address _to, uint _amount);

    function initialize() public initializer {
        __BaseContract_init();

        P = DECIMAL_PRECISION;
        SCALE_FACTOR = 1e9;
    }

    // --- Contract setters ---

    function setAddresses(
        address _borrowerOperationsAddress,
        address _vaultManagerAddress,
        address _activePoolAddress,
        address _furUSDTokenAddress,
        address _sortedVaultsAddress,
        address _priceFeedAddress,
        address _communityIssuanceAddress,
        address _furFiAddress
    )
        external
        onlyOwner
    {
        borrowerOperations = IBorrowerOperations(_borrowerOperationsAddress);
        vaultManager = IVaultManager(_vaultManagerAddress);
        activePool = IActivePool(_activePoolAddress);
        furUSDToken = IFURUSDToken(_furUSDTokenAddress);
        sortedVaults = ISortedVaults(_sortedVaultsAddress);
        priceFeed = IPriceFeed(_priceFeedAddress);
        communityIssuance = ICommunityIssuance(_communityIssuanceAddress);
        furFiToken = IERC20Upgradeable(_furFiAddress);
    }

    // --- Getters for public variables ---

    function getFURFI() public view override returns (uint) {
        return furFiToken.balanceOf(address(this));
    }

    function getTotalFURUSDDeposits() external view override returns (uint) {
        return totalFURUSDDeposits;
    }

    // --- External Depositor Functions ---

    /*  provideToSP():
    *
    * - Triggers a LOAN issuance, based on time passed since the last issuance. The LOAN issuance is shared between *all* depositors
    * - Sends depositor's accumulated gains (LOAN, FURFI) to depositor
    * - Increases deposit, and takes new snapshots for each.
    */
    function provideToSP(uint _amount) external override whenNotPaused {
        _requireNonZeroAmount(_amount);

        uint initialDeposit = depositorInitialValues[msg.sender];

        ICommunityIssuance communityIssuanceCached = communityIssuance;

        _triggerLOANIssuance(communityIssuanceCached);

        uint depositorFURFIGain = getDepositorFURFIGain(msg.sender);
        uint compoundedFURUSDDeposit = getCompoundedFURUSDDeposit(msg.sender);
        uint FURUSDLoss = initialDeposit.sub(compoundedFURUSDDeposit); // Needed only for event log

        _payOutLOANGains(communityIssuanceCached, msg.sender);
        _sendFURFIGainToDepositor(depositorFURFIGain);
        _sendFURUSDtoStabilityPool(msg.sender, _amount);

        uint newDeposit = compoundedFURUSDDeposit.add(_amount);
        _updateDepositAndSnapshots(msg.sender, newDeposit);

        emit UserDepositChanged(msg.sender, newDeposit);
        emit FURFIGainWithdrawn(msg.sender, depositorFURFIGain, FURUSDLoss); // FURUSD Loss required for event log
     }

    /*  withdrawFromSP():
    *
    * - Triggers a LOAN issuance, based on time passed since the last issuance. The LOAN issuance is shared between *all* depositors
    * - Sends all depositor's accumulated gains (LOAN, FURFI) to depositor
    * - Decreases deposit, and takes new snapshots for each.
    *
    * If _amount > userDeposit, the user withdraws all of their compounded deposit.
    */
    function withdrawFromSP(uint _amount) external override whenNotPaused {
        if (_amount !=0) {_requireNoUnderCollateralizedVaults();}
        uint initialDeposit = depositorInitialValues[msg.sender];
        _requireUserHasDeposit(initialDeposit);

        ICommunityIssuance communityIssuanceCached = communityIssuance;

        _triggerLOANIssuance(communityIssuanceCached);

        uint depositorFURFIGain = getDepositorFURFIGain(msg.sender);

        uint compoundedFURUSDDeposit = getCompoundedFURUSDDeposit(msg.sender);
        uint FURUSDtoWithdraw = LiquityMath._min(_amount, compoundedFURUSDDeposit);
        uint FURUSDLoss = initialDeposit.sub(compoundedFURUSDDeposit); // Needed only for event log

        _payOutLOANGains(communityIssuanceCached, msg.sender);
        _sendFURFIGainToDepositor(depositorFURFIGain);
        _sendFURUSDToDepositor(msg.sender, FURUSDtoWithdraw);

        // Update deposit
        uint newDeposit = compoundedFURUSDDeposit.sub(FURUSDtoWithdraw);
        _updateDepositAndSnapshots(msg.sender, newDeposit);

        emit UserDepositChanged(msg.sender, newDeposit);
        emit FURFIGainWithdrawn(msg.sender, depositorFURFIGain, FURUSDLoss);  // FURUSD Loss required for event log
    }

    /* withdrawFURFIGainToVault:
    * - Triggers a LOAN issuance, based on time passed since the last issuance. The LOAN issuance is shared between *all* depositors
    * - Sends all depositor's LOAN gain to  depositor
    * - Transfers the depositor's entire FURFI gain from the Stability Pool to the caller's vault
    * - Leaves their compounded deposit in the Stability Pool
    * - Updates snapshots for deposit*/
    function withdrawFURFIGainToVault(address _upperHint, address _lowerHint) external override whenNotPaused {
        uint initialDeposit = depositorInitialValues[msg.sender];
        _requireUserHasDeposit(initialDeposit);
        _requireUserHasVault(msg.sender);
        _requireUserHasFURFIGain(msg.sender);

        ICommunityIssuance communityIssuanceCached = communityIssuance;

        _triggerLOANIssuance(communityIssuanceCached);

        uint depositorFURFIGain = getDepositorFURFIGain(msg.sender);

        uint compoundedFURUSDDeposit = getCompoundedFURUSDDeposit(msg.sender);
        uint FURUSDLoss = initialDeposit.sub(compoundedFURUSDDeposit); // Needed only for event log

        _payOutLOANGains(communityIssuanceCached, msg.sender);

        _updateDepositAndSnapshots(msg.sender, compoundedFURUSDDeposit);

        /* Emit events before transferring FURFI gain to Vault.
         This lets the event log make more sense (i.e. so it appears that first the FURFI gain is withdrawn
        and then it is deposited into the Vault, not the other way around). */
        emit FURFIGainWithdrawn(msg.sender, depositorFURFIGain, FURUSDLoss);
        emit UserDepositChanged(msg.sender, compoundedFURUSDDeposit);

        borrowerOperations.moveFURFIGainToVault(msg.sender, depositorFURFIGain, _upperHint, _lowerHint);

        uint256 FURFI = getFURFI();
        emit StabilityPoolFURFIBalanceUpdated(FURFI);
        emit FURFISent(msg.sender, depositorFURFIGain);

    }

    // --- LOAN issuance functions ---

    function _triggerLOANIssuance(ICommunityIssuance _communityIssuance) internal {
        uint LOANIssuance = _communityIssuance.issueLOAN();
       _updateG(LOANIssuance);
    }

    function _updateG(uint _LOANIssuance) internal {
        uint totalFURUSD = totalFURUSDDeposits; // cached to save an SLOAD
        /*
        * When total deposits is 0, G is not updated. In this case, the LOAN issued can not be obtained by later
        * depositors - it is missed out on, and remains in the balanceof the CommunityIssuance contract.
        *
        */
        if (totalFURUSD == 0 || _LOANIssuance == 0) {return;}

        uint LOANPerUnitStaked;
        LOANPerUnitStaked =_computeLOANPerUnitStaked(_LOANIssuance, totalFURUSD);

        uint marginalLOANGain = LOANPerUnitStaked.mul(P);
        epochToScaleToG[currentEpoch][currentScale] = epochToScaleToG[currentEpoch][currentScale].add(marginalLOANGain);

        emit G_Updated(epochToScaleToG[currentEpoch][currentScale], currentEpoch, currentScale);
    }

    function _computeLOANPerUnitStaked(uint _LOANIssuance, uint _totalFURUSDDeposits) internal returns (uint) {
        /*  
        * Calculate the LOAN-per-unit staked.  Division uses a "feedback" error correction, to keep the 
        * cumulative error low in the running total G:
        *
        * 1) Form a numerator which compensates for the floor division error that occurred the last time this 
        * function was called.  
        * 2) Calculate "per-unit-staked" ratio.
        * 3) Multiply the ratio back by its denominator, to reveal the current floor division error.
        * 4) Store this error for use in the next correction when this function is called.
        * 5) Note: static analysis tools complain about this "division before multiplication", however, it is intended.
        */
        uint LOANNumerator = _LOANIssuance.mul(DECIMAL_PRECISION).add(lastLOANError);

        uint LOANPerUnitStaked = LOANNumerator.div(_totalFURUSDDeposits);
        lastLOANError = LOANNumerator.sub(LOANPerUnitStaked.mul(_totalFURUSDDeposits));

        return LOANPerUnitStaked;
    }

    // --- Liquidation functions ---

    /*
    * Cancels out the specified debt against the FURUSD contained in the Stability Pool (as far as possible)
    * and transfers the Vault's FURFI collateral from ActivePool to StabilityPool.
    * Only called by liquidation functions in the VaultManager.
    */
    function offset(uint _debtToOffset, uint _collToAdd) external override whenNotPaused {
        _requireCallerIsVaultManager();
        uint totalFURUSD = totalFURUSDDeposits; // cached to save an SLOAD
        if (totalFURUSD == 0 || _debtToOffset == 0) { return; }

        _triggerLOANIssuance(communityIssuance);

        (uint FURFIGainPerUnitStaked,
            uint FURUSDLossPerUnitStaked) = _computeRewardsPerUnitStaked(_collToAdd, _debtToOffset, totalFURUSD);

        _updateRewardSumAndProduct(FURFIGainPerUnitStaked, FURUSDLossPerUnitStaked);  // updates S and P

        _moveOffsetCollAndDebt(_collToAdd, _debtToOffset);
    }

    // --- Offset helper functions ---

    function _computeRewardsPerUnitStaked(
        uint _collToAdd,
        uint _debtToOffset,
        uint _totalFURUSDDeposits
    )
        internal
        returns (uint FURFIGainPerUnitStaked, uint FURUSDLossPerUnitStaked)
    {
        /*
        * Compute the FURUSD and FURFI rewards. Uses a "feedback" error correction, to keep
        * the cumulative error in the P and S state variables low:
        *
        * 1) Form numerators which compensate for the floor division errors that occurred the last time this 
        * function was called.  
        * 2) Calculate "per-unit-staked" ratios.
        * 3) Multiply each ratio back by its denominator, to reveal the current floor division error.
        * 4) Store these errors for use in the next correction when this function is called.
        * 5) Note: static analysis tools complain about this "division before multiplication", however, it is intended.
        */
        uint FURFINumerator = _collToAdd.mul(DECIMAL_PRECISION).add(lastFURFIError_Offset);

        assert(_debtToOffset <= _totalFURUSDDeposits);
        if (_debtToOffset == _totalFURUSDDeposits) {
            FURUSDLossPerUnitStaked = DECIMAL_PRECISION;  // When the Pool depletes to 0, so does each deposit 
            lastFURUSDLossError_Offset = 0;
        } else {
            uint FURUSDLossNumerator = _debtToOffset.mul(DECIMAL_PRECISION).sub(lastFURUSDLossError_Offset);
            /*
            * Add 1 to make error in quotient positive. We want "slightly too much" FURUSD loss,
            * which ensures the error in any given compoundedFURUSDDeposit favors the Stability Pool.
            */
            FURUSDLossPerUnitStaked = (FURUSDLossNumerator.div(_totalFURUSDDeposits)).add(1);
            lastFURUSDLossError_Offset = (FURUSDLossPerUnitStaked.mul(_totalFURUSDDeposits)).sub(FURUSDLossNumerator);
        }

        FURFIGainPerUnitStaked = FURFINumerator.div(_totalFURUSDDeposits);
        lastFURFIError_Offset = FURFINumerator.sub(FURFIGainPerUnitStaked.mul(_totalFURUSDDeposits));

        return (FURFIGainPerUnitStaked, FURUSDLossPerUnitStaked);
    }

    // Update the Stability Pool reward sum S and product P
    function _updateRewardSumAndProduct(uint _FURFIGainPerUnitStaked, uint _FURUSDLossPerUnitStaked) internal {
        uint currentP = P;
        uint newP;

        assert(_FURUSDLossPerUnitStaked <= DECIMAL_PRECISION);
        /*
        * The newProductFactor is the factor by which to change all deposits, due to the depletion of Stability Pool FURUSD in the liquidation.
        * We make the product factor 0 if there was a pool-emptying. Otherwise, it is (1 - FURUSDLossPerUnitStaked)
        */
        uint newProductFactor = uint(DECIMAL_PRECISION).sub(_FURUSDLossPerUnitStaked);

        uint128 currentScaleCached = currentScale;
        uint128 currentEpochCached = currentEpoch;
        uint currentS = epochToScaleToSum[currentEpochCached][currentScaleCached];

        /*
        * Calculate the new S first, before we update P.
        * The FURFI gain for any given depositor from a liquidation depends on the value of their deposit
        * (and the value of totalDeposits) prior to the Stability being depleted by the debt in the liquidation.
        *
        * Since S corresponds to FURFI gain, and P to deposit loss, we update S first.
        */
        uint marginalFURFIGain = _FURFIGainPerUnitStaked.mul(currentP);
        uint newS = currentS.add(marginalFURFIGain);
        epochToScaleToSum[currentEpochCached][currentScaleCached] = newS;
        emit S_Updated(newS, currentEpochCached, currentScaleCached);

        // If the Stability Pool was emptied, increment the epoch, and reset the scale and product P
        if (newProductFactor == 0) {
            currentEpoch = currentEpochCached.add(1);
            emit EpochUpdated(currentEpoch);
            currentScale = 0;
            emit ScaleUpdated(currentScale);
            newP = DECIMAL_PRECISION;

        // If multiplying P by a non-zero product factor would reduce P below the scale boundary, increment the scale
        } else if (currentP.mul(newProductFactor).div(DECIMAL_PRECISION) < SCALE_FACTOR) {
            newP = currentP.mul(newProductFactor).mul(SCALE_FACTOR).div(DECIMAL_PRECISION); 
            currentScale = currentScaleCached.add(1);
            emit ScaleUpdated(currentScale);
        } else {
            newP = currentP.mul(newProductFactor).div(DECIMAL_PRECISION);
        }

        assert(newP > 0);
        P = newP;

        emit P_Updated(newP);
    }

    function _moveOffsetCollAndDebt(uint _collToAdd, uint _debtToOffset) internal {
        IActivePool activePoolCached = activePool;

        // Cancel the liquidated FURUSD debt with the FURUSD in the stability pool
        activePoolCached.decreaseFURUSDDebt(_debtToOffset);
        _decreaseFURUSD(_debtToOffset);

        // Burn the debt that was successfully offset
        furUSDToken.burn(address(this), _debtToOffset);

        activePoolCached.sendFURFI(address(this), _collToAdd);
    }

    function _decreaseFURUSD(uint _amount) internal {
        uint newTotalFURUSDDeposits = totalFURUSDDeposits.sub(_amount);
        totalFURUSDDeposits = newTotalFURUSDDeposits;
        emit StabilityPoolFURUSDBalanceUpdated(newTotalFURUSDDeposits);
    }

    // --- Reward calculator functions for depositor ---

    /* Calculates the FURFI gain earned by the deposit since its last snapshots were taken.
    * Given by the formula:  E = d0 * (S - S(0))/P(0)
    * where S(0) and P(0) are the depositor's snapshots of the sum S and product P, respectively.
    * d0 is the last recorded deposit value.
    */
    function getDepositorFURFIGain(address _depositor) public view override returns (uint) {
        uint initialDeposit = depositorInitialValues[_depositor];

        if (initialDeposit == 0) { return 0; }

        Snapshots memory snapshots = depositSnapshots[_depositor];

        uint FURFIGain = _getFURFIGainFromSnapshots(initialDeposit, snapshots);
        return FURFIGain;
    }

    function _getFURFIGainFromSnapshots(uint initialDeposit, Snapshots memory snapshots) internal view returns (uint) {
        /*
        * Grab the sum 'S' from the epoch at which the stake was made. The FURFI gain may span up to one scale change.
        * If it does, the second portion of the FURFI gain is scaled by 1e9.
        * If the gain spans no scale change, the second portion will be 0.
        */
        uint128 epochSnapshot = snapshots.epoch;
        uint128 scaleSnapshot = snapshots.scale;
        uint S_Snapshot = snapshots.S;
        uint P_Snapshot = snapshots.P;

        uint firstPortion = epochToScaleToSum[epochSnapshot][scaleSnapshot].sub(S_Snapshot);
        uint secondPortion = epochToScaleToSum[epochSnapshot][scaleSnapshot.add(1)].div(SCALE_FACTOR);

        uint FURFIGain = initialDeposit.mul(firstPortion.add(secondPortion)).div(P_Snapshot).div(DECIMAL_PRECISION);

        return FURFIGain;
    }

    /*
    * Calculate the LOAN gain earned by a deposit since its last snapshots were taken.
    * Given by the formula:  LOAN = d0 * (G - G(0))/P(0)
    * where G(0) and P(0) are the depositor's snapshots of the sum G and product P, respectively.
    * d0 is the last recorded deposit value.
    */
    function getDepositorLOANGain(address _depositor) public view override returns (uint) {
        uint initialDeposit = depositorInitialValues[_depositor];
        if (initialDeposit == 0) {return 0;}

        Snapshots memory snapshots = depositSnapshots[_depositor];

        uint LOANGain = _getLOANGainFromSnapshots(initialDeposit, snapshots);

        return LOANGain;
    }

    function _getLOANGainFromSnapshots(uint initialStake, Snapshots memory snapshots) internal view returns (uint) {
       /*
        * Grab the sum 'G' from the epoch at which the stake was made. The LOAN gain may span up to one scale change.
        * If it does, the second portion of the LOAN gain is scaled by 1e9.
        * If the gain spans no scale change, the second portion will be 0.
        */
        uint128 epochSnapshot = snapshots.epoch;
        uint128 scaleSnapshot = snapshots.scale;
        uint G_Snapshot = snapshots.G;
        uint P_Snapshot = snapshots.P;

        uint firstPortion = epochToScaleToG[epochSnapshot][scaleSnapshot].sub(G_Snapshot);
        uint secondPortion = epochToScaleToG[epochSnapshot][scaleSnapshot.add(1)].div(SCALE_FACTOR);

        uint LOANGain = initialStake.mul(firstPortion.add(secondPortion)).div(P_Snapshot).div(DECIMAL_PRECISION);

        return LOANGain;
    }

    // --- Compounded deposit ---

    /*
    * Return the user's compounded deposit. Given by the formula:  d = d0 * P/P(0)
    * where P(0) is the depositor's snapshot of the product P, taken when they last updated their deposit.
    */
    function getCompoundedFURUSDDeposit(address _depositor) public view override returns (uint) {
        uint initialDeposit = depositorInitialValues[_depositor];
        if (initialDeposit == 0) { return 0; }

        Snapshots memory snapshots = depositSnapshots[_depositor];

        uint compoundedDeposit = _getCompoundedStakeFromSnapshots(initialDeposit, snapshots);
        return compoundedDeposit;
    }

    // Internal function, used to calculcate compounded deposits.
    function _getCompoundedStakeFromSnapshots(
        uint initialStake,
        Snapshots memory snapshots
    )
        internal
        view
        returns (uint)
    {
        uint snapshot_P = snapshots.P;
        uint128 scaleSnapshot = snapshots.scale;
        uint128 epochSnapshot = snapshots.epoch;

        // If stake was made before a pool-emptying event, then it has been fully cancelled with debt -- so, return 0
        if (epochSnapshot < currentEpoch) { return 0; }

        uint compoundedStake;
        uint128 scaleDiff = currentScale.sub(scaleSnapshot);

        /* Compute the compounded stake. If a scale change in P was made during the stake's lifetime,
        * account for it. If more than one scale change was made, then the stake has decreased by a factor of
        * at least 1e-9 -- so return 0.
        */
        if (scaleDiff == 0) {
            compoundedStake = initialStake.mul(P).div(snapshot_P);
        } else if (scaleDiff == 1) {
            compoundedStake = initialStake.mul(P).div(snapshot_P).div(SCALE_FACTOR);
        } else { // if scaleDiff >= 2
            compoundedStake = 0;
        }

        /*
        * If compounded deposit is less than a billionth of the initial deposit, return 0.
        *
        * NOTE: originally, this line was in place to stop rounding errors making the deposit too large. However, the error
        * corrections should ensure the error in P "favors the Pool", i.e. any given compounded deposit should slightly less
        * than it's theoretical value.
        *
        * Thus it's unclear whether this line is still really needed.
        */
        if (compoundedStake < initialStake.div(1e9)) {return 0;}

        return compoundedStake;
    }

    // --- Sender functions for FURUSD deposit, FURFI gains and LOAN gains ---

    // Transfer the FURUSD tokens from the user to the Stability Pool's address, and update its recorded FURUSD
    function _sendFURUSDtoStabilityPool(address _address, uint _amount) internal {
        furUSDToken.sendToPool(_address, address(this), _amount);
        uint newTotalFURUSDDeposits = totalFURUSDDeposits.add(_amount);
        totalFURUSDDeposits = newTotalFURUSDDeposits;
        emit StabilityPoolFURUSDBalanceUpdated(newTotalFURUSDDeposits);
    }

    function _sendFURFIGainToDepositor(uint _amount) internal {
        if (_amount == 0) {return;}
        furFiToken.safeTransfer(msg.sender, _amount);
        uint256 FURFI = getFURFI();
        emit StabilityPoolFURFIBalanceUpdated(FURFI);
        emit FURFISent(msg.sender, _amount);
    }

    // Send FURUSD to user and decrease FURUSD in Pool
    function _sendFURUSDToDepositor(address _depositor, uint FURUSDWithdrawal) internal {
        if (FURUSDWithdrawal == 0) {return;}

        furUSDToken.returnFromPool(address(this), _depositor, FURUSDWithdrawal);
        _decreaseFURUSD(FURUSDWithdrawal);
    }

    function _updateDepositAndSnapshots(address _depositor, uint _newValue) internal {
        depositorInitialValues[_depositor]= _newValue;

        if (_newValue == 0) {
            delete depositSnapshots[_depositor];
            emit DepositSnapshotUpdated(_depositor, 0, 0, 0);
            return;
        }
        uint128 currentScaleCached = currentScale;
        uint128 currentEpochCached = currentEpoch;
        uint currentP = P;

        // Get S and G for the current epoch and current scale
        uint currentS = epochToScaleToSum[currentEpochCached][currentScaleCached];
        uint currentG = epochToScaleToG[currentEpochCached][currentScaleCached];

        // Record new snapshots of the latest running product P, sum S, and sum G, for the depositor
        depositSnapshots[_depositor].P = currentP;
        depositSnapshots[_depositor].S = currentS;
        depositSnapshots[_depositor].G = currentG;
        depositSnapshots[_depositor].scale = currentScaleCached;
        depositSnapshots[_depositor].epoch = currentEpochCached;

        emit DepositSnapshotUpdated(_depositor, currentP, currentS, currentG);
    }

    function _payOutLOANGains(ICommunityIssuance _communityIssuance, address _depositor) internal {
        // Pay out depositor's LOAN gain
        uint depositorLOANGain = getDepositorLOANGain(_depositor);
        _communityIssuance.sendLOAN(_depositor, depositorLOANGain);
        emit LOANPaidToDepositor(_depositor, depositorLOANGain);
    }

    // --- 'require' functions ---

    function _requireCallerIsActivePool() internal view {
        require( msg.sender == address(activePool), "StabilityPool: Caller is not ActivePool");
    }

    function _requireCallerIsVaultManager() internal view {
        require(msg.sender == address(vaultManager), "StabilityPool: Caller is not VaultManager");
    }

    function _requireNoUnderCollateralizedVaults() internal {
        uint price = priceFeed.fetchPrice();
        address lowestVault = sortedVaults.getLast();
        uint ICR = vaultManager.getCurrentICR(lowestVault, price);
        require(ICR >= MCR, "StabilityPool: Cannot withdraw while there are vaults with ICR < MCR");
    }

    function _requireUserHasDeposit(uint _initialDeposit) internal pure {
        require(_initialDeposit > 0, 'StabilityPool: User must have a non-zero deposit');
    }

    function _requireNonZeroAmount(uint _amount) internal pure {
        require(_amount > 0, 'StabilityPool: Amount must be non-zero');
    }

    function _requireUserHasVault(address _depositor) internal view {
        require(vaultManager.getVaultStatus(_depositor) == 1, "StabilityPool: caller must have an active vault to withdraw FURFIGain to");
    }

    function _requireUserHasFURFIGain(address _depositor) internal view {
        uint FURFIGain = getDepositorFURFIGain(_depositor);
        require(FURFIGain > 0, "StabilityPool: caller must have non-zero FURFI Gain");
    }
}
