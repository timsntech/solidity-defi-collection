/**
 *Submitted for verification at polygonscan.com on 2022-11-15
 */

// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

interface IBEP20 {
    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function decimals() external view returns (uint8);

    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(address to, uint256 amount) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface IERC20 {
    function totalSupply() external view returns (uint256);

    function balanceOf(address account) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }
}

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;

        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;

        return c;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    constructor() {
        _transferOwnership(_msgSender());
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(
            newOwner != address(0),
            "Ownable: new owner is the zero address"
        );
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IUniswapV2Pair {
    event Approval(address indexed owner, address indexed spender, uint value);
    event Transfer(address indexed from, address indexed to, uint value);

    function name() external pure returns (string memory);

    function symbol() external pure returns (string memory);

    function decimals() external pure returns (uint8);

    function totalSupply() external view returns (uint);

    function balanceOf(address owner) external view returns (uint);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint);

    function approve(address spender, uint value) external returns (bool);

    function transfer(address to, uint value) external returns (bool);

    function transferFrom(
        address from,
        address to,
        uint value
    ) external returns (bool);

    function DOMAIN_SEPARATOR() external view returns (bytes32);

    function PERMIT_TYPEHASH() external pure returns (bytes32);

    function nonces(address owner) external view returns (uint);

    function permit(
        address owner,
        address spender,
        uint value,
        uint deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external;

    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(
        address indexed sender,
        uint amount0,
        uint amount1,
        address indexed to
    );
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
    event Sync(uint112 reserve0, uint112 reserve1);

    function MINIMUM_LIQUIDITY() external pure returns (uint);

    function factory() external view returns (address);

    function token0() external view returns (address);

    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast);

    function price0CumulativeLast() external view returns (uint);

    function price1CumulativeLast() external view returns (uint);

    function kLast() external view returns (uint);

    function mint(address to) external returns (uint liquidity);

    function burn(address to) external returns (uint amount0, uint amount1);

    function swap(
        uint amount0Out,
        uint amount1Out,
        address to,
        bytes calldata data
    ) external;

    function skim(address to) external;

    function sync() external;

    function initialize(address, address) external;
}

abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;

    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

contract OPTFund is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    address private devWallet = 0xD7Ced3bD37D3Db19eBe50dfCA6e3ae001D0561d0;

    address public constant OPT3 = 0xCf630283E8Ff2e30C29093bC8aa58CADD8613039;
    address public constant OPT3Pair =
        0xCFeADF2671F85674c6377E2FDD2593985adFA8C5;
    address public constant wOPT = 0x676fcD577d0C8705F9f81577C4bFC4cc7979E69B;

    address constant DEAD = 0x000000000000000000000000000000000000dEaD;
    address constant ZERO = 0x0000000000000000000000000000000000000000;

    uint256 public dailyStakingReward = 200; // 2%
    uint256 public rewardPeriod = 1 days; // 86400
    uint256 public stakingFee = 500; // 5%
    uint256 public devFee = 400;
    uint256 public OPT3BurnFee = 100;
    uint256 public percentRate = 10000;

    uint256 public minimumDaily = 50;
    uint256 public maximumDaily = 300;

    struct stakeStruct {
        uint256 stakedAmount;
        address depositor;
        uint256 lastClaim;
    }

    bool public depositingOpen;

    mapping(address => stakeStruct) deposit;

    function changeDevWallet(address _new) external onlyOwner {
        devWallet = _new;
    }

    function switchDepositingStatus() external onlyOwner {
        if (depositingOpen) {
            depositingOpen = false;
        }
        if (!depositingOpen) {
            depositingOpen = true;
        }
    }

    function changeStakingFee(uint256 _new) external onlyOwner {
        require(_new >= 200 && _new <= 1000); // minimum 2%, maximum 10% fees
        stakingFee = _new;
    }

    function changeDevFee(uint256 _new) external onlyOwner {
        require(_new >= 100 && _new <= 800);
        devFee = _new;
    }

    function changeBurnFee(uint256 _new) external onlyOwner {
        require(_new >= 100 && _new <= 800);
        OPT3BurnFee = _new;
    }

    function calculateRewards(address _address) public view returns (uint256) {
        uint256 lastRoiTime = block.timestamp - deposit[_address].lastClaim;

        uint256 allClaimableAmount = (lastRoiTime *
            deposit[_address].stakedAmount *
            dailyStakingReward).div(percentRate * rewardPeriod);

        return allClaimableAmount;
    }

    function changeDailyReward(uint256 _new) external onlyOwner {
        require(_new >= minimumDaily && _new <= maximumDaily); // minimum daily reward = 0.5% | maximum daily reward = 3%
        dailyStakingReward = _new;
    }

    function depositOPT3(uint256 _amount) external {
        require(depositingOpen = true);
        require(_amount > 0);

        stakeStruct memory info = deposit[msg.sender];

        if (info.stakedAmount > 0) {
            claimRewards();
        }

        IBEP20(OPT3).transferFrom(msg.sender, address(this), _amount);

        uint256 depositFee = (_amount * stakingFee).div(percentRate);
        uint256 depositAfterFees = _amount.sub(depositFee);
        uint256 amountForDev = (_amount * devFee).div(percentRate);
        uint256 amountForBurn = (_amount * OPT3BurnFee).div(percentRate);

        IBEP20(OPT3).transfer(devWallet, amountForDev);
        IBEP20(OPT3).transfer(DEAD, amountForBurn);

        deposit[msg.sender].depositor = msg.sender;
        deposit[msg.sender].lastClaim = block.timestamp;
        deposit[msg.sender].stakedAmount = deposit[msg.sender].stakedAmount.add(
            depositAfterFees
        );
    }

    function claimRewards() public {
        uint256 rewardsToClaim = calculateRewards(msg.sender);

        deposit[msg.sender].lastClaim = block.timestamp;

        IBEP20(OPT3).transfer(msg.sender, rewardsToClaim);
    }

    function compoundRewards() public {
        uint256 rewardsToClaim = calculateRewards(msg.sender);

        deposit[msg.sender].lastClaim = block.timestamp;

        deposit[msg.sender].stakedAmount = deposit[msg.sender].stakedAmount.add(
            rewardsToClaim
        );
    }

    function withdrawDeposit(uint256 _amount) public nonReentrant {
        require(
            deposit[msg.sender].stakedAmount >= _amount,
            "Cant withdraw more than deposited"
        );

        claimRewards();

        deposit[msg.sender].stakedAmount = deposit[msg.sender].stakedAmount.sub(
            _amount
        );

        uint256 amountForDev = (_amount.mul(devFee)).div(percentRate);
        uint256 amountForBurn = (_amount.mul(OPT3BurnFee)).div(percentRate);
        uint256 amountToSend = _amount.sub(amountForDev + amountForBurn);

        IBEP20(OPT3).transfer(devWallet, amountForDev);
        IBEP20(OPT3).transfer(DEAD, amountForBurn);

        IBEP20(OPT3).transfer(msg.sender, amountToSend);
    }

    //////////////////////////////////// UTILITIES /////////

    function getDepositingStatus() external view returns (bool) {
        return depositingOpen;
    }

    function getStakedAmount(address _address) external view returns (uint256) {
        uint256 amount = deposit[_address].stakedAmount;
        return amount;
    }

    function getInterestAmount(
        address _address
    ) external view returns (uint256) {
        uint256 amount = calculateRewards(_address);
        return amount;
    }
}
