// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Token
 * @author Steve Harmeyer
 * @notice This is the ERC20 contract for $FUR token.
 */
contract Token {
    /**
     * @dev Contract owner address.
     */
    address public owner;

    /**
     * @dev Paused state.
     */
    bool public paused = true;

    /**
     * @dev Mapping to track balances.
     */
    mapping(address => uint256) private _balances;

    /**
     * @dev Mapping to track allowances.
     */
    mapping(address => mapping(address => uint256)) private _allowances;

    /**
     * @dev Contract statistics.
     */
    struct Stats {
        uint256 transactions;
        uint256 minted;
    }
    mapping(address => Stats) public stats;
    uint256 public players;
    uint256 public totalSupply;
    uint256 public transactions;
    uint256 public minted;

    /**
     * @dev Tax rates.
     */
    uint256 public burnTax = 0; // This amount is burned from each tx
    uint256 public liquidityTax = 0; // This amount is sent to the pool
    uint256 public vaultTax = 10; // This amount is sent to the vault
    uint256 public devTax = 0; // This amount is sent to the dev wallet

    /**
     * @dev Other contracts in the Furio ecosystem.
     */
    address public treasury;
    address public downlineNft;
    address public pool;
    address public presaleNft;
    address public vault;

    /**
     * @dev Contract events.
     */
    event Approval(address indexed owner_, address indexed spender_, uint256 value_);
    event Mint(address indexed to_, uint256 amount_);
    event TaxPayed(address from, address vault, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Contract constructor.
     */
    constructor()
    {
        owner = msg.sender;
    }

    /**
     * -------------------------------------------------------------------------
     * ERC20 STANDARDS
     * -------------------------------------------------------------------------
     */

    /**
     * @dev see {IERC20-name}.
     */
    function name() external pure returns (string memory)
    {
        return 'Furio Token';
    }

    /**
     * @dev see {IERC20-symbol}.
     */
    function symbol() external pure returns (string memory)
    {
        return '$FUR';
    }

    function decimals() external pure returns (uint8)
    {
        return 18;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account_) external view returns (uint256)
    {
        return _balances[account_];
    }

    /**
     * @dev See {IERC20-transfer}.
     */
    function transfer(address to_, uint256 amount_) external isNotPaused returns (bool)
    {
        return _internalTransfer(msg.sender, to_, amount_, taxRate());
    }

    /**
     * @dev See {IERC20-transferFrom}.
     */
    function transferFrom(address from_, address to_, uint256 amount_) external isNotPaused returns (bool)
    {
        uint256 _allowance_ = allowance(from_, to_);
        require(_allowance_ >= amount_, "Insufficient allowance");
        _allowances[from_][to_] -= amount_;
        return _internalTransfer(from_, to_, amount_, taxRate());
    }

    /**
     * @dev See {IERC20-approve}.
     */
    function approve(address spender_, uint256 amount_) external isNotPaused returns (bool)
    {
        _allowances[msg.sender][spender_] = amount_;
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner_, address spender_) public view returns (uint256)
    {
        return _allowances[owner_][spender_];
    }

    /**
     * -------------------------------------------------------------------------
     * USER FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Effective tax rate.
     * @dev This returns the combined tax rate for all taxes.
     */
    function taxRate() public view returns (uint256)
    {
        return burnTax + liquidityTax + vaultTax + devTax;
    }

    /**
     * -------------------------------------------------------------------------
     * PROTECTED FUNCTIONS
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
     * Set treasury.
     * @param address_ The address of the treasury wallet.
     */
    function setTreasury(address address_) external onlyOwner
    {
        treasury = address_;
    }

    /**
     * Set downline nft.
     * @param address_ The address of the downline nft.
     */
    function setDownlineNft(address address_) external onlyOwner
    {
        downlineNft = address_;
    }

    /**
     * Set pool.
     * @param address_ The address of the pool.
     */
    function setPool(address address_) external onlyOwner
    {
        pool = address_;
    }

    /**
     * Set presale NFT.
     * @param address_ The address of the presale NFT.
     */
    function setPresaleNft(address address_) external onlyOwner
    {
        presaleNft = address_;
    }

    /**
     * Set vault.
     * @param address_ The address of the vault.
     */
    function setVault(address address_) external onlyOwner
    {
        vault = address_;
    }

    /**
     * Set burn tax.
     * @param tax_ The amount of burn tax.
     * @dev This tax is burnt forever.
     */
    function setBurnTax(uint256 tax_) external onlyOwner
    {
        burnTax = tax_;
    }

    /**
     * Set liquidity tax.
     * @param tax_ The amount of liquidity tax.
     * @dev This tax is paid to the liquidity pool contract.
     */
    function setLiquidityTax(uint256 tax_) external onlyOwner
    {
        liquidityTax = tax_;
    }

    /**
     * Set vault tax.
     * @param tax_ The amount of vault tax.
     * @dev This tax is paid to the vault contract to fund rewards.
     */
    function setVaultTax(uint256 tax_) external onlyOwner
    {
        vaultTax = tax_;
    }

    /**
     * Set dev tax.
     * @param tax_ The amount of dev tax.
     * @dev This tax is paid to a dev wallet to fund further development.
     */
    function setDevTax(uint256 tax_) external onlyOwner
    {
        devTax = tax_;
    }

    /**
     * Protected transfer.
     * @param from_ The address to transfer from.
     * @param to_ The address to transfer to.
     * @param amount_ The amount to transfer.
     * @param taxRate_ The tax rate that should be applied.
     * @dev Only other Furio contracts can call this method.
     */
    function protectedTransfer(address from_, address to_, uint256 amount_, uint256 taxRate_) external trusted returns (bool)
    {
        return _internalTransfer(from_, to_, amount_, taxRate_);
    }

    /**
     * Mint.
     * @param to_ Address to mint to.
     * @param amount_ Amount of tokens to mint.
     * @dev Only other Furio contracts can call this method.
     */
    function mint(address to_, uint256 amount_) external trusted
    {
        totalSupply += amount_;
        _balances[to_] += amount_;
        emit Transfer(address(0), to_, amount_);
        emit Mint(to_, amount_);
        _updateStats(to_);
        stats[to_].minted += amount_;
        transactions ++;
        minted ++;
    }

    /**
     * Burn.
     * @param from_ Address to burn from.
     * @param amount_ Amount of tokens to burn.
     * @dev Only other Furio contracts can call this method.
     */
    function burn(address from_, uint256 amount_) external trusted
    {
        require(_balances[from_] >= amount_, "Insufficient funds");
        _balances[from_] -= amount_;
        totalSupply -= amount_;
        emit Transfer(from_, address(0), amount_);
    }

    /**
     * -------------------------------------------------------------------------
     * INTERNAL FUNCTIONS
     * -------------------------------------------------------------------------
     */

    /**
     * Internal transfer.
     * @param from_ Transfer from address.
     * @param to_ Transfer to address.
     * @param amount_ Transfer amount.
     * @param taxRate_ Tax rate.
     * @return bool
     */
    function _internalTransfer(address from_, address to_, uint256 amount_, uint256 taxRate_) internal returns (bool)
    {
        require(from_ != address(0), "No transfers from the zero address");
        require(to_ != address(0), "No transfers to the zero address");
        require(_balances[from_] >= amount_, "Insufficient funds");
        _balances[from_] -= amount_;
        if(taxRate_ > 0) {
            uint256 _tax_ = amount_ * taxRate_ / 100;
            uint256 _totalTaxRate_ = taxRate();
            uint256 _burnTax_ = _tax_ * burnTax / _totalTaxRate_;
            uint256 _liquidityTax_ = _tax_ * liquidityTax / _totalTaxRate_;
            uint256 _vaultTax_ = _tax_ * vaultTax / _totalTaxRate_;
            uint256 _devTax_ = _tax_ * devTax / _totalTaxRate_;
            if(_burnTax_ > 0) {
                totalSupply -= _burnTax_;
                emit Transfer(from_, address(0), _burnTax_);
                emit TaxPayed(from_, address(0), _burnTax_);
            }
            if(_liquidityTax_ > 0) {
                _balances[address(pool)] += _liquidityTax_;
                emit Transfer(from_, address(pool), _liquidityTax_);
                emit TaxPayed(from_, address(pool), _liquidityTax_);
            }
            if(_vaultTax_ > 0) {
                _balances[address(vault)] += _vaultTax_;
                emit Transfer(from_, address(vault), _vaultTax_);
                emit TaxPayed(from_, address(vault), _vaultTax_);
            }
            if(_devTax_ > 0) {
                _balances[address(treasury)] += _devTax_;
                emit Transfer(from_, address(treasury), _devTax_);
                emit TaxPayed(from_, address(treasury), _devTax_);
            }
            amount_ -= _tax_;
        }
        _balances[to_] += amount_;
        _updateStats(from_);
        _updateStats(to_);
        transactions ++;
        return true;
    }

    /**
     * Update stats.
     * @param player_ Address of player to update.
     */
    function _updateStats(address player_) internal
    {
        if(stats[player_].transactions == 0) {
            players ++;
        }
        stats[player_].transactions ++;
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
     * @dev Requires callers is a trusted contract. These are automated
     * methods that facilitate Furio contract interaction.
     */
    modifier trusted()
    {
        require(
            msg.sender == address(downlineNft) ||
            msg.sender == address(pool) ||
            msg.sender == address(presaleNft) ||
            msg.sender == address(vault),
            "Unauthorized"
        );
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
