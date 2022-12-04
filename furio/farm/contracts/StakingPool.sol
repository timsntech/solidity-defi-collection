//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Interfaces/IUniswapV2Router01.sol";
import "./Interfaces/IUniswapV2Pair.sol";
import "./Interfaces/IFurioFinanceToken.sol";
import "./Interfaces/IStakingPool.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

/// @title The furFi staking pool
/// @notice The furFi staking pool allows to stake furFis and get lp and furFi rewards. Lp tokens are rewarded through rewards from the liquidity pools (see tokenflow)
/// @dev The share of lp and furFi rewards is done with roundmasks according to EIP-1973
contract StakingPool is
    Initializable,
    AccessControlUpgradeable,
    IStakingPool,
    PausableUpgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    bytes32 public constant REWARDER_ROLE = keccak256("REWARDER_ROLE");
    bytes32 public constant UPDATER_ROLE = keccak256("UPDATER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    uint256 public constant DECIMAL_OFFSET = 10e12;

    struct StakerAmounts {
        uint256 stakedAmount;
        uint256 furFiMask;
        uint256 lpMask;
        uint256 pendingLp;
        uint256 claimedFurFi;
        uint256 claimedLp;
        uint256 furFiMintMask;
        uint256 pendingFurFiMint;
        uint256 claimedFurFiMint;
    }

    IUniswapV2Router01 public SwapRouter;
    IFurioFinanceToken public StakedToken;
    IERC20Upgradeable public LPToken;

    uint256 private furFiRoundMask;
    uint256 private lpRoundMask;
    uint256 private furFiMintRoundMask;
    uint256 private lastFurFiMintRoundMaskUpdateBlock;
    uint256 private blockRewardPhase1End;
    uint256 private blockRewardPhase2Start;
    uint256 private blockRewardPhase1Amount;
    uint256 private blockRewardPhase2Amount;

    uint256 public totalStaked;
    uint256 public totalBnbClaimed;
    uint256 public totalFurFiClaimed;

    mapping(address => StakerAmounts) public override stakerAmounts;

    event Stake(address indexed _staker, uint256 amount);
    event Unstake(address indexed _staker, uint256 amount);
    event ClaimRewards(
        address indexed _staker,
        uint256 _tokenAmount,
        uint256 _bnbAmount
    );

    function initialize(
        address tokenAddress,
        address lpAddress,
        address swapRouterAddress,
        address admin
    ) public initializer {
        require(
            IUniswapV2Pair(lpAddress).token0() == tokenAddress ||
                IUniswapV2Pair(lpAddress).token1() == tokenAddress,
            "LP token does not contain one side of token address"
        );

        furFiRoundMask = 1;
        lpRoundMask = 1;
        furFiMintRoundMask = 1;

        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        SwapRouter = IUniswapV2Router01(swapRouterAddress);
        StakedToken = IFurioFinanceToken(tokenAddress);
        LPToken = IERC20Upgradeable(lpAddress);
        LPToken.safeApprove(swapRouterAddress, type(uint256).max);
        __Pausable_init();

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

    /// @notice Stakes the desired amount of furFi into the staking pool
    /// @dev Lp reward masks are updated before the staking to have a clean state
    /// @param amount The desired staking amount
    function stake(uint256 amount) external override whenNotPaused {
        // if first stake initialize lastFurFiMintRoundMaskUpdateBlock
        if (lastFurFiMintRoundMaskUpdateBlock == 0) {
            lastFurFiMintRoundMaskUpdateBlock = block.number;
        }

        updateLpRewardMask();
        updateAdditionalMintRewardMask();
        uint256 currentBalance = balanceOf(msg.sender);

        if (stakerAmounts[msg.sender].furFiMintMask == 0)
            stakerAmounts[msg.sender].furFiMintMask = furFiMintRoundMask;

        if (amount > 0) {
            IERC20Upgradeable(address(StakedToken)).safeTransferFrom(
                msg.sender,
                address(this),
                amount
            );
        }

        totalStaked =
            totalStaked +
            currentBalance -
            stakerAmounts[msg.sender].stakedAmount +
            amount;

        stakerAmounts[msg.sender].stakedAmount = currentBalance + amount;
        stakerAmounts[msg.sender].furFiMask = furFiRoundMask;

        emit Stake(msg.sender, amount);
    }

    /// @notice Unstake the desired amount of furFi from the staking pool
    /// @dev Lp reward masks are updated before the unstaking to have a clean state
    /// @param amount The desired unstaking amount
    function unstake(uint256 amount) external override whenNotPaused {
        require(amount > 0, "The amount of tokens must be greater than zero");

        updateLpRewardMask();
        updateAdditionalMintRewardMask();
        uint256 currentBalance = balanceOf(msg.sender);
        require(currentBalance >= amount, "Requested amount too large");

        totalStaked =
            totalStaked +
            currentBalance -
            stakerAmounts[msg.sender].stakedAmount -
            amount;

        stakerAmounts[msg.sender].stakedAmount = currentBalance - amount;
        stakerAmounts[msg.sender].furFiMask = furFiRoundMask;
        stakerAmounts[msg.sender].claimedFurFi += amount;

        IERC20Upgradeable(address(StakedToken)).safeTransfer(
            msg.sender,
            amount
        );

        emit Unstake(msg.sender, amount);
    }

    /// @notice Gets the current staked balance
    /// @dev Returns the staked amount and all the furFi rewards together
    /// @param staker The staker address whos balance is requested
    /// @return The staked amount in furFi
    function balanceOf(address staker) public view override returns (uint256) {
        if (stakerAmounts[staker].furFiMask == 0) return 0;

        return
            stakerAmounts[staker].stakedAmount +
            ((furFiRoundMask - stakerAmounts[staker].furFiMask) *
                stakerAmounts[staker].stakedAmount) /
            DECIMAL_OFFSET;
    }

    /// @notice Rewards the staking pool with furFi
    /// @dev The round mask is increased according to the reward
    /// @param amount The amount to be rewarded
    function rewardFurFi(uint256 amount)
        external
        override
        whenNotPaused
        onlyRole(REWARDER_ROLE)
    {
        require(totalStaked > 0, "totalStaked amount is 0");
        IERC20Upgradeable(address(StakedToken)).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );
        furFiRoundMask += (DECIMAL_OFFSET * amount) / totalStaked;
    }

    /// @notice Gets the current lp balance
    /// @dev Returns the lp amount and the difference from the round mask
    /// @param staker The staker address whos lp balance is requested
    /// @return The staked lp amount
    function lpBalanceOf(address staker)
        public
        view
        override
        returns (uint256)
    {
        if (stakerAmounts[staker].lpMask == 0) return 0;

        return
            stakerAmounts[staker].pendingLp +
            ((lpRoundMask - stakerAmounts[staker].lpMask) *
                stakerAmounts[staker].stakedAmount) /
            DECIMAL_OFFSET;
    }

    /// @notice Updates the Lp reward mask
    /// @dev Assigns the current lp amount to the account and resets the round mask
    function updateLpRewardMask() public override whenNotPaused {
        uint256 currentLpBalance = lpBalanceOf(msg.sender);

        stakerAmounts[msg.sender].pendingLp = currentLpBalance;
        stakerAmounts[msg.sender].lpMask = lpRoundMask;
    }

    /// @notice Updates the additional FurFi Minting round mask
    /// @dev Updates the round mask based on the number of blocks passed since last update, current block reward and total staked amount
    function updateAdditionalMintRoundMask() public override whenNotPaused {
        if (totalStaked == 0) return;

        uint256 totalPendingRewards = getFurFiMintRewardsInRange(
            lastFurFiMintRoundMaskUpdateBlock,
            block.number
        );

        lastFurFiMintRoundMaskUpdateBlock = block.number;
        furFiMintRoundMask +=
            (DECIMAL_OFFSET * totalPendingRewards) /
            totalStaked;
    }

    function updateAdditionalMintRewardMask() public whenNotPaused {
        updateAdditionalMintRoundMask();
        uint256 pendingFurFiRewards = getPendingFurFiRewards(msg.sender);

        stakerAmounts[msg.sender].pendingFurFiMint = pendingFurFiRewards;
        stakerAmounts[msg.sender].furFiMintMask = furFiMintRoundMask;
    }

    /// @notice Returns the rewards generated in a specific block range
    /// @param fromBlock The starting block (exclusive)
    /// @param toBlock The ending block (inclusive)
    function getFurFiMintRewardsInRange(uint256 fromBlock, uint256 toBlock)
        public
        view
        override
        returns (uint256)
    {
        uint256 phase1Rewards = 0;
        uint256 linearPhaseRewards = 0;
        uint256 phase2Rewards = 0;

        if (blockRewardPhase1End > fromBlock) {
            uint256 phaseEndBlock = toBlock < blockRewardPhase1End
                ? toBlock
                : blockRewardPhase1End;
            phase1Rewards =
                (phaseEndBlock - fromBlock) *
                blockRewardPhase1Amount;
        }

        if (
            fromBlock < blockRewardPhase2Start && blockRewardPhase1End < toBlock
        ) {
            uint256 phaseStartBlock = fromBlock < blockRewardPhase1End
                ? blockRewardPhase1End
                : fromBlock;
            uint256 phaseEndBlock = toBlock < blockRewardPhase2Start
                ? toBlock
                : blockRewardPhase2Start;

            uint256 linearPhaseRewardDifference = blockRewardPhase1Amount -
                blockRewardPhase2Amount;
            uint256 linearPhaseBlockLength = blockRewardPhase2Start -
                blockRewardPhase1End;
            uint256 phaseStartBlockReward = blockRewardPhase1Amount -
                ((phaseStartBlock - blockRewardPhase1End) *
                    linearPhaseRewardDifference) /
                linearPhaseBlockLength;
            uint256 phaseEndBlockReward = blockRewardPhase1Amount -
                ((phaseEndBlock - blockRewardPhase1End) *
                    linearPhaseRewardDifference) /
                linearPhaseBlockLength;

            linearPhaseRewards =
                ((phaseEndBlock - phaseStartBlock) *
                    (phaseStartBlockReward + phaseEndBlockReward)) /
                2;
        }

        if (blockRewardPhase2Start < toBlock) {
            uint256 phaseStartBlock = fromBlock < blockRewardPhase2Start
                ? blockRewardPhase2Start
                : fromBlock;
            phase2Rewards =
                (toBlock - phaseStartBlock) *
                blockRewardPhase2Amount;
        }

        return phase1Rewards + linearPhaseRewards + phase2Rewards;
    }

    /// @notice Returns te pending amount of minted FurFi rewards
    /// @dev The result is based on the current round mask, as well as the change in the round mask since the last update
    /// @param staker staker address
    /// @return Pending rewards
    function getPendingFurFiRewards(address staker) public view override returns (uint256) {
        if (stakerAmounts[staker].furFiMintMask == 0) return 0;

        uint256 currentRoundMask = furFiMintRoundMask;

        if (totalStaked > 0) {
            uint256 totalPendingRewards = getFurFiMintRewardsInRange(
                lastFurFiMintRoundMaskUpdateBlock,
                block.number
            );

            currentRoundMask +=
                (DECIMAL_OFFSET * totalPendingRewards) /
                totalStaked;
        }

        return
            stakerAmounts[staker].pendingFurFiMint +
            ((currentRoundMask - stakerAmounts[staker].furFiMintMask) *
                stakerAmounts[staker].stakedAmount) /
            DECIMAL_OFFSET;
    }

    /// @notice Withdraws LP tokens to remove liquidity from pancakeswap and withdraws additional furFi rewards
    /// @dev Uses the pancakeswap router to remove liquidity with the desired LP amount. The staked token and the corresponding bnb are transferred to the account. In addition a reward in furFi token is calculated and minted for the account
    /// @param amount The desired lp amount which should be used to remove liquidity from pancakeswap
    /// @param additionalFurFiAmount The desired additional furFi amount to be claimed
    /// @param to The Account the staked token, the bnb and the additional furFi reward is sent to
    function claimLpTokens(
        uint256 amount,
        uint256 additionalFurFiAmount,
        address to
    )
        public
        override
        whenNotPaused
        returns (uint256 stakedTokenOut, uint256 bnbOut)
    {
        updateLpRewardMask();
        updateAdditionalMintRewardMask();
        uint256 removedStakedToken = 0;
        uint256 removedBnb = 0;

        if (amount > 0) {
            require(
                stakerAmounts[msg.sender].pendingLp >= amount,
                "Requested amount too large"
            );

            stakerAmounts[msg.sender].pendingLp -= amount;
            stakerAmounts[msg.sender].claimedLp += amount;

            (removedStakedToken, removedBnb) = SwapRouter.removeLiquidityETH(
                address(StakedToken),
                amount,
                1,
                1,
                to,
                block.timestamp + 300
            );
        }

        if (additionalFurFiAmount > 0) {
            require(
                stakerAmounts[msg.sender].pendingFurFiMint >=
                    additionalFurFiAmount,
                "Requested additionalFurFiAmount too large"
            );

            stakerAmounts[msg.sender].pendingFurFiMint -= additionalFurFiAmount;
            stakerAmounts[msg.sender].claimedFurFiMint += additionalFurFiAmount;

            StakedToken.claimTokens(additionalFurFiAmount);
            IERC20Upgradeable(address(StakedToken)).safeTransfer(
                to,
                additionalFurFiAmount
            );
        }

        totalFurFiClaimed += removedStakedToken + additionalFurFiAmount;
        totalBnbClaimed += removedBnb;

        emit ClaimRewards(
            msg.sender,
            removedStakedToken + additionalFurFiAmount,
            removedBnb
        );
        return (removedStakedToken + additionalFurFiAmount, removedBnb);
    }

    /// @notice Rewards lp to the conract
    /// @dev The round mask is increased according to the reward
    /// @param amount The amount in lp to be rewarded
    function rewardLP(uint256 amount)
        external
        override
        whenNotPaused
        onlyRole(REWARDER_ROLE)
    {
        if (totalStaked == 0) return;

        IERC20Upgradeable(address(LPToken)).safeTransferFrom(
            msg.sender,
            address(this),
            amount
        );
        lpRoundMask += (DECIMAL_OFFSET * amount) / totalStaked;
    }

    /// @notice Sets the furFi minting transition times and amounts
    /// @param _blockRewardPhase1End the block after which Phase 1 ends
    /// @param _blockRewardPhase2Start the block after which Phase 2 starts
    /// @param _blockRewardPhase1Amount the block rewards during Phase 1
    /// @param _blockRewardPhase2Amount the block rewards during Phase 2
    function setFurFiMintingRewards(
        uint256 _blockRewardPhase1End,
        uint256 _blockRewardPhase2Start,
        uint256 _blockRewardPhase1Amount,
        uint256 _blockRewardPhase2Amount
    ) public override onlyRole(UPDATER_ROLE) {
        require(
            _blockRewardPhase1End < _blockRewardPhase2Start,
            "Phase 1 must end before Phase 2 starts"
        );
        require(
            _blockRewardPhase2Amount < _blockRewardPhase1Amount,
            "Phase 1 amount must be greater than Phase 2 amount"
        );

        blockRewardPhase1End = _blockRewardPhase1End;
        blockRewardPhase2Start = _blockRewardPhase2Start;
        blockRewardPhase1Amount = _blockRewardPhase1Amount;
        blockRewardPhase2Amount = _blockRewardPhase2Amount;
    }

    uint256[50] private __gap;
}
