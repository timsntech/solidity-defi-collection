const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Treasury", function () {
    // RUN THIS BEFORE EACH TEST
    beforeEach(async function () {
        [owner, addr1, addr2, addr3, ...addrs] = await ethers.getSigners();
        // deploy USDC
        USDC = await ethers.getContractFactory("MockUSDC");
        usdc = await USDC.deploy();
        // deploy Treasury
        Treasury = await ethers.getContractFactory("Treasury");
        treasury = await Treasury.deploy();
    });
    // TESTS
    it("Ownership", async function () {
        // owner should be owner
        expect(await treasury.isOwner(owner.address)).to.equal(true);
        // addr1 should not be owner
        expect(await treasury.isOwner(addr1.address)).to.equal(false);
        // owner should be able to add addr1 as an owner
        await expect(treasury.addOwner(addr1.address)).to.emit(treasury, "VotePassed");
        expect(await treasury.isOwner(addr1.address)).to.equal(true);
        // addr2 should NOT be able to add an owner
        await expect(treasury.connect(addr2).addOwner(addr2.address)).to.be.revertedWith("Unauthorized");
        // addr1 SHOULD be able to start a vote to add an owner
        await expect(treasury.connect(addr1).addOwner(addr2.address)).to.not.be.reverted;
        // vote hasn't reached 75% of owners yet so addr2 should not be an owner
        expect(await treasury.isOwner(addr2.address)).to.equal(false);
        // owner should be able to also vote to add addr2
        await expect(treasury.addOwner(addr2.address)).to.not.be.reverted;
        // addr2 should now be an owner
        expect(await treasury.isOwner(addr2.address)).to.equal(true);
        // owner should be able to vote to add addr3
        await expect(treasury.addOwner(addr3.address)).to.not.be.reverted;
        // addr3 should not YET be an owner
        expect(await treasury.isOwner(addr3.address)).to.equal(false);
        // addr1 should be able to vote to add addr3
        await expect(treasury.connect(addr1).addOwner(addr3.address)).to.not.be.reverted;
        // addr3 should STILL not yet be an owner
        expect(await treasury.isOwner(addr3.address)).to.equal(false);
        // addr3 should NOT be able to vote to add himself
        await expect(treasury.connect(addr3).addOwner(addr3.address)).to.be.revertedWith("Unauthorized");
        // addr1 cannot vote again on adding addr3
        await expect(treasury.connect(addr1).addOwner(addr3.address)).to.be.revertedWith("Already voted");
        expect(await treasury.isOwner(addr3.address)).to.equal(false);
        // FINALLY, addr2 can also vote for addr3 making him an owner
        await expect(treasury.connect(addr2).addOwner(addr3.address)).to.emit(treasury, "OwnerAdded");
        expect(await treasury.isOwner(addr3.address)).to.equal(true);
        // owner can vote to remove addr1
        await expect(treasury.removeOwner(addr1.address)).to.not.be.reverted;
        // addr1 should still be an owner until 75% consensus is reached
        expect(await treasury.isOwner(addr1.address)).to.equal(true);
        // addr2 can vote to remove addr1
        await expect(treasury.connect(addr2).removeOwner(addr1.address)).to.not.be.reverted;
        // addr1 should still be an owner until 75% consensus is reached
        expect(await treasury.isOwner(addr1.address)).to.equal(true);
        // addr3 can vote to remove addr1
        await expect(treasury.connect(addr3).removeOwner(addr1.address)).to.emit(treasury, "OwnerRemoved");
        // addr1 should no longer be an owner
        expect(await treasury.ownerCount()).to.equal(3);
        expect(await treasury.isOwner(addr1.address)).to.equal(false);
    });
    it("Vote Percentage", async function () {
        // default value should be 75%
        expect(await treasury.votePercent()).to.equal(75);
        await expect(treasury.setVotePercent(50)).to.emit(treasury, "VotePassed");
        expect(await treasury.votePercent()).to.equal(50);
        await expect(treasury.setVotePercent(75)).to.emit(treasury, "VotePercentUpdated");
        // Make sure 75 is actually required
        expect(await treasury.addOwner(addr1.address)).to.emit(treasury, "OwnerAdded");
        // Now you need 2 votes to get >= 75%
        await expect(treasury.setVotePercent(50)).to.not.be.reverted;
        expect(await treasury.votePercent()).to.equal(75);
        await expect(treasury.connect(addr1).setVotePercent(50)).to.emit(treasury, "VotePassed");
        expect(await treasury.votePercent()).to.equal(50);
        // only 50% required so 1 vote should work
        await expect(treasury.setVotePercent(75)).to.emit(treasury, "VotePercentUpdated");
        expect(await treasury.votePercent()).to.equal(75);
    });
    it("Transfers", async function () {
        // mint to treasury and transfer to owner
        await expect(usdc.mint(treasury.address, '1000000')).to.not.be.reverted;
        // Treasury balance is correct
        expect(await usdc.balanceOf(treasury.address)).to.equal('1000000');
        // Should be able to transfer since there is only 1 owner... i.e. 100% vote
        await expect(treasury.transfer(usdc.address, owner.address, '1000000')).to.emit(treasury, "Transfer");
        // Now owner has balance and treasury does not
        expect(await usdc.balanceOf(owner.address)).to.equal('1000000');
        expect(await usdc.balanceOf(treasury.address)).to.equal('0');
        // add an owner then require vote to transfer
        await expect(treasury.addOwner(addr1.address)).to.not.be.reverted;
        await expect(usdc.mint(treasury.address, '1000000')).to.not.be.reverted;
        // treasury has balance again
        expect(await usdc.balanceOf(treasury.address)).to.equal('1000000');
        // owner has previous balance of 1000000
        expect(await usdc.balanceOf(owner.address)).to.equal('1000000');
        // vote to transfer... should not actually transfer because this is only 50% of votes
        await expect(treasury.transfer(usdc.address, owner.address, '1000000')).to.not.be.reverted;
        // treasury balance is the same
        expect(await usdc.balanceOf(treasury.address)).to.equal('1000000');
        // owner balance is the same
        expect(await usdc.balanceOf(owner.address)).to.equal('1000000');
        // 2nd vote gets us over 75% so this should emit
        await expect(treasury.connect(addr1).transfer(usdc.address, owner.address, '1000000')).to.emit(treasury, "Transfer");
        // treasury balance should now be 0
        expect(await usdc.balanceOf(treasury.address)).to.equal('0');
        // owner balance should now be 2000000
        expect(await usdc.balanceOf(owner.address)).to.equal('2000000');
    });
});
