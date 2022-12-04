//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "../abstracts/BaseContract.sol";

contract FurioFinanceToken is BaseContract, ERC20Upgradeable {

    mapping(address => uint256) public totalClaimed;

    address public developmentFounders;
    address public advisors;
    address public marketingReservesPool;
    address public devTeam;

    uint256 private additionalTokenCounter;

    event AdditionalMinterAddressChange(
        address indexed _newAddress,
        string indexed _type
    );

    function initialize(
        string memory tokenName,
        string memory tokenSymbol,
        uint256 initialMintAmount,
        address admin,
        address _developmentFounders,
        address _advisors,
        address _marketingReservesPool,
        address _devTeam
    ) public initializer {
        require(admin != address(0), "Admin address cannot be null");
        require(
            _developmentFounders != address(0),
            "Founders address cannot be null"
        );
        require(_advisors != address(0), "Advisors address cannot be null");
        require(
            _marketingReservesPool != address(0),
            "Marketing address cannot be null"
        );
        require(_devTeam != address(0), "Dev team address cannot be null");

        __ERC20_init(tokenName, tokenSymbol);

        _mint(admin, initialMintAmount);
        developmentFounders = _developmentFounders;
        advisors = _advisors;
        marketingReservesPool = _marketingReservesPool;
        devTeam = _devTeam;
    }


    /// @notice Override for openzeppelin Governance
    /// @dev refer to https://docs.openzeppelin.com/contracts/4.x/governance
    function _burn(address account, uint256 amount)
        internal
        override
    {
        super._burn(account, amount);
    }

    /// @notice transfer can get paused
    function transfer(address to, uint256 amount)
        public
        override
        whenNotPaused
        returns (bool)
    {
        return super.transfer(to, amount);
    }

    /// @notice transferFrom can get paused
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public override whenNotPaused returns (bool) {
        return super.transferFrom(from, to, amount);
    }

    /// @notice Token mining function for addresses with MINTER_ROLE.
    /// If called by an active recipient, the requested amount of tokens will
    /// be minted and transferred to the recipients address.
    /// additionally 22 tokens per 100 tokens will be minted for third party
    /// @param amount The amount to be minted
    function claimTokens(uint256 amount)
        external
        onlyOwner
    {
        _mint(msg.sender, amount);
        totalClaimed[msg.sender] += amount;
        additionalTokenCounter += amount;
        claimAdditionalTokens();
    }

    /// @notice Token mining function for addresses with MINTER_ROLE.
    /// If called by an active recipient, the requested amount of tokens will
    /// be minted and transferred to the recipients address.
    /// no additional tokens to be minted here
    /// @param amount The amount to be minted
    function claimTokensWithoutAdditionalTokens(uint256 amount)
        external
        onlyOwner
    {
        _mint(msg.sender, amount);
        totalClaimed[msg.sender] += amount;
    }

    /// @notice The additional token claiming
    /// For every 100 tokens, 22 tokens will be minted and distributed among third party
    /// 5 go to the development founders
    /// 3 go to the advisors
    /// 2 go to the marketing and reserves pool
    /// 12 go to the dev team
    function claimAdditionalTokens() internal whenNotPaused {
        // the multiplier is cut off each 100 tokens
        uint256 multiplier = additionalTokenCounter / (100 * (10**decimals()));
        if (multiplier > 0) {
            // additional minting for development founders
            uint256 developmentFoundersAmount = multiplier *
                53 *
                (10**(decimals() - 1));
            _mint(developmentFounders, developmentFoundersAmount);
            totalClaimed[developmentFounders] += developmentFoundersAmount;

            // additional minting for advisors
            uint256 advisorsAmount = multiplier * 37 * (10**(decimals() - 1));
            _mint(advisors, advisorsAmount);
            totalClaimed[advisors] += advisorsAmount;

            // additional minting for marketing reserves pool
            uint256 marketingReservesPoolAmount = multiplier *
                60 *
                (10**(decimals() - 1));
            _mint(marketingReservesPool, marketingReservesPoolAmount);
            totalClaimed[marketingReservesPool] += marketingReservesPoolAmount;

            // additional minting for dev team
            uint256 devTeamAmount = multiplier * 70 * (10**(decimals() - 1));
            _mint(devTeam, devTeamAmount);
            totalClaimed[devTeam] += devTeamAmount;

            // upadate additionalTokenCounter
            additionalTokenCounter -= multiplier * 100 * (10**decimals());
        }
    }

    /// @notice Sets the development founders address
    /// @dev Only possible for updater role
    /// @param _developmentFounders The new development founders address
    function setDevelopmentFounders(address _developmentFounders)
        external
        onlyOwner
    {
        require(
            _developmentFounders != address(0),
            "Address must not be zero address"
        );
        developmentFounders = _developmentFounders;
        emit AdditionalMinterAddressChange(
            _developmentFounders,
            "Development Founders"
        );
    }

    /// @notice Sets the advisors address
    /// @dev Only possible for updater role
    /// @param _advisors The new advisors address
    function setAdvisors(address _advisors)
        external
        onlyOwner
    {
        require(_advisors != address(0), "Address must not be zero address");
        advisors = _advisors;
        emit AdditionalMinterAddressChange(_advisors, "Advisors");
    }

    /// @notice Sets the marketing reserves pool address
    /// @dev Only possible for updater role
    /// @param _marketingReservesPool The new marketing reserves pool address
    function setMarketingReservesPool(address _marketingReservesPool)
        external
        onlyOwner
    {
        require(
            _marketingReservesPool != address(0),
            "Address must not be zero address"
        );
        marketingReservesPool = _marketingReservesPool;
        emit AdditionalMinterAddressChange(
            _marketingReservesPool,
            "Marketing and Reserves"
        );
    }

    /// @notice Sets the dev team address
    /// @dev Only possible for updater role
    /// @param _devTeam The new dev team address
    function setDevTeam(address _devTeam)
        external
        onlyOwner
    {
        require(_devTeam != address(0), "Address must not be zero address");
        devTeam = _devTeam;
        emit AdditionalMinterAddressChange(_devTeam, "Dev Team");
    }

}