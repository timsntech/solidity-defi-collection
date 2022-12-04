// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockUSDC is ERC20 {
    /**
     * Token metadata.
     */
    string private _name = 'USDC';
    string private _symbol = 'USDC';

    /**
     * Contract constructor.
     */
    constructor() ERC20(_name, _symbol) {}

    function decimals() public pure override returns (uint8) {
        return 6;
    }

    function mint(address to_, uint256 amount_) external {
        super._mint(to_, amount_);
    }
}
