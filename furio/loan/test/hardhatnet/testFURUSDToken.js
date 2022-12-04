const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const { toBigNum, fromBigNum } = require("./utils.js");

// var ERC20ABI = artifacts.readArtifactSync("contracts/Mock/FakeUsdc.sol:IERC20").abi;
// var pairContract;
var exchangeRouter;
var exchangeFactory;
let wBNB;

let token;

var owner;
var user1;
var user2;

var vaultManagerAddress = "0x71d51C76121dD6c0bA30d2C57802c6bF097EcAD8";
var stabilityPoolAddress = "0xB1C87ECE86a0ED0353f287afB1EE88A5032797DB";
var borrowerOperationsAddress = "0xE2B4ECdE7f36c46c0Bf34E6890290412E29552a8";

describe("Create Account and wallet", () => {
  it("Create Wallet", async () => {
    [owner, user1, user2] = await ethers.getSigners();
    console.log("owner", owner.address);
    console.log("user1", user1.address);
    console.log("user2", user2.address);
  });
});

describe("Contracts deploy", () => {
  // ------ dex deployment ------- //
  it("Factory deploy", async () => {
    const Factory = await ethers.getContractFactory("PancakeFactory");
    exchangeFactory = await Factory.deploy(owner.address);
    await exchangeFactory.deployed();
    console.log(await exchangeFactory.INIT_CODE_PAIR_HASH());
    console.log("Factory", exchangeFactory.address);
  });

  it("WBNB deploy", async () => {
    const WBNB_ = await ethers.getContractFactory("WBNB");
    wBNB = await WBNB_.deploy();
    await wBNB.deployed();
    console.log("WBNB", wBNB.address);
  });

  it("Router deploy", async () => {
    const Router = await ethers.getContractFactory("PancakeRouter");
    exchangeRouter = await Router.deploy(exchangeFactory.address, wBNB.address);
    console.log("Router", exchangeRouter.address);
  });

  it("Token deploy", async () => {
    Token = await ethers.getContractFactory("FURUSDToken");
    token = await upgrades.deployProxy(Token, [
      vaultManagerAddress,
      stabilityPoolAddress,
      borrowerOperationsAddress,
      toBigNum("200000")
    ]);
    await token.deployed();
    console.log("token", token.address);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////     test  ///////////////////////////////////////////////////

describe("test ", () => {
  it("check initial balances", async () => {
    await checkBNBBalance();
    await checkTokenBalance();
  });

  it("creat pool", async () => {
    var tx = await token.mint(owner.address, toBigNum("1000000000", 18));
    await tx.wait();

    var tx = await token.approve(
      exchangeRouter.address,
      toBigNum("500000", 18)
    );
    await tx.wait();

    var tx = await exchangeRouter.addLiquidityETH(
      token.address,
      toBigNum("500000", 18),
      0,
      0,
      owner.address,
      "1234325432314321",
      { value: ethers.utils.parseUnits("5000", 18) }
    );
    await tx.wait();

    await checkBNBBalance();
    await checkTokenBalance();

    // var pair = await exchangeFactory.getPair(wBNB.address, token.address);
    // pairContract = new ethers.Contract(pair, ERC20ABI, owner);
    // console.log("pair address", pairContract.address);
  });

  it("owner transfer 10000 token to user1", async () => {
    var tx = await token.transfer(user1.address, toBigNum("10000", 18));
    await tx.wait();
  });

  it("owner transfer 10000 token to user2", async () => {
    var tx = await token.transfer(user2.address, toBigNum("10000", 18));
    await tx.wait();
  });

  it("user1 transfer 5000 token to user2", async () => {
    var tx = await token
      .connect(user1)
      .transfer(user2.address, toBigNum("5000", 18));
    await tx.wait();
  });

  it("check balances", async () => {
    // await checkBNBBalance();
    await checkTokenBalance();
  });

  it("user2 sell 10000 tokens", async () => {
    var tx = await token
      .connect(user2)
      .approve(exchangeRouter.address, toBigNum("10000", 18));
    await tx.wait();

    var tx = await exchangeRouter
      .connect(user2)
      .swapExactTokensForETHSupportingFeeOnTransferTokens(
        toBigNum("10000", 18),
        0,
        [token.address, wBNB.address],
        user2.address,
        "124325454365443"
      );
    await tx.wait();
  });

  it("user1 buy with 1 BNB", async () => {
    var tx = await exchangeRouter
      .connect(user1)
      .swapExactETHForTokensSupportingFeeOnTransferTokens(
        0,
        [wBNB.address, token.address],
        user1.address,
        "341443532432123",
        { value: ethers.utils.parseUnits("1", 18) }
      );
    await tx.wait();
  });

  it("user2 buy with 1 BNB", async () => {
    var tx = await exchangeRouter
      .connect(user2)
      .swapExactETHForTokensSupportingFeeOnTransferTokens(
        0,
        [wBNB.address, token.address],
        user1.address,
        "341443532432123",
        { value: ethers.utils.parseUnits("1", 18) }
      );
    await tx.wait();
  });

  it("user2 sell 10 tokens", async () => {
    var tx = await token
      .connect(user2)
      .approve(exchangeRouter.address, toBigNum("10", 18));
    await tx.wait();

    var tx = await exchangeRouter
      .connect(user2)
      .swapExactTokensForETHSupportingFeeOnTransferTokens(
        toBigNum("10", 18),
        0,
        [token.address, wBNB.address],
        user2.address,
        "124325454365443"
      );
    await tx.wait();
  });

  it("user2 buy with 1 BNB", async () => {
    var tx = await exchangeRouter
      .connect(user2)
      .swapExactETHForTokensSupportingFeeOnTransferTokens(
        0,
        [wBNB.address, token.address],
        user1.address,
        "341443532432123",
        { value: ethers.utils.parseUnits("1", 18) }
      );
    await tx.wait();
  });

  it("check balances", async () => {
    // await checkBNBBalance();
    await checkTokenBalance();
  });
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkBNBBalance = async () => {
  console.log(
    "owner wBNB balance",
    fromBigNum(await ethers.provider.getBalance(owner.address), 18)
  );
  console.log(
    "user1 wBNB balance",
    fromBigNum(await ethers.provider.getBalance(user1.address), 18)
  );
  console.log(
    "user2 wBNB balance",
    fromBigNum(await ethers.provider.getBalance(user2.address), 18)
  );
};

const checkTokenBalance = async () => {
  console.log(
    "owner Token balance",
    fromBigNum(await token.balanceOf(owner.address), 18)
  );
  console.log(
    "user1 Token balance",
    fromBigNum(await token.balanceOf(user1.address), 18)
  );
  console.log(
    "user2 Token balance",
    fromBigNum(await token.balanceOf(user2.address), 18)
  );
};
