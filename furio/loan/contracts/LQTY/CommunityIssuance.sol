// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../abstracts/BaseContract.sol";
import "../Interfaces/ILOANToken.sol";
import "../Interfaces/ICommunityIssuance.sol";
import "../Dependencies/BaseMath.sol";
import "../Dependencies/LiquityMath.sol";

contract CommunityIssuance is BaseContract, ICommunityIssuance, BaseMath {
    
    using SafeMath for uint;

    // --- Data ---

    string constant public NAME = "CommunityIssuance";

    uint constant public SECONDS_IN_ONE_MINUTE = 60;

   /* The issuance factor F determines the curvature of the issuance curve.
    *
    * Minutes in one year: 60*24*365 = 525600
    *
    * For 50% of remaining tokens issued each year, with minutes as time units, we have:
    * 
    * F ** 525600 = 0.5
    * 
    * Re-arranging:
    * 
    * 525600 * ln(F) = ln(0.5)
    * F = 0.5 ** (1/525600)
    * F = 0.999998681227695000 
    */
    uint constant public ISSUANCE_FACTOR = 999998681227695000;

    /* 
    * The community LOAN supply cap is the starting balance of the Community Issuance contract.
    * It should be minted to this contract by LOANToken, when the token is deployed.
    * 
    * Set to 32M (slightly less than 1/3) of total LOAN supply.
    */
    uint constant public LOANSupplyCap = 32e24; // 32 million

    ILOANToken public loanToken;

    address public stabilityPoolAddress;

    uint public totalLOANIssued;
    uint public deploymentTime;

    // --- Events ---

    event LOANTokenAddressSet(address _loanTokenAddress);
    event StabilityPoolAddressSet(address _stabilityPoolAddress);
    event TotalLOANIssuedUpdated(uint _totalLOANIssued);

    function initialize() public initializer {
        __BaseContract_init();
        deploymentTime = block.timestamp;
    }

    function setAddresses(
        address _loanTokenAddress, 
        address _stabilityPoolAddress
    ) 
        external 
        onlyOwner 
        override 
    {
        loanToken = ILOANToken(_loanTokenAddress);
        stabilityPoolAddress = _stabilityPoolAddress;

        // When LOANToken deployed, it should have transferred CommunityIssuance's LOAN entitlement
        uint LOANBalance = loanToken.balanceOf(address(this));
        assert(LOANBalance >= LOANSupplyCap);

        emit LOANTokenAddressSet(_loanTokenAddress);
        emit StabilityPoolAddressSet(_stabilityPoolAddress);
    }

    function issueLOAN() external override whenNotPaused returns (uint) {
        _requireCallerIsStabilityPool();

        uint latestTotalLOANIssued = LOANSupplyCap.mul(_getCumulativeIssuanceFraction()).div(DECIMAL_PRECISION);
        uint issuance = latestTotalLOANIssued.sub(totalLOANIssued);

        totalLOANIssued = latestTotalLOANIssued;
        emit TotalLOANIssuedUpdated(latestTotalLOANIssued);
        
        return issuance;
    }

    /* Gets 1-f^t    where: f < 1

    f: issuance factor that determines the shape of the curve
    t:  time passed since last LOAN issuance event  */
    function _getCumulativeIssuanceFraction() internal view returns (uint) {
        // Get the time passed since deployment
        uint timePassedInMinutes = block.timestamp.sub(deploymentTime).div(SECONDS_IN_ONE_MINUTE);

        // f^t
        uint power = LiquityMath._decPow(ISSUANCE_FACTOR, timePassedInMinutes);

        //  (1 - f^t)
        uint cumulativeIssuanceFraction = (uint(DECIMAL_PRECISION).sub(power));
        assert(cumulativeIssuanceFraction <= DECIMAL_PRECISION); // must be in range [0,1]

        return cumulativeIssuanceFraction;
    }

    function sendLOAN(address _account, uint _LOANamount) external override whenNotPaused {
        _requireCallerIsStabilityPool();

        loanToken.transfer(_account, _LOANamount);
    }

    // --- 'require' functions ---

    function _requireCallerIsStabilityPool() internal view {
        require(msg.sender == stabilityPoolAddress, "CommunityIssuance: caller is not SP");
    }
}
