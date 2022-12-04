// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// INTERFACES
import "@openzeppelin/contracts/interfaces/IERC165.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";
import "./interfaces/IDownlineNFT.sol";
import "./interfaces/IToken.sol";

/**
 * @title Presale NFT
 * @author Steve Harmeyer
 * @notice This is the presale NFT contract. Anyone holding one of these NFTs
 * can exchange them for 500 FUR tokens + 2 downline NFTs.
 */
contract PresaleNFT {
    /**
     * @dev Contract owner address.
     */
    address public owner;

    /**
     * @dev Paused state.
     */
    bool public paused = true;

    /**
     * @dev Payment token.
     */
    IERC20 public paymentToken;

    /**
     * @dev $FUR token.
     */
    IToken public token;

    /**
     * @dev $FURNFT token.
     */
    IDownlineNFT public downlineNft;

    /**
     * @dev Dev wallet address.
     */
    address public devWallet;

    /**
     * @dev Array of addresses that can buy while paused.
     */
    mapping(address => bool) private _presaleWallets;

    /**
     * @dev Stats.
     */
    uint256 public totalSupply;
    uint256 public totalCreated;
    uint256 public maxSupply = 300;
    uint256 public maxPerUser = 1;
    uint256 public price = 250e18;
    uint256 public tokenValue = 500e18;
    uint256 public nftValue = 2;
    uint256 private _currentTokenId;
    mapping(uint256 => bool) private _exists;
    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public ownerOf;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    string public baseURI = 'ipfs://QmSZhsoYWeb9gCXAaGDe7vs9AVFPxr5nn2GWxicBKKouui/';

    /**
     * @dev Contract events.
     */
    event Transfer(address indexed from_, address indexed to_, uint256 indexed tokenId_);
    event Approval(address indexed owner_, address indexed approved_, uint256 indexed tokenId_);
    event ApprovalForAll(address indexed owner_, address indexed operator_, bool approved_);
    event Minted(address indexed to_, uint256 indexed tokenId_);
    event Claimed(uint256 indexed tokenId_);

    /**
     * @dev Contract constructor.
     */
    constructor()
    {
        owner = msg.sender;
    }

    /**
     * -------------------------------------------------------------------------
     * ERC721 STANDARDS
     * -------------------------------------------------------------------------
     */

    /**
     * @dev see {IERC721-name}.
     */
    function name() external pure returns (string memory)
    {
        return "Furio Presale NFT";
    }

    /**
     * @dev see {IERC721-symbol}.
     */
    function symbol() external pure returns (string memory)
    {
        return "$FURPRESALE";
    }

    /**
     * @dev see {IERC721-tokenURI}.
     */
    function tokenURI(uint256 tokenId_) external view returns (string memory)
    {
        require(_exists[tokenId_], "Token does not exist");
        return string(abi.encodePacked(baseURI, tokenId_));
    }

    /**
     * @dev see {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from_, address to_, uint256 tokenId_, bytes memory data_) public isNotPaused
    {
        require(to_ != address(0), "Cannot transfer to zero address");
        address _owner_ = ownerOf[tokenId_];
        require(msg.sender == _owner_ || msg.sender == getApproved(tokenId_) || isApprovedForAll(_owner_, msg.sender), "Unauthorized");
        _tokenApprovals[tokenId_] = address(0);
        emit Approval(_owner_, address(0), tokenId_);
        balanceOf[from_] -= 1;
        balanceOf[to_] += 1;
        ownerOf[tokenId_] = to_;
        emit Transfer(from_, to_, tokenId_);
    }

    /**
     * @dev see {IERC721-safeTransferFrom}.
     */
    function safeTransferFrom(address from_, address to_, uint256 tokenId_) external isNotPaused
    {
        safeTransferFrom(from_, to_, tokenId_, "");
    }

    /**
     * @dev see {IERC721-transferFrom}.
     */
    function transferFrom(address from_, address to_, uint256 tokenId_) external isNotPaused
    {
        safeTransferFrom(from_, to_, tokenId_, "");
    }

    /**
     * @dev see {IERC721-approve}.
     */
    function approve(address approved_, uint256 tokenId_) public isNotPaused
    {
        address _owner_ = ownerOf[tokenId_];
        require(approved_ != _owner_, "Cannot approve to current owner");
        require(msg.sender == _owner_ || isApprovedForAll(_owner_, msg.sender), "Unauthorized");
        _tokenApprovals[tokenId_] = approved_;
        emit Approval(_owner_, approved_, tokenId_);
    }

    /**
     * @dev see {IERC721-setApprovalForAll}.
     */
    function setApprovalForAll(address operator_, bool approved_) external isNotPaused
    {
        require(msg.sender != operator_, "Cannot approve to current owner");
        _operatorApprovals[msg.sender][operator_] = approved_;
        emit ApprovalForAll(msg.sender, operator_, approved_);
    }

    /**
     * @dev see {IERC721-getApproved}.
     */
    function getApproved(uint256 tokenId_) public view returns (address)
    {
        require(_exists[tokenId_], "Token does not exist");
        return _tokenApprovals[tokenId_];
    }

    /**
     * @dev see {IERC721-isApprovedForAll}.
     */
    function isApprovedForAll(address owner_, address operator_) public view returns (bool)
    {
        return _operatorApprovals[owner_][operator_];
    }

    /**
     * -------------------------------------------------------------------------
     * ERC165 STANDARDS
     * -------------------------------------------------------------------------
     */
    function supportsInterface(bytes4 interfaceId_) external pure returns (bool)
    {
        return
            interfaceId_ == type(IERC165).interfaceId ||
            interfaceId_ == type(IERC721).interfaceId ||
            interfaceId_ == type(IERC721Metadata).interfaceId;
    }

    /**
     * -------------------------------------------------------------------------
     * ADMIN FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Set contract owner.
     * @param address_ The address of the owner wallet.
     */
    function setContractOwner(address address_) external onlyOwner
    {
        owner = address_;
    }

    /**
     * @dev Pause contract.
     */
    function pause() external onlyOwner
    {
        paused = true;
    }

    /**
     * @dev Unpause contract.
     */
    function unpause() external onlyOwner
    {
        paused = false;
    }

    /**
     * @dev Set payment token.
     */
    function setPaymentToken(address address_) external onlyOwner
    {
        paymentToken = IERC20(address_);
    }

    /**
     * @dev Set dev wallet.
     */
    function setDevWallet(address address_) external onlyOwner
    {
        devWallet = address_;
    }

    /**
     * @dev Set $FUR token.
     */
    function setFurToken(address address_) external onlyOwner
    {
        token = IToken(address_);
    }

    /**
     * @dev Set downline NFT.
     */
    function setDownlineNft(address address_) external onlyOwner
    {
        downlineNft = IDownlineNFT(address_);
    }

    /**
     * @dev Add a presale wallet.
     */
    function addPresaleWallet(address address_) external onlyOwner
    {
        _presaleWallets[address_] = true;
    }

    /**
     * @dev Set max supply.
     */
    function setMaxSupply(uint256 supply_) external onlyOwner
    {
        maxSupply = supply_;
    }

    /**
     * @dev Set max per user.
     */
    function setMaxPerUser(uint256 max_) external onlyOwner
    {
        maxPerUser = max_;
    }

    /**
     * @dev Set price.
     */
    function setPrice(uint256 price_) external onlyOwner
    {
        price = price_;
    }

    /**
     * @dev Set token value.
     */
    function setTokenValue(uint256 value_) external onlyOwner
    {
        tokenValue = value_;
    }

    /**
     * @dev Set NFT value.
     */
    function setNftValue(uint256 value_) external onlyOwner
    {
        nftValue = value_;
    }

    /**
     * @dev Set base URI.
     */
    function setBaseURI(string memory baseURI_) external onlyOwner
    {
        baseURI = baseURI_;
    }

    /**
     * @dev Mint an NFT.
     */
    function mint(address to_) external onlyOwner
    {
        _mint(to_);
    }

    /**
     * -------------------------------------------------------------------------
     * USER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * @dev Buy an NFT.
     */
    function buy() external
    {
        require(!paused || _presaleWallets[msg.sender], "Sale is not open");
        require(address(paymentToken) != address(0), "Payment token not set");
        require(devWallet != address(0), "Dev wallet not set");
        require(paymentToken.transferFrom(msg.sender, address(this), price), "Transfer failed");
        _mint(msg.sender);
    }

    /**
     * @dev Claim an NFT.
     */
    function claim() external
    {
        require(balanceOf[msg.sender] > 0, "No NFTs owned");
        require(address(token) != address(0), "$FUR token not set");
        require(address(downlineNft) != address(0), "NFT token not set");
        require(!token.paused(), "$FUR token is paused");
        require(!downlineNft.paused(), "$FURNFT token is paused");
        token.mint(msg.sender, tokenValue);
        downlineNft.mint(msg.sender, nftValue);
        uint256 _tokenId_ = 0;
        for(uint256 i = 1; i <= totalSupply; i++) {
            if(ownerOf[i] == msg.sender) {
                _tokenId_ = i;
                break;
            }
        }
        balanceOf[msg.sender] -= 1;
        delete _tokenApprovals[_tokenId_];
        delete ownerOf[_tokenId_];
        delete _exists[_tokenId_];
        totalSupply --;
        emit Transfer(msg.sender, address(0), _tokenId_);
        emit Claimed(_tokenId_);
    }

    /**
     * -------------------------------------------------------------------------
     * INTERNAL FUNCTIONS
     * -------------------------------------------------------------------------
     */

    function _mint(address to_) internal
    {
        require(totalCreated < maxSupply, "Out of supply");
        require(balanceOf[to_] < maxPerUser, "User has max");
        _currentTokenId ++;
        totalSupply ++;
        totalCreated ++;
        balanceOf[to_] += 1;
        ownerOf[_currentTokenId] = to_;
        _exists[_currentTokenId] = true;
        emit Transfer(address(0), to_, _currentTokenId);
        emit Minted(to_, _currentTokenId);
    }

    /**
     * -------------------------------------------------------------------------
     * MODIFIERS
     * -------------------------------------------------------------------------
     */

    /**
     * @dev Requires caller to be owner. These are methods that will be
     * called by a trusted user.
     */
    modifier onlyOwner()
    {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    /**
     * @dev Requires the contract to not be paused.
     */
    modifier isNotPaused()
    {
        require(!paused, "Contract is paused");
        _;
    }
}
