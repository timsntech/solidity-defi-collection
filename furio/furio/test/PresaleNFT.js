const { expect } = require("chai");
const { ethers } = require("hardhat");

const claimStart = "May 01 2022 19:59:30 GMT+0000";
const name = "Furio Presale NFT";
const presaleOneMax = 1;
const presaleOnePrice = "250000000";
const presaleOneStart = "Apr 19 2022 19:59:30 GMT+0000";
const presaleOneSupply = 300;
const presaleOneValue = "500000000000000000000";
const presaleThreeMax = 10;
const presaleThreePrice = "175000000";
const presaleThreeStart = "Apr 27 2022 19:59:30 GMT+0000";
const presaleThreeSupply = 1250;
const presaleThreeValue = "100000000000000000000";
const presaleTwoMax = 10;
const presaleTwoPrice = "150000000";
const presaleTwoStart = "Apr 23 2022 19:59:30 GMT+0000";
const presaleTwoSupply = 1250;
const presaleTwoValue = "100000000000000000000";
const symbol = "$FURPRESALE";
const ownableRevert = "Unauthorized";
const tokenURI = "ipfs://Qme28bzD3z119fAqBPXgpDb9Z79bqEheQjkejWsefcd4Gj/1";

describe("Presale NFT", function () {
    // RUN THIS BEFORE EACH TEST
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        // deploy USDC
        USDC = await ethers.getContractFactory("MockUSDC");
        usdc = await USDC.deploy();
        // deploy Token
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        // deploy treasury
        Treasury = await ethers.getContractFactory("Treasury");
        treasury = await Treasury.deploy();
        // deploy PresaleNFT
        PresaleNft = await ethers.getContractFactory("PresaleNft");
        presalenft = await PresaleNft.deploy();
        await presalenft.setPaymentToken(usdc.address);
        await presalenft.setFurioToken(token.address);
        await presalenft.setTreasury(treasury.address);
        await usdc.mint(owner.address, "1000000000000");
        await token.setPresaleNft(presalenft.address);
        await token.unpause();
    });
    // DEPLOYMENT
    it("Deployment has correct data", async function () {
        expect(await presalenft.claimStart()).to.equal(Math.floor(Date.parse(claimStart) / 1000));
        expect(await presalenft.furioToken()).to.equal(token.address);
        expect(await presalenft.name()).to.equal(name);
        expect(await presalenft.owner()).to.equal(owner.address);
        expect(await presalenft.paymentToken()).to.equal(usdc.address);
        expect(await presalenft.presaleOneMax()).to.equal(presaleOneMax);
        expect(await presalenft.presaleOnePrice()).to.equal(presaleOnePrice);
        expect(await presalenft.presaleOneStart()).to.equal(Math.floor(Date.parse(presaleOneStart) / 1000));
        expect(await presalenft.presaleOneSupply()).to.equal(presaleOneSupply);
        expect(await presalenft.presaleOneValue()).to.equal(presaleOneValue);
        expect(await presalenft.presaleThreeMax()).to.equal(presaleThreeMax);
        expect(await presalenft.presaleThreePrice()).to.equal(presaleThreePrice);
        expect(await presalenft.presaleThreeStart()).to.equal(Math.floor(Date.parse(presaleThreeStart) / 1000));
        expect(await presalenft.presaleThreeSupply()).to.equal(presaleThreeSupply);
        expect(await presalenft.presaleThreeValue()).to.equal(presaleThreeValue);
        expect(await presalenft.presaleTwoMax()).to.equal(presaleTwoMax);
        expect(await presalenft.presaleTwoPrice()).to.equal(presaleTwoPrice);
        expect(await presalenft.presaleTwoStart()).to.equal(Math.floor(Date.parse(presaleTwoStart) / 1000));
        expect(await presalenft.presaleTwoSupply()).to.equal(presaleTwoSupply);
        expect(await presalenft.presaleTwoValue()).to.equal(presaleTwoValue);
        expect(await presalenft.symbol()).to.equal(symbol);
        expect(await presalenft.treasury()).to.equal(treasury.address);
    });
    // ADMIN
    it("Can renounce ownership", async function () {
        await expect(presalenft.renounceOwnership()).to.not.be.reverted;
        expect(await presalenft.owner()).to.equal("0x0000000000000000000000000000000000000000");
    });
    it("Non admin cannot renounce ownership", async function () {
        await expect(presalenft.connect(addr1).renounceOwnership()).to.be.revertedWith(ownableRevert);
        expect(await presalenft.owner()).to.equal(owner.address);
    });
    it("Can set claim start", async function () {
        let newDate = Math.floor(Date.now() / 1000);
        await expect(presalenft.setClaimStart(newDate)).to.not.be.reverted;
        expect(await presalenft.claimStart()).to.equal(newDate);
    });
    it("Can set furio token", async function () {
        await expect(presalenft.setFurioToken(addr1.address)).to.not.be.reverted;
        expect(await presalenft.furioToken()).to.equal(addr1.address);
    });
    it("Non admin cannot set furio token", async function () {
        await expect(presalenft.connect(addr1).setFurioToken(addr1.address)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.furioToken()).to.equal(token.address);
    });
    it("Can set payment token", async function () {
        await expect(presalenft.setPaymentToken(addr1.address)).to.not.be.reverted;
        expect(await presalenft.paymentToken()).to.equal(addr1.address);
    });
    it("Non admin cannot set payment token", async function () {
        await expect(presalenft.connect(addr1).setPaymentToken(addr1.address)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.paymentToken()).to.equal(usdc.address);
    });
    it("Can set presale one max", async function () {
        await expect(presalenft.setPresaleOneMax(5)).to.not.be.reverted;
        expect(await presalenft.presaleOneMax()).to.equal(5);
    });
    it("Non admin cannot set presale one max", async function () {
        await expect(presalenft.connect(addr1).setPresaleOneMax(5)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleOneMax()).to.equal(presaleOneMax);
    });
    it("Can set presale one price", async function () {
        await expect(presalenft.setPresaleOnePrice(5000)).to.not.be.reverted;
        expect(await presalenft.presaleOnePrice()).to.equal(5000);
    });
    it("Non admin cannot set presale one price", async function () {
        await expect(presalenft.connect(addr1).setPresaleOnePrice(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleOnePrice()).to.equal(presaleOnePrice);
    });
    it("Can set presale one start", async function () {
        let newDate = Math.floor(Date.now() / 1000);
        await expect(presalenft.setPresaleOneStart(newDate)).to.not.be.reverted;
        expect(await presalenft.presaleOneStart()).to.equal(newDate);
    });
    it("Non admin cannot set presale one start", async function () {
        let newDate = Math.floor(Date.now() / 1000);
        await expect(presalenft.connect(addr1).setPresaleOneStart(newDate)).to.be.revertedWith(ownableRevert);
        expect(await presalenft.presaleOneStart()).to.equal(Math.floor(Date.parse(presaleOneStart) / 1000));
    });
    it("Can set presale one supply", async function () {
        await expect(presalenft.setPresaleOneSupply(5000)).to.not.be.reverted;
        expect(await presalenft.presaleOneSupply()).to.equal(5000);
    });
    it("Non admin cannot set presale one supply", async function () {
        await expect(presalenft.connect(addr1).setPresaleOneSupply(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleOneSupply()).to.equal(presaleOneSupply);
    });
    it("Can set presale one value", async function () {
        await expect(presalenft.setPresaleOneValue(5000)).to.not.be.reverted;
        expect(await presalenft.presaleOneValue()).to.equal(5000);
    });
    it("Non admin cannot set presale one value", async function () {
        await expect(presalenft.connect(addr1).setPresaleOneValue(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleOneValue()).to.equal(presaleOneValue);
    });
    it("Can set presale three max", async function () {
        await expect(presalenft.setPresaleThreeMax(5)).to.not.be.reverted;
        expect(await presalenft.presaleThreeMax()).to.equal(5);
    });
    it("Non admin cannot set presale three max", async function () {
        await expect(presalenft.connect(addr1).setPresaleThreeMax(5)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleThreeMax()).to.equal(presaleThreeMax);
    });
    it("Can set presale three price", async function () {
        await expect(presalenft.setPresaleThreePrice(5000)).to.not.be.reverted;
        expect(await presalenft.presaleThreePrice()).to.equal(5000);
    });
    it("Non admin cannot set presale three price", async function () {
        await expect(presalenft.connect(addr1).setPresaleThreePrice(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleThreePrice()).to.equal(presaleThreePrice);
    });
    it("Can set presale three start", async function () {
        let newDate = Math.floor(Date.now() / 1000);
        await expect(presalenft.setPresaleThreeStart(newDate)).to.not.be.reverted;
        expect(await presalenft.presaleThreeStart()).to.equal(newDate);
    });
    it("Non admin cannot set presale three start", async function () {
        let newDate2 = Math.floor(Date.now() / 1000);
        await expect(presalenft.connect(addr1).setPresaleThreeStart(newDate2)).to.be.revertedWith(ownableRevert);
        expect(await presalenft.presaleThreeStart()).to.equal(Math.floor(Date.parse(presaleThreeStart) / 1000));
    });
    it("Can set presale three supply", async function () {
        await expect(presalenft.setPresaleThreeSupply(5000)).to.not.be.reverted;
        expect(await presalenft.presaleThreeSupply()).to.equal(5000);
    });
    it("Non admin cannot set presale three supply", async function () {
        await expect(presalenft.connect(addr1).setPresaleThreeSupply(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleThreeSupply()).to.equal(presaleThreeSupply);
    });
    it("Can set presale three value", async function () {
        await expect(presalenft.setPresaleThreeValue(5000)).to.not.be.reverted;
        expect(await presalenft.presaleThreeValue()).to.equal(5000);
    });
    it("Non admin cannot set presale three value", async function () {
        await expect(presalenft.connect(addr1).setPresaleThreeValue(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleThreeValue()).to.equal(presaleThreeValue);
    });
    it("Can set presale two max", async function () {
        await expect(presalenft.setPresaleTwoMax(5)).to.not.be.reverted;
        expect(await presalenft.presaleTwoMax()).to.equal(5);
    });
    it("Non admin cannot set presale two max", async function () {
        await expect(presalenft.connect(addr1).setPresaleTwoMax(5)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleTwoMax()).to.equal(presaleTwoMax);
    });
    it("Can set presale two price", async function () {
        await expect(presalenft.setPresaleTwoPrice(5000)).to.not.be.reverted;
        expect(await presalenft.presaleTwoPrice()).to.equal(5000);
    });
    it("Non admin cannot set presale two price", async function () {
        await expect(presalenft.connect(addr1).setPresaleTwoPrice(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleTwoPrice()).to.equal(presaleTwoPrice);
    });
    it("Can set presale two start", async function () {
        let newDate = Math.floor(Date.now() / 1000);
        await expect(presalenft.setPresaleTwoStart(newDate)).to.not.be.reverted;
        expect(await presalenft.presaleTwoStart()).to.equal(newDate);
    });
    it("Non admin cannot set presale two start", async function () {
        let newDate2 = Math.floor(Date.now() / 1000);
        await expect(presalenft.connect(addr1).setPresaleTwoStart(newDate2)).to.be.revertedWith(ownableRevert);
        expect(await presalenft.presaleTwoStart()).to.equal(Math.floor(Date.parse(presaleTwoStart) / 1000));
    });
    it("Can set presale two supply", async function () {
        await expect(presalenft.setPresaleTwoSupply(5000)).to.not.be.reverted;
        expect(await presalenft.presaleTwoSupply()).to.equal(5000);
    });
    it("Non admin cannot set presale two supply", async function () {
        await expect(presalenft.connect(addr1).setPresaleTwoSupply(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleTwoSupply()).to.equal(presaleTwoSupply);
    });
    it("Can set presale two value", async function () {
        await expect(presalenft.setPresaleTwoValue(5000)).to.not.be.reverted;
        expect(await presalenft.presaleTwoValue()).to.equal(5000);
    });
    it("Non admin cannot set presale two value", async function () {
        await expect(presalenft.connect(addr1).setPresaleTwoValue(5000)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.presaleTwoValue()).to.equal(presaleTwoValue);
    });
    it("Can set token uri", async function () {
        await expect(presalenft.setTokenUri("https://www.google.com")).to.not.be.reverted;
    });
    it("Non admin cannot set token uri", async function () {
        await expect(presalenft.connect(addr1).setTokenUri("https://www.google.com")).to.be.revertedWith(ownableRevert)
    });
    it("Can set treasury", async function () {
        await expect(presalenft.setTreasury(addr1.address)).to.not.be.reverted;
        expect(await presalenft.treasury()).to.equal(addr1.address);
    });
    it("Non admin cannot set treasury", async function () {
        await expect(presalenft.connect(addr1).setTreasury(addr1.address)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.treasury()).to.equal(treasury.address);
    });
    it("Can transfer ownership", async function () {
        await expect(presalenft.transferOwnership(addr1.address)).to.not.be.reverted;
        expect(await presalenft.owner()).to.equal(addr1.address);
    });
    it("Non admin cannot transfer ownership", async function () {
        await expect(presalenft.connect(addr1).transferOwnership(addr1.address)).to.be.revertedWith(ownableRevert)
        expect(await presalenft.owner()).to.equal(owner.address);
    });
    // PRESALE
    it("Presale", async function () {
        // PS1
        // Buy should fail because it is not started yet
        await expect(usdc.approve(presalenft.address, presaleOnePrice)).to.not.be.reverted;
        await expect(presalenft.buy(1)).to.be.revertedWith("Presale has not started");
        // track spending
        let spent = BigInt("0");
        // start presale
        await expect(presalenft.setPresaleOneStart(Math.floor(Date.now() / 1000))).to.not.be.reverted;
        for(i = 1; i <= presaleOneMax; i ++) {
            await expect(usdc.approve(presalenft.address, presaleOnePrice)).to.not.be.reverted;
            await expect(presalenft.buy(1)).to.not.be.reverted;
            spent += BigInt(presaleOnePrice);
            expect(await usdc.balanceOf(treasury.address)).to.equal(spent);
            expect(await presalenft.ownerOf(i)).to.equal(owner.address);
            expect(await presalenft.tokenURI(i)).to.equal(tokenURI);
        }
        // trying to buy another should revert
        await expect(usdc.approve(presalenft.address, presaleOnePrice)).to.not.be.reverted;
        await expect(presalenft.buy(1)).to.be.revertedWith("Quantity is too high");
        // PS2
        await expect(presalenft.setPresaleTwoStart(Math.floor(Date.now() / 1000))).to.not.be.reverted;
        for(i = presaleOneSupply + 1; i <= presaleOneSupply + presaleTwoMax; i ++) {
            await expect(usdc.approve(presalenft.address, presaleTwoPrice)).to.not.be.reverted;
            await expect(presalenft.buy(1)).to.not.be.reverted;
            spent += BigInt(presaleTwoPrice);
            expect(await usdc.balanceOf(treasury.address)).to.equal(spent);
            expect(await presalenft.ownerOf(i)).to.equal(owner.address);
            expect(await presalenft.tokenURI(i)).to.equal(tokenURI);
        }
        expect(await presalenft.balanceOf(owner.address)).to.equal(presaleOneMax + presaleTwoMax);
        // trying to buy another should revert
        await expect(usdc.approve(presalenft.address, presaleTwoPrice)).to.not.be.reverted;
        await expect(presalenft.buy(1)).to.be.revertedWith("Quantity is too high");
        // PS3
        await expect(presalenft.setPresaleThreeStart(Math.floor(Date.now() / 1000))).to.not.be.reverted;
        for(i = presaleOneSupply + presaleTwoSupply + 1; i <= presaleOneSupply + presaleTwoSupply + presaleThreeMax; i ++) {
            await expect(usdc.approve(presalenft.address, presaleThreePrice)).to.not.be.reverted;
            await expect(presalenft.buy(1)).to.not.be.reverted;
            spent += BigInt(presaleThreePrice);
            expect(await usdc.balanceOf(treasury.address)).to.equal(spent);
            expect(await presalenft.ownerOf(i)).to.equal(owner.address);
            expect(await presalenft.tokenURI(i)).to.equal(tokenURI);
        }
        expect(await presalenft.balanceOf(owner.address)).to.equal(presaleOneMax + presaleTwoMax + presaleThreeMax);
        // trying to buy another should revert
        await expect(usdc.approve(presalenft.address, presaleThreePrice)).to.not.be.reverted;
        await expect(presalenft.buy(1)).to.be.revertedWith("Quantity is too high");
        // Let's claim our NFTs.
        await expect(presalenft.claim(1)).to.be.revertedWith("Claim has not started");
        await expect(presalenft.setClaimStart(Math.floor(Date.now() / 1000))).to.not.be.reverted;
        let tokenBalance = BigInt("0");
        for(i = 1; i <= presaleOneMax; i ++) {
            await expect(presalenft.claim(i)).to.not.be.reverted;
            tokenBalance += BigInt(presaleOneValue);
            expect(await token.balanceOf(owner.address)).to.equal(tokenBalance);
        }
        for(i = presaleOneSupply + 1; i <= presaleOneSupply + presaleTwoMax; i ++) {
            await expect(presalenft.claim(i)).to.not.be.reverted;
            tokenBalance += BigInt(presaleTwoValue);
            expect(await token.balanceOf(owner.address)).to.equal(tokenBalance);
        }
        for(i = presaleOneSupply + presaleTwoSupply + 1; i <= presaleOneSupply + presaleTwoSupply + presaleThreeMax; i ++) {
            await expect(presalenft.claim(i)).to.not.be.reverted;
            tokenBalance += BigInt(presaleThreeValue);
            expect(await token.balanceOf(owner.address)).to.equal(tokenBalance);
        }
    });
});

async function getBlockTimestamp () {
    return (await hre.ethers.provider.getBlock("latest")).timestamp;
}
