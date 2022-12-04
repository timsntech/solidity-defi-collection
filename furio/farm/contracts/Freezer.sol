
//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./Interfaces/IFurioFinanceToken.sol";
import "./Interfaces/IStakingPool.sol";
import "./Interfaces/IFreezer.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract Freezer is
    Initializable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    IFreezer
{
    receive() external payable {}

    using SafeERC20Upgradeable for IERC20Upgradeable;
    uint256 public constant DECIMAL_OFFSET = 10e12;
    bytes32 public constant RECOVERY_ROLE = keccak256("RECOVERY_ROLE");
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    IFurioFinanceToken public FurFiToken;
    IStakingPool public StakingPool;
    mapping(address => mapping(uint256 => Participant)) private participants;
    mapping(address => uint256) private rounds;
    mapping(address => uint256) public freezerPoints;

    uint256 private furFiRoundMask;
    uint256 private bnbRoundMask;

    uint256 public totalFreezedAmount;
    mapping(uint256 => uint256) public freezedAmountDistribution;

    TimePeriod[] private timePeriods;

    function initialize(
        address furFiTokenAddress,
        address stakingPoolAddress,
        address admin
    ) public initializer {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);

        FurFiToken = IFurioFinanceToken(furFiTokenAddress);
        StakingPool = IStakingPool(stakingPoolAddress);
        timePeriods.push(TimePeriod(2592000, 100)); //a month
        timePeriods.push(TimePeriod(7776000, 400)); //three months
        timePeriods.push(TimePeriod(15552000, 700)); //six months

        IERC20Upgradeable(furFiTokenAddress).safeApprove(
            address(StakingPool),
            type(uint256).max
        );

        furFiRoundMask = 1;
        bnbRoundMask = 1;

        __Pausable_init();
        __AccessControl_init();
        __ReentrancyGuard_init();
    }

    /// @notice pause
    /// @dev pause the contract
    function pause() external whenNotPaused onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /// @notice unpause
    /// @dev unpause the contract
    function unpause() external whenPaused onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function freeze(uint256 furFiAmount, uint256 periodIndex)
        external
        override
        whenNotPaused
        nonReentrant
    {
        require(furFiAmount > 0, "freezing amount needs to be non zero");
        require(periodIndex < timePeriods.length, "time period does not exist");

        _claimAllStakingRewards();

        IERC20Upgradeable(address(FurFiToken)).safeTransferFrom(
            msg.sender,
            address(this),
            furFiAmount
        );

        StakingPool.stake(furFiAmount);

        uint256 currentRound = rounds[msg.sender] + 1;

        participants[msg.sender][currentRound].furFiRewardMask = furFiRoundMask;
        participants[msg.sender][currentRound].bnbRewardMask = bnbRoundMask;
        participants[msg.sender][currentRound].amount = furFiAmount;
        participants[msg.sender][currentRound].periodIndex = periodIndex;
        participants[msg.sender][currentRound].freezingStartTime = block.timestamp;

        rounds[msg.sender] = currentRound;

        // update freezer points with investment amount in furFi * freezing period months
        freezerPoints[msg.sender] += (furFiAmount *
            (timePeriods[periodIndex].period / 2592000));

        totalFreezedAmount += furFiAmount;
        freezedAmountDistribution[periodIndex] += furFiAmount;

        emit Freezed(msg.sender, currentRound, furFiAmount);
    }

    function unfreeze(uint256 freezingRound)
        external
        override
        whenNotPaused
        nonReentrant
    {
        Participant memory participant = participants[msg.sender][freezingRound];
        require(participant.amount > 0, "No investment found");
        require(
            participant.freezingStartTime +
                timePeriods[participant.periodIndex].period <
                block.timestamp,
            "freezing period not over yet"
        );

        _claimPendingRewards(freezingRound);

        uint256 unfreezeAmount = participant.amount;

        participants[msg.sender][freezingRound].amount = 0;

        // update freezer points with investment amount in furFi * freezing period months
        freezerPoints[msg.sender] -= (unfreezeAmount *
            (timePeriods[participant.periodIndex].period / 2592000));

        totalFreezedAmount -= unfreezeAmount;
        freezedAmountDistribution[participant.periodIndex] -= unfreezeAmount;
        StakingPool.unstake(unfreezeAmount);

        IERC20Upgradeable(address(FurFiToken)).safeTransfer(
            msg.sender,
            unfreezeAmount
        );
        emit Unfreezed(msg.sender, freezingRound, unfreezeAmount);
    }

    function claimPendingRewards(uint256 freezingRound)
        external
        override
        whenNotPaused
        nonReentrant
    {
        Participant memory participant = participants[msg.sender][freezingRound];
        require(participant.amount > 0, "no deposit");
        require(
            participant.freezingStartTime +
                timePeriods[participant.periodIndex].period >
                block.timestamp,
            "freezing period is over, you need to withdraw!"
        );
        _claimPendingRewards(freezingRound);
    }

    // Should be called statically from external
    function getPendingRewards(address freezerAddress, uint256 freezingRound)
        public
        override
        whenNotPaused
        returns (
            uint256 furFiRewards,
            uint256 bnbRewards,
            uint256 multipliedRewards
        )
    {
        _claimAllStakingRewards();
        Participant memory participant = participants[freezerAddress][freezingRound];
        if (
            participant.furFiRewardMask == 0 || participant.bnbRewardMask == 0
        ) {
            return (0, 0, 0);
        }
        furFiRewards =
            ((furFiRoundMask - participant.furFiRewardMask) *
                participant.amount) /
            DECIMAL_OFFSET;

        bnbRewards =
            ((bnbRoundMask - participant.bnbRewardMask) * participant.amount) /
            DECIMAL_OFFSET;

        uint256 participantMultiplier = timePeriods[
            participants[freezerAddress][freezingRound].periodIndex
        ].multiplier;

        multipliedRewards = (furFiRewards * (participantMultiplier)) / 1000;
    }

    function getParticipant(address participantAddress, uint256 round)
        external
        override
        view
        returns (Participant memory participant)
    {
        return participants[participantAddress][round];
    }

    function getRounds(address participantAddress)
        external
        override
        view
        returns (uint256)
    {
        return rounds[participantAddress];
    }

    function getTimeperiod(uint256 index)
        external
        override
        view
        returns (TimePeriod memory timePeriod)
    {
        return timePeriods[index];
    }

    function _claimPendingRewards(uint256 freezingRound) internal {
        (
            uint256 furFiRewards,
            uint256 bnbRewards,
            uint256 multipliedRewards
        ) = getPendingRewards(msg.sender, freezingRound);

        participants[msg.sender][freezingRound]
            .furFiRewardMask = furFiRoundMask;
        participants[msg.sender][freezingRound].bnbRewardMask = bnbRoundMask;

        participants[msg.sender][freezingRound].claimedBnbRewards += bnbRewards;
        participants[msg.sender][freezingRound]
            .claimedFurFiRewards += (furFiRewards + multipliedRewards);

        FurFiToken.claimTokens(multipliedRewards);

        IERC20Upgradeable(address(FurFiToken)).safeTransfer(
            msg.sender,
            furFiRewards + multipliedRewards
        );
        (bool transferSuccess, ) = payable(msg.sender).call{value: bnbRewards}(
            ""
        );
        require(transferSuccess, "Transfer failed");
        emit ClaimedRewards(
            msg.sender,
            freezingRound,
            bnbRewards,
            furFiRewards + multipliedRewards
        );
    }

    function _claimAllStakingRewards() internal {
        uint256 totalStakingIncrease = StakingPool.balanceOf(address(this)) -
            totalFreezedAmount;
        uint256 totalLpRewards = StakingPool.lpBalanceOf(address(this));
        uint256 additionalFurFi = StakingPool.getPendingFurFiRewards(address(this));

        if (totalStakingIncrease > 0) {
            StakingPool.unstake(totalStakingIncrease);
        }
        (uint256 claimedAdditionalFurFi, uint256 claimedBnb) = StakingPool
            .claimLpTokens(totalLpRewards, additionalFurFi, address(this));
        if (totalStakingIncrease + claimedAdditionalFurFi > 0) {
            _rewardFurFi(totalStakingIncrease + claimedAdditionalFurFi);
        }
        if (claimedBnb > 0) {
            _rewardBnb(claimedBnb);
        }
    }

    function _rewardFurFi(uint256 amount) internal {
        require(totalFreezedAmount > 0, "total freezed amount is 0");
        furFiRoundMask += (DECIMAL_OFFSET * amount) / totalFreezedAmount;
    }

    function _rewardBnb(uint256 amount) internal {
        require(totalFreezedAmount > 0, "total freezed amount is 0");
        bnbRoundMask += (DECIMAL_OFFSET * amount) / totalFreezedAmount;
    }

    uint256[50] private __gap;
}