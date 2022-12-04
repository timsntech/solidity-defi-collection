// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "./abstracts/BaseContract.sol";
import "./Interfaces/ICollSurplusPool.sol";
import "hardhat/console.sol";

contract CollSurplusPool is BaseContract, ICollSurplusPool {

    using SafeMath for uint256;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    function initialize() public initializer {
        __BaseContract_init();
    }

    string constant public NAME = "CollSurplusPool";

    address public borrowerOperationsAddress;
    address public vaultManagerAddress;
    address public activePoolAddress;
    address public furFiAddress;

    IERC20Upgradeable furFiToken;
    // Collateral surplus claimable by vault owners
    mapping (address => uint) internal balances;

    // --- Events ---
    event CollBalanceUpdated(address indexed _account, uint _newBalance);
    event CollSurplusPoolFURFIBalanceUpdated(uint _FURFI);
    event FURFISent(address _to, uint _amount);

    // --- Contract setters ---

    function setAddresses(
        address _borrowerOperationsAddress,
        address _vaultManagerAddress,
        address _activePoolAddress,
        address _furFiAddress
    )
        external
        onlyOwner
    {
        borrowerOperationsAddress = _borrowerOperationsAddress;
        vaultManagerAddress = _vaultManagerAddress;
        activePoolAddress = _activePoolAddress;
        furFiAddress = _furFiAddress;

        furFiToken = IERC20Upgradeable(_furFiAddress);

    }

    function getFURFI() public view override returns (uint) {
        return furFiToken.balanceOf(address(this));
    }

    function getCollateral(address _account) external view override returns (uint) {
        return balances[_account];
    }

    // --- Pool functionality ---

    function accountSurplus(address _account, uint _amount) external override whenNotPaused {
        _requireCallerIsVaultManager();

        uint newAmount = balances[_account].add(_amount);
        balances[_account] = newAmount;

        emit CollBalanceUpdated(_account, newAmount);
    }

    function claimColl(address _account) external override whenNotPaused {
        _requireCallerIsBorrowerOperations();
        uint claimableColl = balances[_account];
        require(claimableColl > 0, "CollSurplusPool: No collateral available to claim");

        balances[_account] = 0;
        emit CollBalanceUpdated(_account, 0);

        furFiToken.safeTransfer(_account, claimableColl);

        uint256 FURFI = getFURFI();
        emit CollSurplusPoolFURFIBalanceUpdated(FURFI);
        emit FURFISent(_account, claimableColl);

    }

    // --- 'require' functions ---

    function _requireCallerIsBorrowerOperations() internal view {
        require(
            msg.sender == borrowerOperationsAddress,
            "CollSurplusPool: Caller is not Borrower Operations");
    }

    function _requireCallerIsVaultManager() internal view {
        require(
            msg.sender == vaultManagerAddress,
            "CollSurplusPool: Caller is not VaultManager");
    }

    function _requireCallerIsActivePool() internal view {
        require(
            msg.sender == activePoolAddress,
            "CollSurplusPool: Caller is not Active Pool");
    }

}
