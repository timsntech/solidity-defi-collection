const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Presale NFT", function () {
    // RUN THIS BEFORE EACH TEST
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        // deploy MockUSDC
        MockUSDC = await ethers.getContractFactory("MockUSDC");
        mockusdc = await MockUSDC.deploy();
        await mockusdc.mint(owner.address, '10000000000000000000');
        // deploy Admin
        Admin = await ethers.getContractFactory("Admin");
        admin = await Admin.deploy();
        await admin.setPaymentToken(mockusdc.address);
        await admin.addTeamWallet(owner.address);
        await admin.addTeamWallet(addr1.address);
        // deploy Downline NFT
        DownlineNFT = await ethers.getContractFactory("DownlineNFT");
        downlinenft = await DownlineNFT.deploy();
        await admin.setDownlineNFT(downlinenft.address);
        await downlinenft.transferOwnership(admin.address);
        // deploy Pool
        Pool = await ethers.getContractFactory("Pool");
        pool = await Pool.deploy();
        await admin.setPool(pool.address);
        await pool.transferOwnership(admin.address);
        // deploy Presale NFT
        PresaleNFT = await ethers.getContractFactory("PresaleNFT");
        presalenft = await PresaleNFT.deploy();
        await admin.setPresaleNFT(presalenft.address);
        await presalenft.setPaymentToken(mockusdc.address);
        await presalenft.transferOwnership(admin.address);
        // deploy Swap
        Swap = await ethers.getContractFactory("Swap");
        swap = await Swap.deploy();
        await admin.setSwap(swap.address);
        await swap.transferOwnership(admin.address);
        // deploy Token
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await admin.setToken(token.address);
        await token.transferOwnership(admin.address);
        // deploy Vault
        Vault = await ethers.getContractFactory("Vault");
        vault = await Vault.deploy();
        await admin.setVault(vault.address);
        await vault.transferOwnership(admin.address);
    });
    // TESTS
    it("Presale NFT has correct data at deployment", async function () {
        expect(await presalenft.maxSupply()).to.equal(300);
        expect(await presalenft.name()).to.equal("FUR Presale NFT");
        expect(await presalenft.owner()).to.equal(admin.address);
        expect(await presalenft.paused()).to.equal(true);
        expect(await presalenft.paymentToken()).to.equal(mockusdc.address);
        expect(await presalenft.price()).to.equal("2500000000000000000");
        expect(await presalenft.symbol()).to.equal("FURPRESALE");
        expect(await presalenft.totalSupply()).to.equal(0);
    });
    it("Admin can unpause NFT", async function () {
        await expect(admin.unpausePresaleNFT()).to.not.be.reverted;
        expect(await presalenft.paused()).to.equal(false);
    });
    it("Non admins cannot unpause NFT", async function () {
        await expect(admin.connect(addr1).unpausePresaleNFT()).to.be.revertedWith("Unauthorized");
        expect(await presalenft.paused()).to.equal(true);
    });
    it("Can team wallet mint", async function () {
        await expect(admin.teamPresaleMint()).to.not.be.reverted;
        expect(await presalenft.totalSupply()).to.equal(2);
    });
    it("Can buy NFT", async function () {
        await expect(mockusdc.transfer(addr2.address, "5000000000000000000")).to.not.be.reverted;
        await expect(admin.unpausePresaleNFT()).to.not.be.reverted;
        await expect(mockusdc.connect(addr2).approve(presalenft.address, "2500000000000000000")).to.not.be.reverted;
        await expect(presalenft.connect(addr2).buy()).to.not.be.reverted;
        expect(await presalenft.totalSupply()).to.equal(1);
    });
    it("Cannot buy NFT when paused", async function () {
        await expect(mockusdc.transfer(addr2.address, "5000000000000000000")).to.not.be.reverted;
        await expect(mockusdc.connect(addr2).approve(presalenft.address, "2500000000000000000")).to.not.be.reverted;
        await expect(presalenft.connect(addr2).buy()).to.be.revertedWith("Contract is paused");
        expect(await presalenft.totalSupply()).to.equal(0);
    });
    it("Cannot buy more than one NFT", async function () {
        await expect(mockusdc.transfer(addr2.address, "5000000000000000000")).to.not.be.reverted;
        await expect(admin.unpausePresaleNFT()).to.not.be.reverted;
        await expect(mockusdc.connect(addr2).approve(presalenft.address, "2500000000000000000")).to.not.be.reverted;
        await expect(presalenft.connect(addr2).buy()).to.not.be.reverted;
        expect(await presalenft.totalSupply()).to.equal(1);
        await expect(mockusdc.connect(addr2).approve(presalenft.address, "2500000000000000000")).to.not.be.reverted;
        await expect(presalenft.connect(addr2).buy()).to.be.revertedWith("Address already purchased");
        expect(await presalenft.totalSupply()).to.equal(1);
    });
    it("Team address cannot buy an NFT if they already own one", async function () {
        await expect(admin.unpausePresaleNFT()).to.not.be.reverted;
        await expect(admin.teamPresaleMint()).to.not.be.reverted;
        await expect(mockusdc.approve(presalenft.address, "2500000000000000000")).to.not.be.reverted;
        await expect(presalenft.buy()).to.be.revertedWith("Address already purchased");
        expect(await presalenft.totalSupply()).to.equal(2);
    });
    it("Family address can mint while NFT is paused", async function () {
        await expect(admin.addFamilyWallet(addr2.address)).to.not.be.reverted;
        await expect(mockusdc.transfer(addr2.address, "2500000000000000000")).to.not.be.reverted;
        await expect(mockusdc.connect(addr2).approve(admin.address, "2500000000000000000")).to.be.not.be.reverted;
        await expect(admin.connect(addr2).familyPresaleMint()).to.not.be.reverted;
        expect(await presalenft.balanceOf(addr2.address)).to.equal(1);
    });
    it("Owner info has correct values", async function () {
        await expect(admin.unpausePresaleNFT()).to.not.be.reverted;
        await expect(admin.teamPresaleMint()).to.not.be.reverted;
        expect(await presalenft.balanceOf(owner.address)).to.equal(1);
        expect(await presalenft.balanceOf(addr1.address)).to.equal(1);
        expect(await presalenft.tokenOfOwnerByIndex(owner.address, 0)).to.equal(1);
        expect(await presalenft.tokenOfOwnerByIndex(addr1.address, 0)).to.equal(2);
        await expect(presalenft.tokenOfOwnerByIndex(owner.address, 1)).to.be.revertedWith("Owner index out of bounds");
        await expect(presalenft.tokenURI(1)).to.not.be.reverted;
        await expect(presalenft.tokenURI(3)).to.be.revertedWith("Token does not exist");
    });
});
