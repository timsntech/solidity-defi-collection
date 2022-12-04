const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FullTest", function () {
    // RUN THIS BEFORE EACH TEST
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        // deploy FurAdmin
        FurAdmin = await ethers.getContractFactory("FurAdmin");
        furadmin = await FurAdmin.deploy();
        // deploy FurAddressBook
        FurAddressBook = await ethers.getContractFactory("FurAddressBook");
        furaddressbook = await FurAddressBook.deploy(furadmin.address);
        await furadmin.setAddressBook(furaddressbook.address);
        // deploy Mock USDC
        USDC = await ethers.getContractFactory("MockUSDC");
        usdc = await USDC.deploy();
        await furadmin.addressBookSetPaymentToken(usdc.address);
        // deploy FurNFT
        FurNFT = await ethers.getContractFactory("FurNFT");
        furnft = await FurNFT.deploy(furaddressbook.address);
        await furadmin.addressBookSetFurNFT(furnft.address);
        // deploy FurPool
        FurPool = await ethers.getContractFactory("FurPool");
        furpool = await FurPool.deploy(furaddressbook.address);
        await furadmin.addressBookSetFurPool(furpool.address);
        // deploy FurSwap
        FurSwap = await ethers.getContractFactory("FurSwap");
        furswap = await FurSwap.deploy(furaddressbook.address);
        await furadmin.addressBookSetFurSwap(furswap.address);
        // deploy FurToken
        FurToken = await ethers.getContractFactory("FurToken");
        furtoken = await FurToken.deploy(furaddressbook.address);
        await furadmin.addressBookSetFurToken(furtoken.address);
        // deploy FurWhitelist
        FurWhitelist = await ethers.getContractFactory("FurWhitelist");
        furwhitelist = await FurWhitelist.deploy(furaddressbook.address);
        await furadmin.addressBookSetFurWhitelist(furwhitelist.address);
    });
    // TESTS
    describe("AddressBook Deployment", function () {
        it("Address has correct data at deployment", async function () {
            expect(furaddressbook.address).to.not.equal();
            expect(await furaddressbook.paymentToken()).to.equal(usdc.address);
            expect(await furaddressbook.furToken()).to.equal(furtoken.address);
            expect(await furaddressbook.whitelist()).to.equal(whitelist.address);
            expect(await furaddressbook.furSwap()).to.equal('0x0000000000000000000000000000000000000000');
            expect(await furaddressbook.furVault()).to.equal('0x0000000000000000000000000000000000000000');
            expect(await furaddressbook.furPool()).to.equal('0x0000000000000000000000000000000000000000');
            expect(await furaddressbook.devCount()).to.equal(0);
            expect(await furaddressbook.owner()).to.equal(owner.address);
        });
    });
    describe("Addressbook Admin Functions", function () {
        it("Can add dev addresses", async function () {
            await expect(furaddressbook.addDevWallet(owner.address)).to.not.be.reverted;
            expect(await furaddressbook.devCount()).to.equal(1);
            expect(await furaddressbook.isDevWallet(owner.address)).to.equal(true);
            expect(await furaddressbook.isDevWallet(addr1.address)).to.equal(false);
            await expect(furaddressbook.addDevWallet(addr1.address)).to.not.be.reverted;
            expect(await furaddressbook.devCount()).to.equal(2);
            expect(await furaddressbook.isDevWallet(addr1.address)).to.equal(true);
            await expect(furaddressbook.connect(addr1).addDevWallet(addr2.address)).to.be.reverted;
        });
        it("Can revoke ownership", async function () {
            await expect(furaddressbook.renounceOwnership()).to.not.be.reverted;
            expect(await furaddressbook.owner()).to.equal('0x0000000000000000000000000000000000000000');
            await expect(furaddressbook.addDevWallet(owner.address)).to.be.reverted;
        });
    });
    describe("Whitelist Deployment", function () {
        it("Whitelist has correct data at deployment", async function () {
            expect(whitelist.address).to.not.equal(0);
            expect(await whitelist.addressBook()).to.equal(furaddressbook.address);
            expect(await whitelist.paymentToken()).to.equal(usdc.address);
            expect(await whitelist.totalSupply()).to.equal(0);
            expect(await whitelist.price()).to.equal('2500000000000000000');
            expect(await whitelist.maxSupply()).to.equal(300);
        });
        it("Whitelist mints to dev wallets at deployment", async function () {
            await expect(furaddressbook.addDevWallet(owner.address)).to.not.be.reverted;
            await expect(furaddressbook.addDevWallet(addr1.address)).to.not.be.reverted;
            await expect(furaddressbook.addDevWallet(addr2.address)).to.not.be.reverted;
            let newwhitelist = await Whitelist.deploy(furaddressbook.address);
            expect(await newwhitelist.totalSupply()).to.equal(3);
            expect(await newwhitelist.balanceOf(owner.address)).to.equal(1);
            expect(await newwhitelist.balanceOf(addr1.address)).to.equal(1);
            expect(await newwhitelist.balanceOf(addr2.address)).to.equal(1);
        });
        it("Can buy whitelist NFTs", async function () {
            await usdc.mint(owner.address, '5000000000000000000');
            await usdc.approve(whitelist.address, '2500000000000000000');
            await expect(whitelist.buy()).to.not.be.reverted;
            expect(await usdc.balanceOf(whitelist.address)).to.equal('2500000000000000000');
        });
        it("Cannot buy multiple NFTs", async function () {
            await usdc.mint(owner.address, '5000000000000000000');
            await usdc.approve(whitelist.address, '2500000000000000000');
            await expect(whitelist.buy()).to.not.be.reverted;
            await usdc.approve(whitelist.address, '2500000000000000000');
            await expect(whitelist.buy()).to.be.reverted;
        });
    });
    describe("Token Deployment", function () {
        it("Token has correct data at deployment", async function () {
            expect(await furtoken.decimals()).to.equal(18);
            expect(await furtoken.mintedSupply()).to.equal(0);
            expect(await furtoken.mintingFinished()).to.equal(false);
            expect(await furtoken.name()).to.equal('Furio Token');
            expect(await furtoken.players()).to.equal(0);
            expect(await furtoken.symbol()).to.equal('$FUR');
            expect(await furtoken.taxRate()).to.equal(10);
            expect(await furtoken.totalSupply()).to.equal(0);
        });
    });
    describe("Token Admin Functions", function () {
        it("Owner can mint furtoken", async function () {
            await expect(furtoken.mint(owner.address, '100000000000000000')).to.not.be.reverted;
            expect(await furtoken.balanceOf(owner.address)).to.equal('100000000000000000');
            expect(await furtoken.mintedSupply()).to.equal('100000000000000000');
            expect(await furtoken.totalSupply()).to.equal('100000000000000000');
        });
        it("Non owner cannot mint furtoken", async function () {
            await expect(furtoken.connect(addr1).mint(addr1.address, '100000000000000000')).to.be.reverted;
            expect(await furtoken.balanceOf(addr1.address)).to.equal(0);
            expect(await furtoken.mintedSupply()).to.equal(0);
            expect(await furtoken.totalSupply()).to.equal(0);
        });
    });
    describe("Token User Functions", function () {
        it("Can approve, transfer, and transferFrom $FUR", async function () {
            // Mint 10 $FUR to owner
            await expect(furtoken.mint(owner.address, '100000000000000000')).to.not.be.reverted;
            expect(await furtoken.balanceOf(owner.address)).to.equal('100000000000000000');
            expect(await furtoken.totalTransactions()).to.equal(1);
            expect(await furtoken.players()).to.equal(1);
            // Transfer 1 $FUR to addr1
            await expect(furtoken.approve(owner.address, '10000000000000000')).to.not.be.reverted;
            expect(await furtoken.allowance(owner.address, owner.address)).to.equal('10000000000000000');
            await expect(furtoken.transfer(addr1.address, '10000000000000000')).to.not.be.reverted;
            expect(await furtoken.totalTransactions()).to.equal(2);
            expect(await furtoken.players()).to.equal(2);
            // Balance should be 1 - 10%
            expect(await furtoken.balanceOf(addr1.address)).to.equal('9000000000000000');
            // Owner can approve addr1 to spend tokens
            await expect(furtoken.approve(addr1.address, '10000000000000000')).to.not.be.reverted;
            expect(await furtoken.allowance(owner.address, addr1.address)).to.equal('10000000000000000');
            await expect(furtoken.connect(addr1).transferFrom(owner.address, addr1.address, '10000000000000000')).to.not.be.reverted;
            expect(await furtoken.totalTransactions()).to.equal(3);
            expect(await furtoken.players()).to.equal(2);
            // Balance should have increased by .9 $FUR
            expect(await furtoken.balanceOf(addr1.address)).to.equal('18000000000000000');
        });
    });
    describe("NFT Deployment", function () {
        it("NFT has correct data at deployment", async function () {
            expect(await nft.maxSupply()).to.equal(0);
            expect(await nft.name()).to.equal('Furio NFT');
            expect(await nft.owner()).to.equal(owner.address);
            expect(await nft.paymentToken()).to.equal(furtoken.address);
            expect(await nft.price()).to.equal('50000000000000000');
            expect(await nft.symbol()).to.equal('$FURNFT');
            expect(await nft.taxRate()).to.equal(10);
            expect(await nft.totalSupply()).to.equal(0);
        });
    });
    describe("NFT Admin Functions", function () {
        it("Owner can create NFT generation", async function () {
            await expect(nft.createGeneration(10000, 'https://furio.io/')).to.not.be.reverted;
            expect(await nft.maxSupply()).to.equal(10000);
        });
        it("Non owner cannot create NFT generation", async function () {
            await expect(nft.connect(addr1).createGeneration(10000, 'https://furio.io/')).to.be.reverted;
            expect(await nft.maxSupply()).to.equal(0);
        });
    });
    describe("NFT User Functions", function () {
        it("Can buy and sell NFTs with $FUR", async function () {
            await expect(nft.createGeneration(10000, 'https://furio.io/')).to.not.be.reverted;
            await expect(furtoken.mint(owner.address, '50000000000000000')).to.not.be.reverted;
            await expect(furtoken.approve(nft.address, '50000000000000000')).to.not.be.reverted;
            await expect(nft.buy(1)).to.not.be.reverted;
            expect(await furtoken.balanceOf(nft.address)).to.equal('45000000000000000');
            expect(await nft.balanceOf(owner.address)).to.equal(1);
            await expect(nft.sell(1)).to.not.be.reverted;
            expect(await furtoken.balanceOf(owner.address)).to.equal('40500000000000000');
            expect(await nft.balanceOf(owner.address)).to.equal(0);
        });
    });
});
