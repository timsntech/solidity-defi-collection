//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

interface IStakingPool {
    function stakerAmounts(address staker)
    external
    view
    returns(
        uint256 stakedAmount,
        uint256 furFiMask,
        uint256 lpMask,
        uint256 pendingLp,
        uint256 claimedFurFi,
        uint256 claimedLp,
        uint256 furFiMintMask,
        uint256 pendingFurFiMint,
        uint256 claimedFurFiMint
    );

    function stake(uint256 amount) external;

    function unstake(uint256 amount) external;

    function balanceOf(address staker) external view returns(uint256);

    function lpBalanceOf(address staker) external view returns(uint256);

    function rewardFurFi(uint256 amount) external;

    function rewardLP(uint256 amount) external;

    function claimLpTokens(
        uint256 amount,
        uint256 additionalFurFiAmount,
        address to
    ) external returns(uint256 stakedTokenOut, uint256 bnbOut);

    function updateLpRewardMask() external;

    function updateAdditionalMintRoundMask() external;

    function getPendingFurFiRewards(address staker) external view returns(uint256);

    function getFurFiMintRewardsInRange(uint256 fromBlock, uint256 toBlock)
    external
    view
    returns(uint256);

    function setFurFiMintingRewards(
        uint256 _blockRewardPhase1End,
        uint256 _blockRewardPhase2Start,
        uint256 _blockRewardPhase1Amount,
        uint256 _blockRewardPhase2Amount
    ) external;
}