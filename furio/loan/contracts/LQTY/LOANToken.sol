// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "../abstracts/BaseContract.sol";
import "../Interfaces/ILOANToken.sol";

contract LOANToken is BaseContract, ERC20Upgradeable {
    
    using SafeMath for uint256;

    uint internal _1_MILLION;

    address public communityIssuanceAddress;
    address public loanStakingAddress;

    uint internal deploymentStartTime;


    function initialize(
        address _communityIssuanceAddress,
        address _loanStakingAddress,
        address _bountyAddress
    ) 
        public initializer 
    {
        __BaseContract_init();
        __ERC20_init("LOAN", "$LOAN");

        _1_MILLION = 1e24;    // 1e6 * 1e18 = 1e24

        
        communityIssuanceAddress = _communityIssuanceAddress;
        loanStakingAddress = _loanStakingAddress;

        deploymentStartTime  = block.timestamp;
          
        uint bountyEntitlement = _1_MILLION.mul(2); // Allocate 2 million for bounties/hackathons
        super._mint(_bountyAddress, bountyEntitlement);

        uint depositorsAndFrontEndsEntitlement = _1_MILLION.mul(32); // Allocate 32 million to the algorithmic issuance schedule
        super._mint(_communityIssuanceAddress, depositorsAndFrontEndsEntitlement);

    }

    event CommunityIssuanceAddressChanged(address _communityIssuanceAddress);
    event LoanStakingAddressChanged(address _loanStakingAddress);

    function mint(address _account, uint256 _amount) external onlyOwner{
        super._mint(_account, _amount);
    }

    function burn(address _account, uint256 _amount) external onlyOwner{
        super._burn(_account, _amount);
    }


    function transfer(address recipient, uint256 amount) public override whenNotPaused returns (bool) {
        _requireValidRecipient(recipient);
        super._transfer(msg.sender, recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override whenNotPaused returns (bool) {
        _requireValidRecipient(recipient);
        super.transferFrom(sender, recipient, amount);
        return true;
    }

    function sendToLOANStaking(address _sender, uint256 _amount) external whenNotPaused{
        _requireCallerIsLOANStaking();
        super._transfer(_sender, loanStakingAddress, _amount);
    }

    function setCommunityIssuanceAddress(address _communityIssuanceAddress) external onlyOwner {
        require(_communityIssuanceAddress != address(0), "Invaild Address");
        communityIssuanceAddress = _communityIssuanceAddress;
        emit CommunityIssuanceAddressChanged(_communityIssuanceAddress);
    }

    function setLoanStakingAddress(address _loanStakingAddress)external onlyOwner {
        require(_loanStakingAddress != address(0), "Invaild Address");
        loanStakingAddress = _loanStakingAddress;
        emit LoanStakingAddressChanged(_loanStakingAddress);
    }
    
    function _requireValidRecipient(address _recipient) internal view {
        require(
            _recipient != address(0) && 
            _recipient != address(this),
            "LOAN: Cannot transfer tokens directly to the LOAN token contract or the zero address"
        );
        require(
            _recipient != communityIssuanceAddress &&
            _recipient != loanStakingAddress,
            "LOAN: Cannot transfer tokens directly to the community issuance or staking contract"
        );
    }

    function _requireCallerIsLOANStaking() internal view {
         require(msg.sender == loanStakingAddress, "LOANToken: caller must be the LOANStaking contract");
    }

    function getDeploymentStartTime() external view returns (uint256) {
        return deploymentStartTime;
    }

}
