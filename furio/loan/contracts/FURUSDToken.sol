// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./abstracts/BaseContract.sol";
import "hardhat/console.sol";

contract FURUSDToken is BaseContract, ERC20Upgradeable {
    
    using SafeMath for uint256;
    
    address public vaultManagerAddress;
    address public stabilityPoolAddress;
    address public borrowerOperationsAddress;

    function initialize(
        address _vaultManagerAddress,
        address _stabilityPoolAddress,
        address _borrowerOperationsAddress,
        uint256 initialMintAmount
    ) 
        public initializer
    {  
        __BaseContract_init();
        __ERC20_init("FURUSD", "$FURUSD");

        vaultManagerAddress = _vaultManagerAddress;
        stabilityPoolAddress = _stabilityPoolAddress;
        borrowerOperationsAddress = _borrowerOperationsAddress;

        super._mint(msg.sender, initialMintAmount);        
        
    }

    event FURUSDTokenBalanceUpdated(address _user, uint _amount);
    event VaultManagerAddressChanged(address _vaultManagerAddress);
    event StabilityPoolAddressChanged(address _stabilityPoolAddress);
    event BorrowerOperationsAddressChanged(address _borrowerOperationsAddress);


    function mint(address _account, uint256 _amount) external {
        _requireCallerIsBorrowerOperationsOrOwner();
        super._mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) external  {
        _requireCallerIsBOorVaultMorSPOrOwner();
        super._burn(_account, _amount);
    }

    function sendToPool(address _sender,  address _poolAddress, uint256 _amount) external whenNotPaused {
        _requireCallerIsStabilityPool();
        super._transfer(_sender, _poolAddress, _amount);
    }

    function returnFromPool(address _poolAddress, address _receiver, uint256 _amount) external whenNotPaused {
        _requireCallerIsVaultMorSP();
        super._transfer(_poolAddress, _receiver, _amount);
    }

    function transfer(address _recipient, uint256 _amount) public override whenNotPaused returns (bool) {
        _requireValidRecipient(_recipient);
        super._transfer(msg.sender, _recipient, _amount);
        return true;
    }

    function transferFrom(address _sender, address _recipient, uint256 _amount) public override whenNotPaused returns (bool) {
        _requireValidRecipient(_recipient);
        super.transferFrom(_sender, _recipient, _amount);
        return true;
    }

    function setVaultManagerAddress(address _vaultManagerAddress) external onlyOwner{
        require(_vaultManagerAddress != address(0), "Invaild Address");
        vaultManagerAddress = _vaultManagerAddress;
        emit VaultManagerAddressChanged(_vaultManagerAddress);
    }

    function setStabilityPoolAddress(address _stabilityPoolAddress)external onlyOwner{
        require(_stabilityPoolAddress != address(0), "Invaild Address");
        stabilityPoolAddress = _stabilityPoolAddress;
        emit StabilityPoolAddressChanged(_stabilityPoolAddress);
    }

    function setBorrowerOperationsAddress(address _borrowerOperationsAddress)external onlyOwner{
        require(_borrowerOperationsAddress != address(0), "Invaild Address");
        borrowerOperationsAddress = _borrowerOperationsAddress;
        emit BorrowerOperationsAddressChanged(_borrowerOperationsAddress);
    }

    function _requireValidRecipient(address _recipient) internal view {
        require(
            _recipient != address(0) && 
            _recipient != address(this),
            "FURUSD: Cannot transfer tokens directly to the FURUSD token contract or the zero address"
        );
        require(
            _recipient != stabilityPoolAddress && 
            _recipient != vaultManagerAddress && 
            _recipient != borrowerOperationsAddress, 
            "FURUSD: Cannot transfer tokens directly to the StabilityPool, VaultManager or BorrowerOps"
        );
    }

    function _requireCallerIsBorrowerOperationsOrOwner() internal view {
        require(msg.sender == borrowerOperationsAddress || msg.sender == owner(), "FURUSDToken: Caller is neither BorrowerOperations nor Owner");
    }

    function _requireCallerIsBOorVaultMorSPOrOwner() internal view {
        require(
            msg.sender == borrowerOperationsAddress ||
            msg.sender == vaultManagerAddress ||
            msg.sender == stabilityPoolAddress ||
            msg.sender == owner(),
            "FURUSD: Caller is neither BorrowerOperations nor VaultManager nor StabilityPool nor Owner"
        );
    }

    function _requireCallerIsStabilityPool() internal view {
        require(msg.sender == stabilityPoolAddress, "FURUSD: Caller is not the StabilityPool");
    }

    function _requireCallerIsVaultMorSP() internal view {
        require(
            msg.sender == vaultManagerAddress || msg.sender == stabilityPoolAddress,
            "FURUSD: Caller is neither VaultManager nor StabilityPool");
    }

}
