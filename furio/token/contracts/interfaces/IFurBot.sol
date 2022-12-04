// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IFurBot {
    function addDividends ( uint256 generationId_, uint256 amount_ ) external;
    function addressBook (  ) external view returns ( address );
    function approve ( address to_, uint256 tokenId_ ) external;
    function availableDividendsByAddress ( address owner_ ) external view returns ( uint256 );
    function availableDividendsByToken ( uint256 tokenId_ ) external view returns ( uint256 );
    function balanceOf ( address owner ) external view returns ( uint256 );
    function buy ( uint256 amount_ ) external;
    function claimDividends (  ) external;
    function createGeneration ( uint256 maxSupply_, string memory imageUri_ ) external;
    function createSale ( uint256 generationId_, uint256 price_, uint256 start_, uint256 end_, bool restricted_ ) external;
    function getActiveSale (  ) external view returns ( uint256 );
    function getActiveSalePrice (  ) external view returns ( uint256 );
    function getApproved ( uint256 tokenId ) external view returns ( address );
    function getNextSale (  ) external view returns ( uint256 );
    function getNextSalePrice (  ) external view returns ( uint256 );
    function initialize (  ) external;
    function isApprovedForAll ( address owner, address operator ) external view returns ( bool );
    function name (  ) external view returns ( string memory );
    function owner (  ) external view returns ( address );
    function ownerOf ( uint256 tokenId ) external view returns ( address );
    function pause (  ) external;
    function paused (  ) external view returns ( bool );
    function proxiableUUID (  ) external view returns ( bytes32 );
    function renounceOwnership (  ) external;
    function safeTransferFrom ( address from, address to, uint256 tokenId ) external;
    function safeTransferFrom ( address from, address to, uint256 tokenId, bytes memory _data ) external;
    function setAddressBook ( address address_ ) external;
    function setApprovalForAll ( address operator_, bool approved_ ) external;
    function setup (  ) external;
    function supportsInterface ( bytes4 interfaceId ) external view returns ( bool );
    function symbol (  ) external view returns ( string memory );
    function tokenOfOwnerByIndex ( address owner_, uint256 index_ ) external view returns ( uint256 );
    function tokenURI ( uint256 tokenId_ ) external view returns ( string memory );
    function totalDividends (  ) external view returns ( uint256 );
    function totalInvestment (  ) external view returns ( uint256 );
    function totalSupply (  ) external view returns ( uint256 );
    function transferFrom ( address from, address to, uint256 tokenId ) external;
    function transferOwnership ( address newOwner ) external;
    function unpause (  ) external;
    function upgradeTo ( address newImplementation ) external;
    function upgradeToAndCall ( address newImplementation, bytes memory data ) external;
}
