const { expect } = require("chai");
const Contract = require("../scripts/utils/Contract");


describe("FurBot", function () {
    let tx;

    // RUN THIS BEFORE EACH TEST
    beforeEach(async function () {
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        let contract = new Contract();
        // Deploy AddressBook
        addressbook = await contract.deploy("AddressBook");
        // Re instantiate contract with new addressbook
        contract = new Contract(addressbook.address);
        // Deploy USDC
        usdc = await contract.deploy("FakeToken", "payment", ["USD Coin", "USDC"]);
        // Deploy vault
        vault = await contract.deploy("Vault", "vault");
        // Deploy FurBot
        furbot = await contract.deploy("FurBot", "furbot");
        // Deploy FurMarket
        furmarket = await contract.deploy("FurMarket", "furmarket");
        // Setup FurBot
        tx = await furbot.setup();
        await tx.wait();
        // Create a generation
        expect(await furbot.createGeneration(5000, "https://example.com/image.jpg")).to.emit(furbot, "GenerationCreated").withArgs(1);
        // Setup FurMarket
        tx = await furmarket.setup();
        await tx.wait();
    });

    describe("Deployment", function () {
        it("Has the right name", async function () {
            expect(await furbot.name()).to.equal("FurBot");
        });
        it("Has the right symbol", async function () {
            expect(await furbot.symbol()).to.equal("$FURBOT");
        });
        it("Has the right total supply", async function () {
            expect(await furbot.totalSupply()).to.equal(0);
        });
        it("Has the right total investment", async function () {
            expect(await furbot.totalInvestment()).to.equal(0);
        });
        it("Has the right total dividends", async function () {
            expect(await furbot.totalDividends()).to.equal(0);
        });
    });

    describe("Admin", function () {
        it("Cannot create a generation from non admin user", async function () {
            await expect(furbot.connect(addr1).createGeneration(5000, "https://example.com/image.jpg")).to.be.revertedWith("Ownable: caller is not the owner");
        });
        it("Can create a sale", async function () {
            expect(await furbot.createSale(1, 200, 0, 0, false)).to.emit(furbot, "SaleCreated").withArgs(1);
        });
        it("Cannot create a sale from non admin user", async function () {
            await expect(furbot.connect(addr1).createSale(1, 200, 0, 0, false)).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });

    describe("User Functions", function() {
        it("Can buy and sell an NFT", async function () {
            // Create sale
            expect(await furbot.createSale(1, "200000000000000000000", 0, 0, false)).to.emit(furbot, "SaleCreated").withArgs(1);
            expect(await furbot.getActiveSale()).to.equal(1);
            expect(await furbot.getActiveSalePrice()).to.equal("200000000000000000000");
            // Buy NFTs
            await expect(usdc.connect(addr1).mint(1000)).to.not.be.reverted;
            await expect(usdc.connect(addr1).approve(furbot.address, "1000000000000000000000")).to.not.be.reverted;
            await expect(furbot.connect(addr1).buy(5)).to.not.be.reverted;
            // List first NFT for sale
            await expect(furbot.connect(addr1).approve(furmarket.address, 1)).to.not.be.reverted;
            await expect(furmarket.connect(addr1).listNft(furbot.address, 1, "300000000000000000000")).to.not.be.reverted;
            // Make offer on NFT
            await expect(usdc.connect(addr2).mint(100)).to.not.be.reverted;
            expect(await usdc.balanceOf(addr2.address)).to.equal("100000000000000000000");
            await expect(usdc.connect(addr2).approve(furmarket.address, "100000000000000000000")).to.not.be.reverted;
            expect(await usdc.allowance(addr2.address, furmarket.address)).to.equal("100000000000000000000");
            await expect(furmarket.connect(addr2).makeOffer(1, "100000000000000000000")).to.not.be.reverted;
            expect(await usdc.balanceOf(furmarket.address)).to.equal("100000000000000000000");
            expect(await usdc.balanceOf(addr2.address)).to.equal(0);
            // Rescind offer
            await expect(furmarket.connect(addr2).rescindOffer(1)).to.not.be.reverted;
            expect(await usdc.balanceOf(furmarket.address)).to.equal(0);
            expect(await usdc.balanceOf(addr2.address)).to.equal("100000000000000000000");
            // Make another offer
            await expect(usdc.connect(addr2).approve(furmarket.address, "100000000000000000000")).to.not.be.reverted;
            expect(await usdc.allowance(addr2.address, furmarket.address)).to.equal("100000000000000000000");
            await expect(furmarket.connect(addr2).makeOffer(1, "100000000000000000000")).to.not.be.reverted;
            expect(await usdc.balanceOf(furmarket.address)).to.equal("100000000000000000000");
            expect(await usdc.balanceOf(addr2.address)).to.equal(0);
            // Reject offer
            await expect(furmarket.connect(addr1).rejectOffer(1)).to.not.be.reverted;
            expect(await usdc.balanceOf(furmarket.address)).to.equal(0);
            expect(await usdc.balanceOf(addr2.address)).to.equal("100000000000000000000");
            // Make another offer
            await expect(usdc.connect(addr2).approve(furmarket.address, "100000000000000000000")).to.not.be.reverted;
            expect(await usdc.allowance(addr2.address, furmarket.address)).to.equal("100000000000000000000");
            await expect(furmarket.connect(addr2).makeOffer(1, "100000000000000000000")).to.not.be.reverted;
            expect(await usdc.balanceOf(furmarket.address)).to.equal("100000000000000000000");
            expect(await usdc.balanceOf(addr2.address)).to.equal(0);
            // Accept offer
            await expect(furmarket.connect(addr1).acceptOffer(1)).to.not.be.reverted;
            expect(await usdc.balanceOf(furmarket.address)).to.equal(0);
            expect(await usdc.balanceOf(addr1.address)).to.equal("100000000000000000000");
            expect(await furbot.ownerOf(1)).to.equal(addr2.address);
            // List another NFT
            await expect(furbot.connect(addr1).approve(furmarket.address, 2)).to.not.be.reverted;
            await expect(furmarket.connect(addr1).listNft(furbot.address, 2, "300000000000000000000")).to.not.be.reverted;
            // Buy NFT
            await expect(usdc.connect(addr2).mint(300)).to.not.be.reverted;
            await expect(usdc.connect(addr2).approve(furmarket.address, "300000000000000000000")).to.not.be.reverted;
            expect(await usdc.allowance(addr2.address, furmarket.address)).to.equal("300000000000000000000");
            await expect(furmarket.connect(addr2).buyNft(2)).to.not.be.reverted;
            expect(await usdc.balanceOf(addr1.address)).to.equal("400000000000000000000");
            expect(await furbot.ownerOf(2)).to.equal(addr2.address);
        });
    });

});

async function getBlockTimestamp () {
    return (await hre.ethers.provider.getBlock("latest")).timestamp;
}
