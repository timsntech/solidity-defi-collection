//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "../Config/BaseConfig.sol";

/// @title Standard strategy handler
/// @notice The contract keeps track of the balances of the lp tokens and their reinvests (rewards) including the furFiToken rewards using EIP-1973
/// @dev This contract is abstract and is intended to be inherited by furiofi.sol. FurFiToken rewards and lp rewards are handled using a round mask
abstract contract StandardStrategy is Initializable, BaseConfig {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct StandardStrategyParticipant {
        uint256 amount;
        uint256 lpMask;
        uint256 rewardMask;
        uint256 pendingRewards;
        uint256 totalReinvested;
    }

    uint256 public lpRoundMask;
    uint256 public standardStrategyDeposits;

    uint256 public totalFurFiTokenRewards;
    uint256 private furFiRoundMask;

    event StandardStrategyClaimFurFiTokenEvent(
        address indexed user,
        uint256 honeyAmount
    );

    mapping(address => StandardStrategyParticipant) private participantData;

    function __StandardStrategy_init() internal initializer {
        lpRoundMask = 1;
        furFiRoundMask = 1;
    }

    /// @notice Deposits the desired amount for a standard strategy investor
    /// @dev Pending lp rewards are rewarded and the investors rewardMask is set again to the current roundMask
    /// @param amount The desired deposit amount for an investor
    function standardStrategyDeposit(uint256 amount) internal {
        updateStandardRewardMask();
        uint256 currentDeposit = getStandardStrategyBalance();
        uint256 currentAmount = participantData[msg.sender].amount;

        standardStrategyDeposits =
            standardStrategyDeposits +
            currentDeposit -
            currentAmount +
            amount;

        participantData[msg.sender].amount = currentDeposit + amount;
        participantData[msg.sender].lpMask = lpRoundMask;
        participantData[msg.sender].totalReinvested +=
            currentDeposit -
            currentAmount;
    }

    /// @notice Withdraws the desired amount for a standard strategy investor
    /// @dev Pending lp rewards are rewarded and the investors rewardMask is set again to the current roundMask
    /// @param amount The desired withdraw amount for an investor
    function standardStrategyWithdraw(uint256 amount) internal {
        require(amount > 0, "TZ");

        updateStandardRewardMask();
        uint256 currentDeposit = getStandardStrategyBalance();
        uint256 currentAmount = participantData[msg.sender].amount;
        require(amount <= currentDeposit, "SD");

        standardStrategyDeposits =
            standardStrategyDeposits +
            currentDeposit -
            currentAmount -
            amount;

        participantData[msg.sender].amount = currentDeposit - amount;
        participantData[msg.sender].lpMask = lpRoundMask;
        participantData[msg.sender].totalReinvested +=
            currentDeposit -
            currentAmount;
    }

    /// @notice Adds global lp rewards to the contract
    /// @dev The lp roundmask is increased by the share of the rewarded amount such that investors get their share of pending lp rewards
    /// @param amount The amount to be rewarded
    function standardStrategyRewardLP(uint256 amount) internal {
        if (standardStrategyDeposits == 0) return;

        lpRoundMask += (DECIMAL_OFFSET * amount) / standardStrategyDeposits;
    }

    /// @notice Gets the current standard strategy balance for an investor. Pending lp rewards are included too
    /// @dev Pending rewards are calculated through the difference between the current round mask and the investors rewardMask according to EIP-1973
    /// @return Current standard strategy balance
    function getStandardStrategyBalance() public view returns (uint256) {
        if (participantData[msg.sender].lpMask == 0) return 0;

        return
            participantData[msg.sender].amount +
            ((lpRoundMask - participantData[msg.sender].lpMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;
    }

    /// @notice Adds global furFiToken rewards to the contract
    /// @dev The furFiToken roundmask is increased by the share of the rewarded amount such that investors get their share of pending furFiToken rewards
    /// @param amount The amount of furFiToken to be rewarded
    function standardStrategyRewardFurFi(uint256 amount) internal {
        if (standardStrategyDeposits == 0) {
            return;
        }
        totalFurFiTokenRewards += amount;
        furFiRoundMask += (DECIMAL_OFFSET * amount) / standardStrategyDeposits;
    }

    /// @notice Claims the standard strategy investors furFiToken rewards
    /// @dev Can be called static to get the current standard strategy furFiToken pending reward
    /// @return The pending rewards transfered to the investor
    function standardStrategyClaimFurFi() public returns (uint256) {
        isNotPaused();
        updateStandardRewardMask();
        uint256 pendingRewards = participantData[msg.sender].pendingRewards;
        participantData[msg.sender].pendingRewards = 0;
        IERC20Upgradeable(address(FurFiToken)).safeTransfer(
            msg.sender,
            pendingRewards
        );
        emit StandardStrategyClaimFurFiTokenEvent(msg.sender, pendingRewards);
        return pendingRewards;
    }

    /// @notice Gets the current standard strategy furFiToken rewards for an investor. Pending furFiToken rewards are included too
    /// @dev Pending rewards are calculated through the difference between the current round mask and the investors rewardMask according to EIP-1973
    /// @return Current standard strategy furFiToken rewards
    function getStandardStrategyFurFiRewards() public view returns (uint256) {
        if (participantData[msg.sender].rewardMask == 0) return 0;

        return
            participantData[msg.sender].pendingRewards +
            ((furFiRoundMask - participantData[msg.sender].rewardMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;
    }

    /// @notice Updates the standard strategy furFiToken rewards mask
    function updateStandardRewardMask() private {
        uint256 currentRewardBalance = getStandardStrategyFurFiRewards();
        participantData[msg.sender].pendingRewards = currentRewardBalance;
        participantData[msg.sender].rewardMask = furFiRoundMask;
    }

    /// @notice Reads out the participant data
    /// @param participant The address of the participant
    /// @return Participant data
    function getStandardStrategyParticipantData(address participant)
        public
        view
        returns (StandardStrategyParticipant memory)
    {
        return participantData[participant];
    }

    uint256[50] private __gap;
}