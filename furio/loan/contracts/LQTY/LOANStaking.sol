// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "../abstracts/BaseContract.sol";
import "../Dependencies/BaseMath.sol";
import "../Dependencies/LiquityMath.sol";
import "../Interfaces/ILOANToken.sol";
import "../Interfaces/ILOANStaking.sol";
import "../Interfaces/IFURUSDToken.sol";

contract LOANStaking is BaseContract, ILOANStaking, BaseMath {
    
    using SafeMath for uint;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    // --- Data ---
    string constant public NAME = "LOANStaking";

    mapping( address => uint) public stakes;
    uint public totalLOANStaked;

    uint public F_FURFI;  // Running sum of FURFI fees per-LOAN-staked
    uint public F_FURUSD; // Running sum of LOAN fees per-LOAN-staked

    // User snapshots of F_FURFI and F_FURUSD, taken at the point at which their latest deposit was made
    mapping (address => Snapshot) public snapshots; 

    struct Snapshot {
        uint F_FURFI_Snapshot;
        uint F_FURUSD_Snapshot;
    }
    
    ILOANToken public loanToken;
    IFURUSDToken public furUSDToken;
    IERC20Upgradeable public furFiToken;


    address public vaultManagerAddress;
    address public borrowerOperationsAddress;
    address public activePoolAddress;
    address public furFiAddress;

    // --- Events ---

    event StakeChanged(address indexed staker, uint newStake);
    event StakingGainsWithdrawn(address indexed staker, uint FURUSDGain, uint FURFIGain);
    event F_FURFIUpdated(uint _F_FURFI);
    event F_FURUSDUpdated(uint _F_FURUSD);
    event TotalLOANStakedUpdated(uint _totalLOANStaked);
    event FURFISent(address _account, uint _amount);
    event StakerSnapshotsUpdated(address _staker, uint _F_FURFI, uint _F_FURUSD);

    function initialize() public initializer {
        __BaseContract_init();
    }


    // --- Functions ---

    function setAddresses(
        address _loanTokenAddress,
        address _furUSDTokenAddress,
        address _vaultManagerAddress, 
        address _borrowerOperationsAddress,
        address _activePoolAddress,
        address _furFiAddress
    ) 
        external 
        onlyOwner 
    {
        loanToken = ILOANToken(_loanTokenAddress);
        furUSDToken = IFURUSDToken(_furUSDTokenAddress);
        furFiToken = IERC20Upgradeable(_furFiAddress);
        vaultManagerAddress = _vaultManagerAddress;
        borrowerOperationsAddress = _borrowerOperationsAddress;
        activePoolAddress = _activePoolAddress;
        furFiAddress = _furFiAddress;

    }

    // --- Getters for public variables ---

    function getFURFI() external view override returns (uint) {
        return furFiToken.balanceOf(address(this));
    }

    function getFURUSD() external view override returns (uint) {
        return furUSDToken.balanceOf(address(this));
    }

    function getTotalLOANDeposits() external view override returns (uint) {
        return totalLOANStaked;
    }

    // If caller has a pre-existing stake, send any accumulated FURFI and FURUSD gains to them. 
    function stake(uint _LOANamount) external override whenNotPaused {
        _requireNonZeroAmount(_LOANamount);

        uint currentStake = stakes[msg.sender];

        uint FURFIGain;
        uint FURUSDGain;
        // Grab any accumulated FURFI and FURUSD gains from the current stake
        if (currentStake != 0) {
            FURFIGain = _getPendingFURFIGain(msg.sender);
            FURUSDGain = _getPendingFURUSDGain(msg.sender);
        }
    
       _updateUserSnapshots(msg.sender);

        uint newStake = currentStake.add(_LOANamount);

        // Increase user’s stake and total LOAN staked
        stakes[msg.sender] = newStake;
        totalLOANStaked = totalLOANStaked.add(_LOANamount);
        emit TotalLOANStakedUpdated(totalLOANStaked);

        // Transfer LOAN from caller to this contract
        loanToken.sendToLOANStaking(msg.sender, _LOANamount);

        emit StakeChanged(msg.sender, newStake);
        emit StakingGainsWithdrawn(msg.sender, FURUSDGain, FURFIGain);

         // Send accumulated FURUSD and FURFI gains to the caller
        if (currentStake != 0) {
            furUSDToken.transfer(msg.sender, FURUSDGain);
            _sendFURFIGainToUser(FURFIGain);
        }
    }

    // Unstake the LOAN and send the it back to the caller, along with their accumulated FURUSD & FURFI gains. 
    // If requested amount > stake, send their entire stake.
    function unstake(uint _LOANamount) external override whenNotPaused {
        uint currentStake = stakes[msg.sender];
        _requireUserHasStake(currentStake);

        // Grab any accumulated FURFI and FURUSD gains from the current stake
        uint FURFIGain = _getPendingFURFIGain(msg.sender);
        uint FURUSDGain = _getPendingFURUSDGain(msg.sender);
        
        _updateUserSnapshots(msg.sender);

        if (_LOANamount > 0) {
            uint LOANToWithdraw = LiquityMath._min(_LOANamount, currentStake);

            uint newStake = currentStake.sub(LOANToWithdraw);

            // Decrease user's stake and total LOAN staked
            stakes[msg.sender] = newStake;
            totalLOANStaked = totalLOANStaked.sub(LOANToWithdraw);
            emit TotalLOANStakedUpdated(totalLOANStaked);

            // Transfer unstaked LOAN to user
            loanToken.transfer(msg.sender, LOANToWithdraw);

            emit StakeChanged(msg.sender, newStake);
        }

        emit StakingGainsWithdrawn(msg.sender, FURUSDGain, FURFIGain);

        // Send accumulated FURUSD and FURFI gains to the caller
        furUSDToken.transfer(msg.sender, FURUSDGain);
        _sendFURFIGainToUser(FURFIGain);
    }

    // --- Reward-per-unit-staked increase functions. Called by Liquity core contracts ---

    function increaseF_FURFI(uint _FURFIFee) external override whenNotPaused {
        _requireCallerIsVaultManager();
        uint FURFIFeePerLOANStaked;
     
        if (totalLOANStaked > 0) {FURFIFeePerLOANStaked = _FURFIFee.mul(DECIMAL_PRECISION).div(totalLOANStaked);}

        F_FURFI = F_FURFI.add(FURFIFeePerLOANStaked);
        emit F_FURFIUpdated(F_FURFI);
    }

    function increaseF_FURUSD(uint _FURUSDFee) external override whenNotPaused {
        _requireCallerIsBorrowerOperations();
        uint FURUSDFeePerLOANStaked;
        
        if (totalLOANStaked > 0) {FURUSDFeePerLOANStaked = _FURUSDFee.mul(DECIMAL_PRECISION).div(totalLOANStaked);}
        
        F_FURUSD = F_FURUSD.add(FURUSDFeePerLOANStaked);
        emit F_FURUSDUpdated(F_FURUSD);
    }

    // --- Pending reward functions ---

    function getPendingFURFIGain(address _user) external view override returns (uint) {
        return _getPendingFURFIGain(_user);
    }

    function _getPendingFURFIGain(address _user) internal view returns (uint) {
        uint F_FURFI_Snapshot = snapshots[_user].F_FURFI_Snapshot;
        uint FURFIGain = stakes[_user].mul(F_FURFI.sub(F_FURFI_Snapshot)).div(DECIMAL_PRECISION);
        return FURFIGain;
    }

    function getPendingFURUSDGain(address _user) external view override returns (uint) {
        return _getPendingFURUSDGain(_user);
    }

    function _getPendingFURUSDGain(address _user) internal view returns (uint) {
        uint F_FURUSD_Snapshot = snapshots[_user].F_FURUSD_Snapshot;
        uint FURUSDGain = stakes[_user].mul(F_FURUSD.sub(F_FURUSD_Snapshot)).div(DECIMAL_PRECISION);
        return FURUSDGain;
    }

    // --- Internal helper functions ---

    function _updateUserSnapshots(address _user) internal {
        snapshots[_user].F_FURFI_Snapshot = F_FURFI;
        snapshots[_user].F_FURUSD_Snapshot = F_FURUSD;
        emit StakerSnapshotsUpdated(_user, F_FURFI, F_FURUSD);
    }

    function _sendFURFIGainToUser(uint FURFIGain) internal {
        emit FURFISent(msg.sender, FURFIGain);
        
        IERC20Upgradeable FurFiToken = IERC20Upgradeable(furFiAddress);
        FurFiToken.safeTransfer(msg.sender, FURFIGain);
    }

    // --- 'require' functions ---

    function _requireCallerIsVaultManager() internal view {
        require(msg.sender == vaultManagerAddress, "LOANStaking: caller is not VaultM");
    }

    function _requireCallerIsBorrowerOperations() internal view {
        require(msg.sender == borrowerOperationsAddress, "LOANStaking: caller is not BorrowerOps");
    }

     function _requireCallerIsActivePool() internal view {
        require(msg.sender == activePoolAddress, "LOANStaking: caller is not ActivePool");
    }

    function _requireUserHasStake(uint currentStake) internal pure {  
        require(currentStake > 0, 'LOANStaking: User must have a non-zero stake');  
    }

    function _requireNonZeroAmount(uint _amount) internal pure {
        require(_amount > 0, 'LOANStaking: Amount must be non-zero');
    }
}
