// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IToken {
    function contractAdmin() external returns (address);
    function paused() external returns (bool);
    function players() external returns (uint256);
    function totalSupply() external returns (uint256);
    function transactions() external returns (uint256);
    function minted() external returns (uint256);
    function burnTax() external returns (uint256);
    function liquidityTax() external returns (uint256);
    function vaultTax() external returns (uint256);
    function devTax() external returns (uint256);
    function devWallet() external returns (address);
    function downlineNFT() external returns (address);
    function pool() external returns (address);
    function presaleNFT() external returns (address);
    function vault() external returns (address);
    function name() external returns (string memory);
    function symbol() external returns (string memory);
    function decimals() external returns (uint8);
    function balanceOf(address account_) external returns (uint256);
    function transfer(address to_, uint256 amount_) external returns (bool);
    function transferFrom(address from_, address to_, uint256 amount_) external returns (bool);
    function approve(address spender_, uint256 amount_) external returns (bool);
    function allowance(address owner_, address spender_) external returns (uint256);
    function taxRate() external returns (uint256);
    function setContractAdmin(address address_) external;
    function pause() external;
    function unpause() external;
    function setDevWallet(address address_) external;
    function setDownlineNFT(address address_) external;
    function setPool(address address_) external;
    function setPresaleNFT(address address_) external;
    function setVault(address address_) external;
    function setBurnTax(uint256 tax_) external;
    function setLiquidityTax(uint256 tax_) external;
    function setVaultTax(uint256 tax_) external;
    function setDevTax(uint256 tax_) external;
    function protectedTransfer(address from_, address to_, uint256 amount_, uint256 taxRate_) external returns (bool);
    function mint(address to_, uint256 amount_) external;
    function burn(address from_, uint256 amount_) external;
}
