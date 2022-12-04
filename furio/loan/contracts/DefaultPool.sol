// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import "./abstracts/BaseContract.sol";
import './Interfaces/IDefaultPool.sol';
import "./Interfaces/IActivePool.sol";
import "hardhat/console.sol";

/*
 * The Default Pool holds the FURFI and FURUSD debt (but not FURUSD tokens) from liquidations that have been redistributed
 * to active vaults but not yet "applied", i.e. not yet recorded on a recipient active vault's struct.
 *
 * When a vault makes an operation that applies its pending FURFI and FURUSD debt, its pending FURFI and FURUSD debt is moved
 * from the Default Pool to the Active Pool.
 */
contract DefaultPool is BaseContract, IDefaultPool {

    using SafeMath for uint256;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    function initialize() public initializer {
        __BaseContract_init();
    }

    string constant public NAME = "DefaultPool";

    address public vaultManagerAddress;
    address public activePoolAddress;
    uint256 internal FURUSDDebt;  // debt
    address public furFiAddress;

    IERC20Upgradeable furFiToken;

    // --- Events ---
    event DefaultPoolFURUSDDebtUpdated(uint _LUSDDebt);
    event DefaultPoolFURFIBalanceUpdated(uint _FURFI);
    event FURFISent(address _to, uint _amount);

    // --- Dependency setters ---

    function setAddresses(
        address _vaultManagerAddress,
        address _activePoolAddress,
        address _furFiAddress
    )
        external
        onlyOwner
    {
        vaultManagerAddress = _vaultManagerAddress;
        activePoolAddress = _activePoolAddress;
        furFiAddress = _furFiAddress;

        furFiToken = IERC20Upgradeable(_furFiAddress);
    }

    function getFURFI() public view override returns (uint) {
        return furFiToken.balanceOf(address(this));
    }

    function getFURUSDDebt() external view override returns (uint) {
        return FURUSDDebt;
    }

    // --- Pool functionality ---

    function sendFURFIToActivePool(uint _amount) external override whenNotPaused {
        _requireCallerIsVaultManager();
        furFiToken.safeTransfer(activePoolAddress, _amount);

        uint256 FURFI = getFURFI();
        emit DefaultPoolFURFIBalanceUpdated(FURFI);
        emit FURFISent(activePoolAddress, _amount);

    }

    function increaseFURUSDDebt(uint _amount) external override whenNotPaused {
        _requireCallerIsVaultManager();
        FURUSDDebt = FURUSDDebt.add(_amount);
        emit DefaultPoolFURUSDDebtUpdated(FURUSDDebt);
    }

    function decreaseFURUSDDebt(uint _amount) external override whenNotPaused {
        _requireCallerIsVaultManager();
        FURUSDDebt = FURUSDDebt.sub(_amount);
        emit DefaultPoolFURUSDDebtUpdated(FURUSDDebt);
    }

    // --- 'require' functions ---

    function _requireCallerIsActivePool() internal view {
        require(msg.sender == activePoolAddress, "DefaultPool: Caller is not the ActivePool");
    }

    function _requireCallerIsVaultManager() internal view {
        require(msg.sender == vaultManagerAddress, "DefaultPool: Caller is not the VaultManager");
    }

}
