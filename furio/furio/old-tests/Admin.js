const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Admin", function () {
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
    it("Admin has correct data at deployment", async function () {
        expect(await admin.isTeamWallet(owner.address)).to.equal(true);
        expect(await admin.isTeamWallet(addr1.address)).to.equal(true);
        expect(await admin.isTeamWallet(addr2.address)).to.equal(false);
        expect(await admin.teamWalletCount()).to.equal(2);
        expect(await admin.paymentToken()).to.equal(mockusdc.address);
        expect(await admin.downlineNFT()).to.equal(downlinenft.address);
        expect(await admin.pool()).to.equal(pool.address);
        expect(await admin.presaleNFT()).to.equal(presalenft.address);
        expect(await admin.swap()).to.equal(swap.address);
        expect(await admin.token()).to.equal(token.address);
        expect(await admin.vault()).to.equal(vault.address);
    });
    it("Does not allow contract addresses to be changed", async function () {
        await expect(admin.setPaymentToken(addr2.address)).to.be.revertedWith("Payment token already set");
        await expect(admin.setDownlineNFT(addr2.address)).to.be.revertedWith("Downline NFT already set");
        await expect(admin.setPool(addr2.address)).to.be.revertedWith("Pool already set");
        await expect(admin.setPresaleNFT(addr2.address)).to.be.revertedWith("Presale NFT already set");
        await expect(admin.setSwap(addr2.address)).to.be.revertedWith("Swap already set");
        await expect(admin.setToken(addr2.address)).to.be.revertedWith("Token already set");
        await expect(admin.setVault(addr2.address)).to.be.revertedWith("Vault already set");
    });
    it("Admin can add a new team wallet", async function () {
        await expect(admin.addTeamWallet(addr2.address)).to.not.be.reverted;
        expect(await admin.teamWalletCount()).to.equal(3);
    });
    it("Non admin cannot add a new team wallet", async function () {
        await expect(admin.connect(addr1).addTeamWallet(addr2.address)).to.be.revertedWith("Unauthorized");
    });
    it("Admin cannot add the same team wallet more than once", async function () {
        await expect(admin.addTeamWallet(owner.address)).to.be.revertedWith("Address already exists");
    });
    it("Can grant admin role to address", async function () {
        await expect(admin.grantRole('0x0000000000000000000000000000000000000000000000000000000000000000', addr1.address)).to.not.be.reverted;
        expect(await admin.hasRole('0x0000000000000000000000000000000000000000000000000000000000000000', addr1.address)).to.equal(true);
        await expect(admin.addTeamWallet(addr2.address)).to.not.be.reverted;
    });
    it("Can revoke admin role to address", async function () {
        await expect(admin.grantRole('0x0000000000000000000000000000000000000000000000000000000000000000', addr1.address)).to.not.be.reverted;
        await expect(admin.renounceRole('0x0000000000000000000000000000000000000000000000000000000000000000', owner.address)).to.not.be.reverted;
        await expect(admin.addTeamWallet(addr2.address)).to.be.revertedWith("Unauthorized");
    });
});
