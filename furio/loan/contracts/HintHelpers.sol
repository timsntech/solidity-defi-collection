// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./abstracts/BaseContract.sol";
import "./Interfaces/IVaultManager.sol";
import "./Interfaces/ISortedVaults.sol";
import "./Dependencies/LiquityBase.sol";
import "hardhat/console.sol";

contract HintHelpers is BaseContract, LiquityBase {

    using SafeMath for uint;

    function initialize() public initializer {
        __BaseContract_init();
    }

    string constant public NAME = "HintHelpers";

    ISortedVaults public sortedVaults;
    IVaultManager public vaultManager;

    // --- Dependency setters ---

    function setAddresses(
        address _sortedVaultsAddress,
        address _vaultManagerAddress
    )
        external
        onlyOwner
    {
        sortedVaults = ISortedVaults(_sortedVaultsAddress);
        vaultManager = IVaultManager(_vaultManagerAddress);

    }

    // --- Functions ---

    /* getRedemptionHints() - Helper function for finding the right hints to pass to redeemCollateral().
     *
     * It simulates a redemption of `_FURUSDamount` to figure out where the redemption sequence will start and what state the final Vault
     * of the sequence will end up in.
     *
     * Returns three hints:
     *  - `firstRedemptionHint` is the address of the first Vault with ICR >= MCR (i.e. the first Vault that will be redeemed).
     *  - `partialRedemptionHintNICR` is the final nominal ICR of the last Vault of the sequence after being hit by partial redemption,
     *     or zero in case of no partial redemption.
     *  - `truncatedFURUSDamount` is the maximum amount that can be redeemed out of the the provided `_FURUSDamount`. This can be lower than
     *    `_FURUSDamount` when redeeming the full amount would leave the last Vault of the redemption sequence with less net debt than the
     *    minimum allowed value (i.e. MIN_NET_DEBT).
     *
     * The number of Vaults to consider for redemption can be capped by passing a non-zero value as `_maxIterations`, while passing zero
     * will leave it uncapped.
     */

    function getRedemptionHints(
        uint _FURUSDamount, 
        uint _price,
        uint _maxIterations
    )
        external
        view
        returns (
            address firstRedemptionHint,
            uint partialRedemptionHintNICR,
            uint truncatedFURUSDamount
        )
    {
        ISortedVaults sortedVaultsCached = sortedVaults;

        uint remainingFURUSD = _FURUSDamount;
        address currentVaultuser = sortedVaultsCached.getLast();

        while (currentVaultuser != address(0) && vaultManager.getCurrentICR(currentVaultuser, _price) < MCR) {
            currentVaultuser = sortedVaultsCached.getPrev(currentVaultuser);
        }

        firstRedemptionHint = currentVaultuser;

        if (_maxIterations == 0) {
            _maxIterations = type(uint).max;
        }

        while (currentVaultuser != address(0) && remainingFURUSD > 0 && _maxIterations-- > 0) {
            uint netFURUSDDebt = vaultManager.getVaultDebt(currentVaultuser)
                .add(vaultManager.getPendingFURUSDDebtReward(currentVaultuser));

            if (netFURUSDDebt > remainingFURUSD) {
                if (netFURUSDDebt > MIN_NET_DEBT) {
                    uint maxRedeemableFURUSD = LiquityMath._min(remainingFURUSD, netFURUSDDebt.sub(MIN_NET_DEBT));

                    uint FURFI = vaultManager.getVaultColl(currentVaultuser)
                        .add(vaultManager.getPendingFURFIReward(currentVaultuser));

                    uint newColl = FURFI.sub(maxRedeemableFURUSD.mul(DECIMAL_PRECISION).div(_price));
                    uint newDebt = netFURUSDDebt.sub(maxRedeemableFURUSD);

                    partialRedemptionHintNICR = LiquityMath._computeNominalCR(newColl, newDebt);

                    remainingFURUSD = remainingFURUSD.sub(maxRedeemableFURUSD);
                }
                break;
            } else {
                remainingFURUSD = remainingFURUSD.sub(netFURUSDDebt);
            }

            currentVaultuser = sortedVaultsCached.getPrev(currentVaultuser);
        }

        truncatedFURUSDamount = _FURUSDamount.sub(remainingFURUSD);
    }

    /* getApproxHint() - return address of a Vault that is, on average, (length / numTrials) positions away in the 
    sortedVaults list from the correct insert position of the Vault to be inserted. 
    
    Note: The output address is worst-case O(n) positions away from the correct insert position, however, the function 
    is probabilistic. Input can be tuned to guarantee results to a high degree of confidence, e.g:

    Submitting numTrials = k * sqrt(length), with k = 15 makes it very, very likely that the ouput address will 
    be <= sqrt(length) positions away from the correct insert position.
    */
    function getApproxHint(uint _CR, uint _numTrials, uint _inputRandomSeed)
        external
        view
        returns (address hintAddress, uint diff, uint latestRandomSeed)
    {
        uint arrayLength = vaultManager.getVaultOwnersCount();

        if (arrayLength == 0) {
            return (address(0), 0, _inputRandomSeed);
        }

        hintAddress = sortedVaults.getLast();
        diff = LiquityMath._getAbsoluteDifference(_CR, vaultManager.getNominalICR(hintAddress));
        latestRandomSeed = _inputRandomSeed;

        uint i = 1;

        while (i < _numTrials) {
            latestRandomSeed = uint(keccak256(abi.encodePacked(latestRandomSeed)));

            uint arrayIndex = latestRandomSeed % arrayLength;
            address currentAddress = vaultManager.getVaultFromVaultOwnersArray(arrayIndex);
            uint currentNICR = vaultManager.getNominalICR(currentAddress);

            // check if abs(current - CR) > abs(closest - CR), and update closest if current is closer
            uint currentDiff = LiquityMath._getAbsoluteDifference(currentNICR, _CR);

            if (currentDiff < diff) {
                diff = currentDiff;
                hintAddress = currentAddress;
            }
            i++;
        }
    }

    function computeNominalCR(uint _coll, uint _debt) external pure returns (uint) {
        return LiquityMath._computeNominalCR(_coll, _debt);
    }

    function computeCR(uint _coll, uint _debt, uint _price) external pure returns (uint) {
        return LiquityMath._computeCR(_coll, _debt, _price);
    }
}
