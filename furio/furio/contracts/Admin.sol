// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
// INTERFACES
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IDownlineNFT.sol";
import "./interfaces/IPool.sol";
import "./interfaces/IPresaleNFT.sol";
import "./interfaces/ISwap.sol";
import "./interfaces/IToken.sol";
import "./interfaces/IVault.sol";

/**
 * @title Admin
 * @author Steve Harmeyer
 * @notice This contract serves as the entrypoint for any admin functionality
 * with the Furio ecosystem. This contract will be set as the "OWNER" of all
 * other Furio contracts to make security more manageable.
 */
contract Admin is AccessControlEnumerable
{
    /**
     * Team wallets.
     * @dev Internal storage for all team member wallets.
     */
    address[] private _teamWallets;

    /**
     * Family wallets.
     * @dev Internal storage for all family member wallets.
     */
    address[] private _familyWallets;

    /**
     * Payment token.
     * @dev The ERC20 token used to buy and sell FUR.
     */
    IERC20 private _paymentToken;

    /**
     * DownlineNFT contract.
     * @dev References the DownlineNFT contract.
     */
    IDownlineNFT private _downlineNFT;

    /**
     * Pool contract.
     * @dev References the Pool contract.
     */
    IPool private _pool;

    /**
     * PresaleNFT contract.
     * @dev References the PresaleNFT contract.
     */
    IPresaleNFT private _presaleNFT;

    /**
     * Swap contract.
     * @dev References the Swap contract.
     */
    ISwap private _swap;

    /**
     * Token contract.
     * @dev References the Token contract.
     */
    IToken private _token;

    /**
     * Vault contract.
     * @dev References the Vault contract.
     */
    IVault private _vault;

    /**
     * Presale NFTs claimed.
     * @dev Keeps track of which presale NFTs have been claimed.
     */
    mapping(uint256 => bool) private _presaleNFTsClaimed;

    /**
     * Constructor.
     * @dev Assigns the DEFAULT_ADMIN_ROLE to msg.sender.
     */
    constructor()
    {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    /**
     * -------------------------------------------------------------------------
     * PUBLIC FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Get all team wallets.
     * @notice Returns all team wallets.
     */
    function teamWallets() external view returns (address[] memory)
    {
        return _teamWallets;
    }

    /**
     * Get team wallet count.
     * @notice Returns the number of team wallets.
     */
    function teamWalletCount() external view returns (uint256)
    {
        return _teamWallets.length;
    }

    /**
     * Check if an address is a team wallet.
     * @param address_ The address to check.
     * @notice Returns true of the address is a team wallet.
     */
    function isTeamWallet(address address_) public view returns (bool)
    {
        bool exists = false;
        for(uint i = 0; i < _teamWallets.length; i ++)
        {
            if(_teamWallets[i] == address_) {
                exists = true;
            }
        }
        return exists;
    }

    /**
     * Get all family wallets.
     * @notice Returns all family wallets.
     */
    function familyWallets() external view returns (address[] memory)
    {
        return _teamWallets;
    }

    /**
     * Get family wallet count.
     * @notice Returns the number of family wallets.
     */
    function familyWalletCount() external view returns (uint256)
    {
        return _teamWallets.length;
    }

    /**
     * Check if an address is a family wallet.
     * @param address_ The address to check.
     * @notice Returns true of the address is a family wallet.
     */
    function isFamilyWallet(address address_) public view returns (bool)
    {
        bool exists = false;
        for(uint i = 0; i < _familyWallets.length; i ++)
        {
            if(_familyWallets[i] == address_) {
                exists = true;
            }
        }
        return exists;
    }

    /**
     * Payment token.
     * @notice The ERC20 token used to buy and sell FUR.
     */
    function paymentToken() external view returns (address)
    {
        return address(_paymentToken);
    }

    /**
     * DownlineNFT contract.
     * @notice References the DownlineNFT contract.
     */
    function downlineNFT() external view returns (address)
    {
        return address(_downlineNFT);
    }

    /**
     * Pool contract.
     * @notice References the Pool contract.
     */
    function pool() external view returns (address)
    {
        return address(_pool);
    }

    /**
     * PresaleNFT contract.
     * @notice References the PresaleNFT contract.
     */
    function presaleNFT() external view returns (address)
    {
        return address(_presaleNFT);
    }

    /**
     * Swap contract.
     * @notice References the Swap contract.
     */
    function swap() external view returns (address)
    {
        return address(_swap);
    }

    /**
     * Token contract.
     * @notice References the Token contract.
     */
    function token() external view returns (address)
    {
        return address(_token);
    }

    /**
     * Vault contract.
     * @notice References the Vault contract.
     */
    function vault() external view returns (address)
    {
        return address(_vault);
    }

    /**
     * -------------------------------------------------------------------------
     * ADMIN FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Add team wallet.
     * @param address_ The address to add.
     * @notice Adds a team wallet to the _teamWallets array.
     */
    function addTeamWallet(address address_) external admin
    {
        require(!isTeamWallet(address_), "Address already exists");
        _teamWallets.push(address_);
    }

    /**
     * Add family wallet.
     * @param address_ The address to add.
     * @notice Adds a family wallet to the _familyWallets array.
     */
    function addFamilyWallet(address address_) external admin
    {
        require(!isFamilyWallet(address_), "Address already exists");
        _familyWallets.push(address_);
    }

    /**
     * Set payment token.
     * @param address_ The address of the payment token.
     * @notice Once this is set, it is immutable.
     */
    function setPaymentToken(address address_) external admin
    {
        require(address(_paymentToken) == address(0), "Payment token already set");
        _paymentToken = IERC20(address_);
    }

    /**
     * Set downline nft.
     * @param address_ The address of the downline nft.
     * @notice Once this is set, it is immutable.
     */
    function setDownlineNFT(address address_) external admin
    {
        require(address(_downlineNFT) == address(0), "Downline NFT already set");
        _downlineNFT = IDownlineNFT(address_);
    }

    /**
     * Set pool.
     * @param address_ The address of the pool.
     * @notice Once this is set, it is immutable.
     */
    function setPool(address address_) external admin
    {
        require(address(_pool) == address(0), "Pool already set");
        _pool = IPool(address_);
    }

    /**
     * Set presale NFT.
     * @param address_ The address of the presale NFT.
     * @notice Once this is set, it is immutable.
     */
    function setPresaleNFT(address address_) external admin
    {
        require(address(_presaleNFT) == address(0), "Presale NFT already set");
        _presaleNFT = IPresaleNFT(address_);
    }

    /**
     * Set swap.
     * @param address_ The address of the swap.
     * @notice Once this is set, it is immutable.
     */
    function setSwap(address address_) external admin
    {
        require(address(_swap) == address(0), "Swap already set");
        _swap = ISwap(address_);
    }

    /**
     * Set token.
     * @param address_ The address of the token.
     * @notice Once this is set, it is immutable.
     */
    function setToken(address address_) external admin
    {
        require(address(_token) == address(0), "Token already set");
        _token = IToken(address_);
    }

    /**
     * Set vault.
     * @param address_ The address of the vault.
     * @notice Once this is set, it is immutable.
     */
    function setVault(address address_) external admin
    {
        require(address(_vault) == address(0), "Vault already set");
        _vault = IVault(address_);
    }

    /**
     * -------------------------------------------------------------------------
     * PRESALENFT FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Un-pause presale NFT.
     * @notice This unpauses the presale NFT contract.
     */
    function unpausePresaleNFT() external admin
    {
        _presaleNFT.unpause();
    }

    /**
     * Team mint presale NFT.
     * @notice this allows team wallets to mint an NFT.
     */
    function teamPresaleMint() external admin
    {
        for (uint i = 0; i < _teamWallets.length; i ++) {
            _presaleNFT.mint(_teamWallets[i]);
        }
    }

    /**
     * Family mint presale NFT.
     * @notice This allows family wallets to mint an NFT.
     */
    function familyPresaleMint() external
    {
        require(isFamilyWallet(msg.sender), "Unauthorized");
        require(_paymentToken.transferFrom(msg.sender, address(_presaleNFT), 250e16), "Payment failed");
        _presaleNFT.mint(msg.sender);
    }

    /**
     * Exchange presale NFT.
     * @notice This exchanges a presale NFT for 500 $FUR and 2 $FURNFT
     */
    function exchangePresaleNft() external
    {
        uint256 _tokenId_ = _presaleNFT.tokenOfOwnerByIndex(msg.sender, 0);
        require(_tokenId_ > 0, "No NFTs found");
        require(!_presaleNFTsClaimed[_tokenId_], "NFT already claimed");
        require(!_token.paused(), "Token is paused");
        _token.mint(msg.sender, 500);
        _downlineNFT.mint(msg.sender, 2);
        //_presaleNFT.burn(_tokenId_);
    }

    /**
     * -------------------------------------------------------------------------
     * MODIFIERS
     * -------------------------------------------------------------------------
     */
    modifier admin()
    {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Unauthorized");
        _;
    }
}
