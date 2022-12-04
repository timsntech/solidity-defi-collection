//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "../Config/BaseConfig.sol";

/// @title Furiofi strategy handler
/// @notice The contract keeps track of the liquidity pool balances, of the Furiofi staking pool lp tokens and the FurFi staking pool furFiToken rewards of a furiofi strategy investor using EIP-1973
/// @dev This contract is abstract and is intended to be inherited by furiofi.sol. FurFiToken and lp rewards are handled using round masks
abstract contract FuriofiStrategy is Initializable, BaseConfig {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    struct FuriofiStrategyParticipant {
        uint256 amount;
        uint256 furFiMask;
        uint256 pendingFurFi;
        uint256 lpMask;
        uint256 pendingLp;
        uint256 pendingAdditionalFurFi;
        uint256 additionalFurFiMask;
    }

    uint256 public furiofiStrategyDeposits;

    uint256 public furiofiStrategyLastFurFiBalance;
    uint256 public furiofiStrategyLastLpBalance;
    uint256 public furiofiStrategyLastAdditionalFurFiBalance;

    uint256 private furFiRoundMask;
    uint256 private lpRoundMask;
    uint256 private additionalFurFiRoundMask;

    event FuriofiStrategyClaimFurFiEvent(
        address indexed user,
        uint256 furFiAmount
    );
    event FuriofiStrategyClaimLpEvent(
        address indexed user,
        uint256 furFiAmount,
        uint256 bnbAmount
    );

    mapping(address => FuriofiStrategyParticipant) private participantData;

    function __FuriofiStrategy_init() internal initializer {
        furFiRoundMask = 1;
        lpRoundMask = 1;
        additionalFurFiRoundMask = 1;
    }

    /// @notice Deposits the desired amount for a furiofi strategy investor
    /// @dev User masks are updated before the deposit to have a clean state
    /// @param amount The desired deposit amount for an investor
    function furiofiStrategyDeposit(uint256 amount) internal {
        updateUserMask();
        participantData[msg.sender].amount += amount;
        furiofiStrategyDeposits += amount;
    }

    /// @notice Withdraws the desired amount for a furiofi strategy investor
    /// @dev User masks are updated before the deposit to have a clean state
    /// @param amount The desired withdraw amount for an investor
    function furiofiStrategyWithdraw(uint256 amount) internal {
        require(amount > 0, "TZ");
        require(amount <= getFuriofiStrategyBalance(msg.sender), "SD");

        updateUserMask();
        participantData[msg.sender].amount -= amount;
        furiofiStrategyDeposits -= amount;
    }

    /// @notice Stakes the furFiToken rewards into the furFiToken staking pool
    /// @param amount The furFiToken reward to be staked
    function furiofiStrategyStakeFurFi(uint256 amount) internal {
        StakingPool.stake(amount);
    }

    /// @notice Updates the round mask for the furFiToken and lp rewards
    /// @dev The furFiToken and lp rewards are requested from the FurFi staking pool for the whole contract
    function updateRoundMasks() public {
        isNotPaused();
        if (furiofiStrategyDeposits == 0) return;

        // In order to keep track of how many new tokens were rewarded to this contract, we need to take
        // into account claimed tokens as well, otherwise the balance will become lower than "last balance"
        (
            ,
            ,
            ,
            ,
            uint256 claimedFurFi,
            uint256 claimedLp,
            ,
            ,
            uint256 claimedAdditionalFurFi
        ) = StakingPool.stakerAmounts(address(this));

        uint256 newFurFiTokens = claimedFurFi +
            StakingPool.balanceOf(address(this)) -
            furiofiStrategyLastFurFiBalance;
        uint256 newLpTokens = claimedLp +
            StakingPool.lpBalanceOf(address(this)) -
            furiofiStrategyLastLpBalance;
        uint256 newAdditionalFurFiTokens = claimedAdditionalFurFi +
            StakingPool.getPendingFurFiRewards(address(this)) -
            furiofiStrategyLastAdditionalFurFiBalance;

        furiofiStrategyLastFurFiBalance += newFurFiTokens;
        furiofiStrategyLastLpBalance += newLpTokens;
        furiofiStrategyLastAdditionalFurFiBalance += newAdditionalFurFiTokens;

        furFiRoundMask +=
            (DECIMAL_OFFSET * newFurFiTokens) /
            furiofiStrategyDeposits;
        lpRoundMask += (DECIMAL_OFFSET * newLpTokens) / furiofiStrategyDeposits;
        additionalFurFiRoundMask +=
            (DECIMAL_OFFSET * newAdditionalFurFiTokens) /
            furiofiStrategyDeposits;
    }

    /// @notice Updates the user round mask for the furFiToken and lp rewards
    function updateUserMask() internal {
        updateRoundMasks();

        participantData[msg.sender].pendingFurFi +=
            ((furFiRoundMask - participantData[msg.sender].furFiMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;

        participantData[msg.sender].furFiMask = furFiRoundMask;

        participantData[msg.sender].pendingLp +=
            ((lpRoundMask - participantData[msg.sender].lpMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;

        participantData[msg.sender].lpMask = lpRoundMask;

        participantData[msg.sender].pendingAdditionalFurFi +=
            ((additionalFurFiRoundMask -
                participantData[msg.sender].additionalFurFiMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;

        participantData[msg.sender]
            .additionalFurFiMask = additionalFurFiRoundMask;
    }

    /// @notice Claims the staked furFiToken for an investor. The investors honnies are first unstaked from the FurFi staking pool and then transfered to the investor.
    /// @dev The investors furFiToken mask is updated to the current furFiToken round mask and the pending honeies are paid out
    /// @dev Can be called static to get the current investors pending FurFiToken
    /// @return the pending FurFiToken
    function furiofiStrategyClaimFurFi() public returns (uint256) {
        isNotPaused();
        updateRoundMasks();
        uint256 pendingFurFi = participantData[msg.sender].pendingFurFi +
            ((furFiRoundMask - participantData[msg.sender].furFiMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;

        participantData[msg.sender].furFiMask = furFiRoundMask;

        if (pendingFurFi > 0) {
            participantData[msg.sender].pendingFurFi = 0;
            StakingPool.unstake(pendingFurFi);

            IERC20Upgradeable(address(FurFiToken)).safeTransfer(
                msg.sender,
                pendingFurFi
            );
        }
        emit FuriofiStrategyClaimFurFiEvent(msg.sender, pendingFurFi);
        return pendingFurFi;
    }

    /// @notice Claims the staked lp tokens for an investor. The investors lps are first unstaked from the FurFi staking pool and then transfered to the investor.
    /// @dev The investors lp mask is updated to the current lp round mask and the pending lps are paid out
    /// @dev Can be called static to get the current investors pending LP
    /// @return claimedFurFi The claimed furFiToken amount
    /// @return claimedBnb The claimed bnb amount
    function furiofiStrategyClaimLP()
        public
        returns (uint256 claimedFurFi, uint256 claimedBnb)
    {
        isNotPaused();
        updateRoundMasks();
        uint256 pendingLp = participantData[msg.sender].pendingLp +
            ((lpRoundMask - participantData[msg.sender].lpMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;

        participantData[msg.sender].lpMask = lpRoundMask;

        uint256 pendingAdditionalFurFi = participantData[msg.sender]
            .pendingAdditionalFurFi +
            ((additionalFurFiRoundMask -
                participantData[msg.sender].additionalFurFiMask) *
                participantData[msg.sender].amount) /
            DECIMAL_OFFSET;

        participantData[msg.sender]
            .additionalFurFiMask = additionalFurFiRoundMask;

        uint256 _claimedFurFi = 0;
        uint256 _claimedBnb = 0;
        if (pendingLp > 0 || pendingAdditionalFurFi > 0) {
            participantData[msg.sender].pendingLp = 0;
            participantData[msg.sender].pendingAdditionalFurFi = 0;
            (_claimedFurFi, _claimedBnb) = StakingPool.claimLpTokens(
                pendingLp,
                pendingAdditionalFurFi,
                msg.sender
            );
        }
        emit FuriofiStrategyClaimLpEvent(
            msg.sender,
            _claimedFurFi,
            _claimedBnb
        );
        return (_claimedFurFi, _claimedBnb);
    }

    /// @notice Gets the current furiofi strategy balance from the liquidity pool
    /// @param staker staker address    
    /// @return The current furiofi strategy balance for the investor
    function getFuriofiStrategyBalance(address staker) public view returns (uint256) {
        return participantData[staker].amount;
    }

    /// @notice Gets the current staked furFiToken for a furiofi strategy investor
    /// @param staker staker address
    /// @dev Gets the current furFiToken balance from the FurFi staking pool to calculate the current furFiToken round mask. This is then used to calculate the total pending furFiToken for the investor
    /// @return The current furFiToken balance for a furiofi investor
    function getFuriofiStrategyStakedFurFi(address staker) public view returns (uint256) {
        if (
            participantData[msg.sender].furFiMask == 0 ||
            furiofiStrategyDeposits == 0
        ) return 0;

        (, , , , uint256 claimedFurFi, , , , ) = StakingPool.stakerAmounts(
            address(this)
        );

        uint256 newFurFiTokens = claimedFurFi +
            StakingPool.balanceOf(address(this)) -
            furiofiStrategyLastFurFiBalance;
        uint256 currentFurFiRoundMask = furFiRoundMask +
            (DECIMAL_OFFSET * newFurFiTokens) /
            furiofiStrategyDeposits;

        return
            participantData[staker].pendingFurFi +
            ((currentFurFiRoundMask - participantData[staker].furFiMask) *
                participantData[staker].amount) /
            DECIMAL_OFFSET;
    }

    /// @notice Gets the current staked lps for a furiofi strategy investor
    /// @dev Gets the current lp balance from the FurFi staking pool to calculate the current lp round mask. This is then used to calculate the total pending lp for the investor
    /// @param staker staker address
    /// @return The current lp balance for a furiofi investor
    function getFuriofiStrategyLpRewards(address staker) external view returns (uint256) {
        if (
            participantData[msg.sender].lpMask == 0 ||
            furiofiStrategyDeposits == 0
        ) return 0;

        (, , , , , uint256 claimedLp, , , ) = StakingPool.stakerAmounts(
            address(this)
        );

        uint256 newLpTokens = claimedLp +
            StakingPool.lpBalanceOf(address(this)) -
            furiofiStrategyLastLpBalance;
        uint256 currentLpRoundMask = lpRoundMask +
            (DECIMAL_OFFSET * newLpTokens) /
            furiofiStrategyDeposits;

        return
            participantData[staker].pendingLp +
            ((currentLpRoundMask - participantData[staker].lpMask) *
                participantData[staker].amount) /
            DECIMAL_OFFSET;
    }

    /// @notice Reads out the participant data
    /// @param participant The address of the participant
    /// @return Participant data
    function getFuriofiStrategyParticipantData(address participant)
        external
        view
        returns (FuriofiStrategyParticipant memory)
    {
        return participantData[participant];
    }

}