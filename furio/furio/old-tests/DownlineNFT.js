const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Downline NFT", function () {
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
});
