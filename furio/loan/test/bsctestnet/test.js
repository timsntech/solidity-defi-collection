const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const EthCrypto = require("eth-crypto");
const keccak256 = require("keccak256");
const { toBigNum, fromBigNum } = require("./utils.js");
const { BigNumber } = require("ethers");

var ERC20ABI = artifacts.readArtifactSync("contracts/Mock/FakeUsdc.sol:IERC20").abi;

var exchangeRouter;
var exchangeFactory;
let wBNB;

let furFiToken;
let furUSDToken;
let loanToken;
let borrowerOperations;
let vaultManager;
let stabilityPool;
let activePool;
let defaultPool;
let collSurplusPool;
let sortedVaults;
let priceFeed;
let hintHelpers;
let multiVaultGetter;
let loanStaking;
let communityIssuance;

var owner;
var user1;
var user2;
var user3;
var user4;
var user5;
var user6;

//For LOANToken deployment
var bountyAddress = "0xd3D8563D443CdC40719068E0b8722a2061928Fc2";
//For furFiToken deployment
var developmentFounder = "0xd3D8563D443CdC40719068E0b8722a2061928Fc2";
var advisor = "0x71d51C76121dD6c0bA30d2C57802c6bF097EcAD8";
var marketingReservesPool = "0xB1C87ECE86a0ED0353f287afB1EE88A5032797DB";
var devTeam = "0xE2B4ECdE7f36c46c0Bf34E6890290412E29552a8";

var ZeroAddress = "0x0000000000000000000000000000000000000000";

var deployedAddress = {
  exchangeFactory: "0xb7926c0430afb07aa7defde6da862ae0bde767bc",
  wBNB: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
  exchangeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  furFiToken: "0x74Af5b43A9377f88951fBCD21f59EE94a73a2044",
  communityIssuance: "0x50499D27E1AD2cA815578d9A1bebB6d6382e73ec",
  loanStaking: "0xd974Af24259a5Cbf351aa186138007CDEE49A866",
  loanToken: "0xAa4Bc1bc1F43E4398187BA16e7FA106b047E7a16",
  borrowerOperations: "0x2ed56102067aD5c76ABb05d03439034a6288A066",
  vaultManager: "0x5E1B55350B4fbe66E88f139d50d3757cc53AC69b",
  stabilityPool: "0x416cCBB6b6AA76B21B809EA66D8569D77F29524B",
  furUSDToken: "0xf2893D682158B545a45e5f5Ba959073E759C7dDB",
  activePool: "0x9D1d8C349D8D256b6DDa1cb1B44a6A3D0f8874f5",
  defaultPool: "0xD836164D9190b339eDB5b83Fb8bFf2BFb2d54fc9",
  collSurplusPool: "0x7156DBa184088250e44A671a6AE380359cD7492C",
  sortedVaults: "0x646caB55D80B12d8d4982140Ded73049179A6932",
  hintHelpers: "0x99541170dDa5cf7c5bdFCd4849B7F8C122438Ef3",
  multiVaultGetter: "0x2C66609CEaD0e9132E21ab25AadF4dD9AEb632BC",
  priceFeed: "0x36F65DDdbb8362bCdECA16F992Bdb3412C3BbA0e",
  averagePriceOracle: "0x4f9151707Bfa7585bE19d26e871eF8212d263528",
  priceAggregator: "0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526"  //from chainlink
};

var LPAddresses = {
  BNB_FURFI: "0x220661D5585abcfc7F16269b088168a8D9034979",
  BNB_FURUSD: "0xEdfDa535701e32fFBa1726b98B2fd111e844d6fB",
  BNB_LOAN: "0x42eBb56770b680c46a62F7828D8938d945e93B97"
} 

describe("Create Account and wallet", () => {
  it("Create Wallet", async () => {
    [owner, user1, user2, user3, user4, user5, user6] = await ethers.getSigners();
    console.log("owner", owner.address);
    console.log("user1", user1.address);
    console.log("user2", user2.address);
    console.log("user3", user3.address);
    console.log("user4", user4.address);
    console.log("user5", user5.address);
    console.log("user6", user6.address);
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       dex deployment     ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

describe("Dex contracts", () => {
  it("Factory", async () => {
    const Factory = await ethers.getContractFactory("PancakeFactory");
    exchangeFactory = Factory.attach(deployedAddress.exchangeFactory);
    console.log("Factory", exchangeFactory.address);
  });

  it("WBNB", async () => {
    const WBNB_ = await ethers.getContractFactory("WBNB");
    wBNB = WBNB_.attach(deployedAddress.wBNB);
    console.log("WBNB", wBNB.address);
  });

  it("Router", async () => {
    const Router = await ethers.getContractFactory("PancakeRouter");
    exchangeRouter = Router.attach(deployedAddress.exchangeRouter);
    console.log("Router", exchangeRouter.address);
  });
});

// /////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////   Contracts Deployment //////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////////////
describe("Contract deployment and initial settings", () => {

  //Already deployed from FurioFinance

  it("FURFI Token deploy", async () => {
    const FURFIToken = await ethers.getContractFactory("FurioFinanceToken");
    furFiToken = FURFIToken.attach(deployedAddress.furFiToken);
    console.log("furFiToken", furFiToken.address);
  });

  it("creat BNB-FurFi pool", async () => {
    //   var tx = await furFiToken.approve(
    //     exchangeRouter.address,
    //     toBigNum("10000")
    //   );
    //   await tx.wait();

    //   var tx = await exchangeRouter.addLiquidityETH(
    //     furFiToken.address,
    //     toBigNum("10000"),
    //     0,
    //     0,
    //     owner.address,
    //     "1234325432314321",
    //     { value: toBigNum("8") }
    //   );
    //   await tx.wait();
    // var pair = await exchangeFactory.getPair(wBNB.address, furFiToken.address);
    // pairContract = new ethers.Contract(pair, ERC20ABI, owner);
    // console.log("BNB_FURFI pair address", pairContract.address);
  });

  it("AveragePriceOracle deploy", async () => {
    const AveragePriceOracle = await ethers.getContractFactory("AveragePriceOracle");
    averagePriceOracle = AveragePriceOracle.attach(deployedAddress.averagePriceOracle);
    console.log("averagePriceOracle", averagePriceOracle.address);

    // AveragePriceOracle
    // var tx = await averagePriceOracle.setAddresses(
    //   furFiToken.address,
    //   LPAddresses.BNB_FURFI
    // );
    // await tx.wait();
  });

  // For Liquity

  it("CommunityIssuance deploy", async () => {
    const CommunityIssuance = await ethers.getContractFactory("CommunityIssuance");
    communityIssuance = CommunityIssuance.attach(deployedAddress.communityIssuance);
    console.log("communityIssuance", communityIssuance.address);
  });

  it("LoanStaking deploy", async () => {
    const LoanStaking = await ethers.getContractFactory("LOANStaking");
    loanStaking = LoanStaking.attach(deployedAddress.loanStaking);
    console.log("loanStaking", loanStaking.address);
  });

  it("LOAN Token deploy", async () => {
    const LoanToken = await ethers.getContractFactory("LOANToken");
    loanToken = LoanToken.attach(deployedAddress.loanToken);
    console.log("loanToken", loanToken.address);
  });

  it("BorrowerOperations deploy", async () => {
    const BorrowerOperations = await ethers.getContractFactory("BorrowerOperations");
    borrowerOperations = BorrowerOperations.attach(deployedAddress.borrowerOperations);
    console.log("borrowerOperations", borrowerOperations.address);
  });

  it("VaultManager deploy", async () => {
    const VaultManager = await ethers.getContractFactory("VaultManager");
    vaultManager = VaultManager.attach(deployedAddress.vaultManager);
    console.log("vaultManager", vaultManager.address);
  });

  it("StabilityPool deploy", async () => {
    const StabilityPool = await ethers.getContractFactory("StabilityPool");
    stabilityPool = StabilityPool.attach(deployedAddress.stabilityPool);
    console.log("stabilityPool", stabilityPool.address);
  });

  it("FURUSD token deploy", async () => {
    const FurUSDToken = await ethers.getContractFactory("FURUSDToken");
    furUSDToken = FurUSDToken.attach(deployedAddress.furUSDToken);
    console.log("furUSDToken", furUSDToken.address);
  });

  it("ActivePool deploy", async () => {
    const ActivePool = await ethers.getContractFactory("ActivePool");
    activePool = ActivePool.attach(deployedAddress.activePool);
    console.log("activePool", activePool.address);
  });

  it("DefaultPool deploy", async () => {
    const DefaultPool = await ethers.getContractFactory("DefaultPool");
    defaultPool = DefaultPool.attach(deployedAddress.defaultPool);
    console.log("defaultPool", defaultPool.address);
  });

  it("CollSurplusPool deploy", async () => {
    const CollSurplusPool = await ethers.getContractFactory("CollSurplusPool");
    collSurplusPool = CollSurplusPool.attach(deployedAddress.collSurplusPool);
    console.log("collSurplusPool", collSurplusPool.address);
  });

  it("SortedVaults deploy", async () => {
    const SortedVaults = await ethers.getContractFactory("SortedVaults");
    sortedVaults = SortedVaults.attach(deployedAddress.sortedVaults);
    console.log("sortedVaults", sortedVaults.address);
  });

  it("HintHelpers deploy", async () => {
    const HintHelpers = await ethers.getContractFactory("HintHelpers");
    hintHelpers = HintHelpers.attach(deployedAddress.hintHelpers);
    console.log("hintHelpers", hintHelpers.address);
  });

  it("MultiVaultGetter deploy", async () => {
    const MultiVaultGetter = await ethers.getContractFactory("MultiVaultGetter");
    multiVaultGetter = MultiVaultGetter.attach(deployedAddress.multiVaultGetter);
    console.log("multiVaultGetter", multiVaultGetter.address);
  });

  it("PriceFeed deploy", async () => {
    const PriceFeed = await ethers.getContractFactory("PriceFeed");
    // priceFeed = await upgrades.deployProxy(PriceFeed);
    // await priceFeed.deployed();
    priceFeed = PriceFeed.attach(deployedAddress.priceFeed);
    console.log("priceFeed", priceFeed.address);
  });

  it("Initial settings", async () => {
  //   //CommunityIssuance
  //   var tx = await communityIssuance.setAddresses(
  //     loanToken.address,
  //     stabilityPool.address
  //   );
  //   await tx.wait();
  //   //LoanStaking
  //   var tx = await loanStaking.setAddresses(
  //     loanToken.address,
  //     furUSDToken.address,
  //     vaultManager.address,
  //     borrowerOperations.address,
  //     activePool.address,
  //     furFiToken.address
  //   );
  //   await tx.wait();
    // //BorrowerOperations
    // var tx = await borrowerOperations.setAddresses(
    //   vaultManager.address,
    //   activePool.address,
    //   defaultPool.address,
    //   stabilityPool.address,
    //   collSurplusPool.address,
    //   priceFeed.address,
    //   sortedVaults.address,
    //   furUSDToken.address,
    //   loanStaking.address,
    //   furFiToken.address
    // );
    // await tx.wait();
    // //VaultManager
    // var tx = await vaultManager.setAddresses(
    //   borrowerOperations.address,
    //   activePool.address,
    //   defaultPool.address,
    //   stabilityPool.address,
    //   collSurplusPool.address,
    //   priceFeed.address,
    //   furUSDToken.address,
    //   sortedVaults.address,
    //   loanToken.address,
    //   loanStaking.address
    // );
    // await tx.wait();
    // //StabilityPool
    // var tx = await stabilityPool.setAddresses(
    //   borrowerOperations.address,
    //   vaultManager.address,
    //   activePool.address,
    //   furUSDToken.address,
    //   sortedVaults.address,
    //   priceFeed.address,
    //   communityIssuance.address,
    //   furFiToken.address
    // );
    // await tx.wait();
  //   //ActivePool
  //   var tx = await activePool.setAddresses(
  //     borrowerOperations.address,
  //     vaultManager.address,
  //     stabilityPool.address,
  //     defaultPool.address,
  //     furFiToken.address
  //   );
  //   await tx.wait();
  //   //DefaultPool
  //   var tx = await defaultPool.setAddresses(
  //     vaultManager.address,
  //     activePool.address,
  //     furFiToken.address
  //   );
  //   await tx.wait();
  //   //CollsurplusPool
  //   var tx = await collSurplusPool.setAddresses(
  //     borrowerOperations.address,
  //     vaultManager.address,
  //     activePool.address,
  //     furFiToken.address
  //   );
  //   await tx.wait();
  //   //SortedVaults
  //   var tx = await sortedVaults.setParams(
  //     "100",
  //     vaultManager.address,
  //     borrowerOperations.address
  //   );
  //   await tx.wait();
  //   //HintHelpers
  //   var tx = await hintHelpers.setAddresses(
  //     sortedVaults.address,
  //     vaultManager.address
  //   );
  //   await tx.wait();
  //   //MultiVaultGetter
  //   var tx = await multiVaultGetter.setContract(
  //     vaultManager.address,
  //     sortedVaults.address
  //   )
  //   await tx.wait();
    // //PriceFeed
    // var tx = await priceFeed.setAddresses(
    //   deployedAddress.priceAggregator,
    //   averagePriceOracle.address
    // )
    // await tx.wait();
  });
});

describe("Create token pools", () => {

  it("creat BNB-FURUSD pool", async () => {
    // var tx = await furUSDToken.approve(
    //   exchangeRouter.address,
    //   toBigNum("100000")
    // );
    // await tx.wait();

    // var tx = await exchangeRouter.addLiquidityETH(
    //   furUSDToken.address,
    //   toBigNum("100000"),
    //   0,
    //   0,
    //   owner.address,
    //   "1234325432314321",
    //   { value: toBigNum("1") }
    // );
    // await tx.wait();
    // var pair = await exchangeFactory.getPair(wBNB.address, furUSDToken.address);
    // pairContract = new ethers.Contract(pair, ERC20ABI, owner);
    // console.log("BNB_FURUSD pair address", pairContract.address);
  });

  it("creat BNB-LOANToken pool", async () => {
    // var tx = await loanToken.mint(owner.address, toBigNum("300000"));
    // await tx.wait();
    
    // var tx = await loanToken.approve(
    //   exchangeRouter.address,
    //   toBigNum("200000")
    // );
    // await tx.wait();

    // var tx = await exchangeRouter.addLiquidityETH(
    //   loanToken.address,
    //   toBigNum("200000"),
    //   0,
    //   0,
    //   owner.address,
    //   "1234325432314321",
    //   { value: toBigNum("0.5") }
    // );
    // await tx.wait();

    // var pair = await exchangeFactory.getPair(wBNB.address, loanToken.address);
    // pairContract = new ethers.Contract(pair, ERC20ABI, owner);
    // console.log("BNB_LOAN pair address", pairContract.address);
  });

});

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////                               test                                /////////////
/////////////////////////////////////////////////////////////////////////////////////////////

describe("test", () => {
  it("owner LOAN token staking", async () => {
    // var tx = await loanStaking.stake(toBigNum("200"));
    // await tx.wait();
  })

  it("send 1000 FURFI tokens to users", async () => {
    // var tx = await furFiToken.transfer(user1.address, toBigNum("1000"));
    // await tx.wait();
    // var tx = await furFiToken.transfer(user2.address, toBigNum("1000"));
    // await tx.wait();
    // var tx = await furFiToken.transfer(user3.address, toBigNum("1000"));
    // await tx.wait();
    // var tx = await furFiToken.transfer(user4.address, toBigNum("1000"));
    // await tx.wait();
    // var tx = await furFiToken.transfer(user5.address, toBigNum("1000"));
    // await tx.wait();
  })

  it("user1 create Vault with 80 furFi token, borrow 10 FURUSD", async () => {

    // var tx = await furFiToken.connect(user1).approve(borrowerOperations.address, toBigNum("80"));
    // await tx.wait();

    // const FURFIColl = toBigNum("80");
    // const FURUSDAmount = toBigNum("10");

    // // Call deployed vaultManager contract to read latest borrowing fee
    // const expectedFee = await vaultManager.connect(user1).getBorrowingFeeWithDecay(FURUSDAmount);

    // // Total debt of the new vault = FURUSD amount drawn, plus fee
    // const expectedDebt = FURUSDAmount.add(expectedFee);

    // // Get the nominal NICR of the new vault
    // const _1e20 = toBigNum("100");
    // let NICR = FURFIColl.mul(_1e20).div(expectedDebt);

    // // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
    // // to get an approx. hint that is close to the right position.
    // let numVaults = await sortedVaults.connect(user1).getSize();
    // let numTrials = numVaults.mul(15);
    // let { 0: approxHint } = await hintHelpers.connect(user1).getApproxHint(NICR, numTrials, 42);  // random seed of 42

    // // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
    // let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user1).findInsertPosition(NICR, approxHint, approxHint);

    // // Finally, call openVault with the exact upperHint and lowerHint
    // const maxFee = toBigNum("5", 16); // Slippage protection: 5%

    // var tx = await borrowerOperations.connect(user1).openVault(maxFee, FURFIColl, FURUSDAmount, upperHint, lowerHint);
    // await tx.wait();

  })

  // it("user2 create Vault with 30 furFi token, borrow 3000 FURUSD", async () => {
  //   var tx = await furFiToken.connect(user2).approve(borrowerOperations.address, toBigNum("30"));
  //   await tx.wait();

  //   const FURFIColl = toBigNum("30");
  //   const FURUSDAmount = toBigNum("3000");

  //   // Call deployed vaultManager contract to read latest borrowing fee
  //   const expectedFee = await vaultManager.connect(user2).getBorrowingFeeWithDecay(FURUSDAmount);

  //   // Total debt of the new vault = FURUSD amount drawn, plus fee
  //   const expectedDebt = FURUSDAmount.add(expectedFee);

  //   // Get the nominal NICR of the new vault
  //   const _1e20 = toBigNum("100");
  //   let NICR = FURFIColl.mul(_1e20).div(expectedDebt);

  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user2).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user2).getApproxHint(NICR, numTrials, 42);  // random seed of 42

  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user2).findInsertPosition(NICR, approxHint, approxHint);

  //   // Finally, call openVault with the exact upperHint and lowerHint
  //   const maxFee = toBigNum("5", 16); // Slippage protection: 5%

  //   var tx = await borrowerOperations.connect(user2).openVault(maxFee, FURFIColl, FURUSDAmount, upperHint, lowerHint);
  //   await tx.wait();

  // })

  // it("user3 create Vault with 50 furFi token, borrow 6000 FURUSD", async () => {
  //   var tx = await furFiToken.connect(user3).approve(borrowerOperations.address, toBigNum("50"));
  //   await tx.wait();

  //   const FURFIColl = toBigNum("50");
  //   const FURUSDAmount = toBigNum("6000");

  //   // Call deployed vaultManager contract to read latest borrowing fee
  //   const expectedFee = await vaultManager.connect(user3).getBorrowingFeeWithDecay(FURUSDAmount);

  //   // Total debt of the new vault = FURUSD amount drawn, plus fee
  //   const expectedDebt = FURUSDAmount.add(expectedFee);

  //   // Get the nominal NICR of the new vault
  //   const _1e20 = toBigNum("100");
  //   let NICR = FURFIColl.mul(_1e20).div(expectedDebt);

  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user3).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user3).getApproxHint(NICR, numTrials, 42);  // random seed of 42

  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user3).findInsertPosition(NICR, approxHint, approxHint);

  //   // Finally, call openVault with the exact upperHint and lowerHint
  //   const maxFee = toBigNum("5", 16); // Slippage protection: 5%

  //   var tx = await borrowerOperations.connect(user3).openVault(maxFee, FURFIColl, FURUSDAmount, upperHint, lowerHint);
  //   await tx.wait();

  // })

  // it("user4 create Vault with 50 furFi token, borrow 4000 FURUSD", async () => {
  //   var tx = await furFiToken.connect(user4).approve(borrowerOperations.address, toBigNum("50"));
  //   await tx.wait();

  //   const FURFIColl = toBigNum("50");
  //   const FURUSDAmount = toBigNum("4000");

  //   // Call deployed vaultManager contract to read latest borrowing fee
  //   const expectedFee = await vaultManager.connect(user4).getBorrowingFeeWithDecay(FURUSDAmount);

  //   // Total debt of the new vault = FURUSD amount drawn, plus fee
  //   const expectedDebt = FURUSDAmount.add(expectedFee);

  //   // Get the nominal NICR of the new vault
  //   const _1e20 = toBigNum("100");
  //   let NICR = FURFIColl.mul(_1e20).div(expectedDebt);

  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user4).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user4).getApproxHint(NICR, numTrials, 42);  // random seed of 42

  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user4).findInsertPosition(NICR, approxHint, approxHint);

  //   // Finally, call openVault with the exact upperHint and lowerHint
  //   const maxFee = toBigNum("5", 16); // Slippage protection: 5%

  //   var tx = await borrowerOperations.connect(user4).openVault(maxFee, FURFIColl, FURUSDAmount, upperHint, lowerHint);
  //   await tx.wait();

  // })

  // it("user5 create Vault with 60 furFi token, borrow 7000 FURUSD", async () => {
  //   var tx = await furFiToken.connect(user5).approve(borrowerOperations.address, toBigNum("60"));
  //   await tx.wait();

  //   const FURFIColl = toBigNum("60");
  //   const FURUSDAmount = toBigNum("7000");

  //   // Call deployed vaultManager contract to read latest borrowing fee
  //   const expectedFee = await vaultManager.connect(user5).getBorrowingFeeWithDecay(FURUSDAmount);

  //   // Total debt of the new vault = FURUSD amount drawn, plus fee
  //   const expectedDebt = FURUSDAmount.add(expectedFee);

  //   // Get the nominal NICR of the new vault
  //   const _1e20 = toBigNum("100");
  //   let NICR = FURFIColl.mul(_1e20).div(expectedDebt);

  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user5).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user5).getApproxHint(NICR, numTrials, 42);  // random seed of 42

  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user5).findInsertPosition(NICR, approxHint, approxHint);

  //   // Finally, call openVault with the exact upperHint and lowerHint
  //   const maxFee = toBigNum("5", 16); // Slippage protection: 5%

  //   var tx = await borrowerOperations.connect(user5).openVault(maxFee, FURFIColl, FURUSDAmount, upperHint, lowerHint);
  //   await tx.wait();

  // })

  // it("check balances", async () => {
  //   await checkFURFIBalance();
  //   await checkFURUSDBalance();
  // })

  // it("user1 addColl, Increase 10 FURFI coll", async () => {

  //   var tx = await furFiToken.connect(user1).approve(borrowerOperations.address, toBigNum("10"));
  //   await tx.wait();

  //   const collIncrease = toBigNum("10");
  
  //   // Get vault's current debt and coll
  //   const {0: debt, 1: coll} = await vaultManager.connect(user1).getEntireDebtAndColl(user1.address);
    
  //   const newColl = coll.add(collIncrease);

  //   const _1e20 = toBigNum("100");
  //   let NICR = newColl.mul(_1e20).div(debt);
  
  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user1).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user1).getApproxHint(NICR, numTrials, 42);  // random seed of 42
  
  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user1).findInsertPosition(NICR, approxHint, approxHint);
  
  //   // Call addColl with the exact upperHint and lowerHint
  //   var tx = await borrowerOperations.connect(user1).addColl(collIncrease, upperHint, lowerHint);
  //   await tx.wait();
  // })

  // it("user2 adjustVault, Increase 5 FURFI coll, Decrease 500 FURUSD debt", async () => {

  //   var tx = await furFiToken.connect(user2).approve(borrowerOperations.address, toBigNum("5"));
  //   await tx.wait();

  //   const collIncrease = toBigNum("5");  // borrower wants to add 100 FURFI
  //   const FURUSDRepayment = toBigNum("500"); // borrower wants to repay 500 FURUSD
  
  //   // Get vault's current debt and coll
  //   const {0: debt, 1: coll} = await vaultManager.connect(user2).getEntireDebtAndColl(user2.address);
    
  //   const newColl = coll.add(collIncrease);
  //   const newDebt = debt.sub(FURUSDRepayment);

  //   const _1e20 = toBigNum("100");
  //   let NICR = newColl.mul(_1e20).div(newDebt);
  
  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user2).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user2).getApproxHint(NICR, numTrials, 42);  // random seed of 42
  
  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user2).findInsertPosition(NICR, approxHint, approxHint);
  
  //   // Finally, call openVault with the exact upperHint and lowerHint
  //   const maxFee = toBigNum("5", 16); // Slippage protection: 5%

  //   // Call adjustVault with the exact upperHint and lowerHint
  //   var tx = await borrowerOperations.connect(user2).adjustVault(maxFee, collIncrease, 0, FURUSDRepayment, false, upperHint, lowerHint);
  //   await tx.wait();
  // })

  // it("user3 repayFURUSD, Decrease 4000 FURUSD debt", async () => {

  //   const FURUSDRepayment = toBigNum("4000"); 
  //   // Get vault's current debt and coll
  //   const {0: debt, 1: coll} = await vaultManager.connect(user3).getEntireDebtAndColl(user3.address);
    
  //   const newDebt = debt.sub(FURUSDRepayment);

  //   const _1e20 = toBigNum("100");
  //   let NICR = coll.mul(_1e20).div(newDebt);
  
  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user3).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user3).getApproxHint(NICR, numTrials, 42);  // random seed of 42
  
  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user3).findInsertPosition(NICR, approxHint, approxHint);
  
  //   // Call repayFURUSD with the exact upperHint and lowerHint
  //   var tx = await borrowerOperations.connect(user3).repayFURUSD(FURUSDRepayment, upperHint, lowerHint);
  //   await tx.wait();
  // })

  // it("user4 withdrawColl, Decrease 20 FURFI coll", async () => {

  //   const collDecrease = toBigNum("20");  
  
  //   // Get vault's current debt and coll
  //   const {0: debt, 1: coll} = await vaultManager.connect(user4).getEntireDebtAndColl(user4.address);
    
  //   const newColl = coll.sub(collDecrease);

  //   const _1e20 = toBigNum("100");
  //   let NICR = newColl.mul(_1e20).div(debt);
  
  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user4).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user4).getApproxHint(NICR, numTrials, 42);  // random seed of 42
  
  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user4).findInsertPosition(NICR, approxHint, approxHint);
  
  //   // Call withdrawColl with the exact upperHint and lowerHint
  //   var tx = await borrowerOperations.connect(user4).withdrawColl(collDecrease, upperHint, lowerHint);
  //   await tx.wait();
  // })

  // it("user5 withdrawFURUSD, Increase 1000 FURUSD", async () => {

  //   const FURUSDAmount = toBigNum("1000");
  
  //   // Get vault's current debt and coll
  //   const {0: debt, 1: coll} = await vaultManager.connect(user5).getEntireDebtAndColl(user5.address);
    
  //   const newDebt = debt.add(FURUSDAmount);

  //   const _1e20 = toBigNum("100");
  //   let NICR = coll.mul(_1e20).div(newDebt);
  
  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numVaults = await sortedVaults.connect(user5).getSize();
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user5).getApproxHint(NICR, numTrials, 42);  // random seed of 42
  
  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: upperHint, 1: lowerHint } = await sortedVaults.connect(user5).findInsertPosition(NICR, approxHint, approxHint);
  
  //   // Finally, call openVault with the exact upperHint and lowerHint
  //   const maxFee = toBigNum("5", 16); // Slippage protection: 5%

  //   // Call withdrawFURUSD with the exact upperHint and lowerHint
  //   var tx = await borrowerOperations.connect(user5).withdrawFURUSD(maxFee, FURUSDAmount, upperHint, lowerHint);
  //   await tx.wait();
  // })

  // // it("get users liquity data", async () => {
  // //   await checkUsersLiquityData();
  // // })

  // it("user1 close Vault", async () => {
  //   var tx = await furUSDToken.transfer(user1.address, toBigNum("100"));
  //   await tx.wait();
  //   var tx = await borrowerOperations.connect(user1).closeVault();
  //   await tx.wait();
  // })

  // it("user2 redeemCollateral with 10000 FURUSD", async () => {

  //   //pass 14 days
  //   await network.provider.send("evm_increaseTime", [1209600]);
  //   await network.provider.send("evm_mine");

  //   var tx = await furUSDToken.transfer(user2.address, toBigNum("10000"));
  //   await tx.wait();

  //   const FURUSDAmount = toBigNum("10000");
  
  //   //get total vaults number
  //   let numVaults = await sortedVaults.connect(user2).getSize();

  //   //fetch price
  //   let price = await priceFeed.connect(user2).getPrice();

  //   //Get firstRedemption hint address, and partialRedemptionHintNICR from hintHelpers contract
  //   let {0: firstRedemptionHint, 1: partialRedemptionHintNICR, } = await hintHelpers.connect(user2).getRedemptionHints(FURUSDAmount, price, numVaults);

  //   // Get an approximate address hint from the deployed HintHelper contract. Use (15 * number of vaults) trials 
  //   // to get an approx. hint that is close to the right position.
  //   let numTrials = numVaults.mul(15);
  //   let { 0: approxHint } = await hintHelpers.connect(user2).getApproxHint(partialRedemptionHintNICR, numTrials, 42);  // random seed of 42
  
  //   // Use the approximate hint to get the exact upper and lower hints from the deployed SortedVaults contract
  //   let { 0: _upperPartialRedemptionHint, 1: _lowerPartialRedemptionHint } = await sortedVaults.connect(user2).findInsertPosition(partialRedemptionHintNICR, approxHint, approxHint);

  //   const maxFee = toBigNum("35", 16);

  //   var tx = await vaultManager.connect(user2).redeemCollateral(FURUSDAmount, firstRedemptionHint, _upperPartialRedemptionHint, _lowerPartialRedemptionHint, partialRedemptionHintNICR, numVaults, maxFee);
  //   await tx.wait();
  // })

  // it("change FurFi price: 300 => 70", async () => {
  //     var tx = await priceFeed.setPrice(toBigNum("70"));
  //     await tx.wait();
  // });

  // it("user5 staking 8000 FURUSD to StabilityPool", async () => {
  //   var tx = await stabilityPool.connect(user5).provideToSP(toBigNum("8000"));
  //   await tx.wait();
  // })

  // it("liquidate 2 Vaults", async () => {
  //   var tx = await vaultManager.liquidateVaults(2);
  //   await tx.wait();
  // })

  // it("check collSurplus, user5 claim collsurplus FurFi", async () => {
  //   let FurFiBalance = await collSurplusPool.getFURFI();
  //   console.log("CollSurplusPool FurFi balance", fromBigNum(FurFiBalance));
  //   let CollSurplus = await collSurplusPool.getCollateral(user5.address);
  //   console.log("user5 CollSurplus", fromBigNum(CollSurplus));

  //   var tx = await borrowerOperations.connect(user5).claimCollateral();
  //   await tx.wait();
  // });

  // it("user5 withdraw from StabilityPool", async () => {
  //   let CompoundedFURUSDDeposit = await stabilityPool.connect(user5).getCompoundedFURUSDDeposit(user5.address);
  //   let DepositorFURFIGain = await stabilityPool.connect(user5).getDepositorFURFIGain(user5.address);
  //   let DepositorLOANGain = await stabilityPool.connect(user5).getDepositorLOANGain(user5.address);
  //   console.log("CompoundedFURUSDDeposit",fromBigNum(CompoundedFURUSDDeposit));
  //   console.log("DepositorFURFIGain", fromBigNum(DepositorFURFIGain));
  //   console.log("DepositorLOANGain", fromBigNum(DepositorLOANGain));

  //   var tx = await stabilityPool.connect(user5).withdrawFromSP(CompoundedFURUSDDeposit);
  //   await tx.wait();
  // })

  // it("user6 loanStakingPool data, pending gain", async () => {
  //   let FURFI= await loanStaking.getFURFI();
  //   console.log("FURFI", fromBigNum(FURFI));
  //   let FURUSD = await loanStaking.getFURUSD();
  //   console.log("FURUSD balance", fromBigNum(FURUSD));
  //   let totalStake = await loanStaking.getTotalLOANDeposits();
  //   console.log("total LOAN Stake", fromBigNum(totalStake));

  //   let PendingFURFIGain = await loanStaking.getPendingFURFIGain(user6.address);
  //   console.log("PendingFURFIGain", fromBigNum(PendingFURFIGain));
  //   let PendingFURUSDGain = await loanStaking.getPendingFURUSDGain(user6.address);
  //   console.log("PendingFURUSDGain", fromBigNum(PendingFURUSDGain));
  // })

  // it("check balances", async () => {
  //   await checkFURFIBalance();
  //   await checkFURUSDBalance();
  // })

});

/////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       check balances             ////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

const checkUsersLiquityData = async () => {
  let price = await priceFeed.getPrice();
  let numVaults = await vaultManager.getVaultOwnersCount();
  for(let i = 0; i < numVaults; i++){
    let userAddress = await vaultManager.getVaultFromVaultOwnersArray(i);
    let coll = await vaultManager.getVaultColl(userAddress);
    let debt = await vaultManager.getVaultDebt(userAddress); 
    let ICR = await vaultManager.getCurrentICR(userAddress, price);
    console.log("address", userAddress);
    console.log("coll", fromBigNum(coll));
    console.log("debt", fromBigNum(debt));
    console.log("ICR", fromBigNum(ICR, 16));
  }
}


// const checkStabilityPoolGain = async () => { // input address
//   let CompoundedFURUSDDeposit = await stabilityPool.getCompoundedFURUSDDeposit(user5.address);
//   let DepositorFURFIGain = await stabilityPool.getDepositorFURFIGain(user5.address);
//   let DepositorLOANGain = await stabilityPool.getDepositorLOANGain(user5.address);
//   console.log("user5 CompoundedFURUSDDeposit", fromBigNum(CompoundedFURUSDDeposit));
//   console.log("user5 DepositorFURFIGain", fromBigNum(DepositorFURFIGain));
//   console.log("user5 DepositorLOANGain", fromBigNum(DepositorLOANGain));
// }

// const checkCollSurplusGain = async () => { //input address
//   let FurFiBalance = await collSurplusPool.getFURFI();
//   console.log("CollSurplusPool FurFi balance", fromBigNum(FurFiBalance));
//   let CollSurplus = await collSurplusPool.getCollateral(user5.address);
//   console.log("user5 CollSurplus", fromBigNum(CollSurplus));
// }

// const checkLoanStakingGain = async () => { //input address
//   let FURFI= await loanStaking.getFURFI();
//   console.log("FURFI", fromBigNum(FURFI));
//   let FURUSD = await loanStaking.getFURUSD();
//   console.log("FURUSD balance", fromBigNum(FURUSD));
//   let totalStake = await loanStaking.getTotalLOANDeposits();
//   console.log("total LOAN Stake", fromBigNum(totalStake));

//   let PendingFURFIGain = await loanStaking.getPendingFURFIGain(user6.address);
//   console.log("PendingFURFIGain", fromBigNum(PendingFURFIGain));
//   let PendingFURUSDGain = await loanStaking.getPendingFURUSDGain(user6.address);
//   console.log("PendingFURUSDGain", fromBigNum(PendingFURUSDGain));
// }

const checkBNBBalance = async () => {
  console.log("owner BNB balance",fromBigNum(await ethers.provider.getBalance(owner.address)));
};

const checkFURFIBalance = async () => {
  // console.log("owner FurFi balance", fromBigNum(await furFiToken.balanceOf(owner.address)));
  console.log("user1 FurFi balance", fromBigNum(await furFiToken.balanceOf(user1.address)));
  console.log("user2 FurFi balance", fromBigNum(await furFiToken.balanceOf(user2.address)));
  console.log("user3 FurFi balance", fromBigNum(await furFiToken.balanceOf(user3.address)));
  console.log("user4 FurFi balance", fromBigNum(await furFiToken.balanceOf(user4.address)));
  console.log("user5 FurFi balance", fromBigNum(await furFiToken.balanceOf(user5.address)));
};

const checkFURUSDBalance = async () => {
  // console.log("owner FurFi balance", fromBigNum(await furUSDToken.balanceOf(owner.address)));
  console.log("user1 FURUSD balance", fromBigNum(await furUSDToken.balanceOf(user1.address)));
  console.log("user2 FURUSD balance", fromBigNum(await furUSDToken.balanceOf(user2.address)));
  console.log("user3 FURUSD balance", fromBigNum(await furUSDToken.balanceOf(user3.address)));
  console.log("user4 FURUSD balance", fromBigNum(await furUSDToken.balanceOf(user4.address)));
  console.log("user5 FURUSD balance", fromBigNum(await furUSDToken.balanceOf(user5.address)));
};

const checkLOANBalance = async () => {
  // console.log("owner FurFi balance", fromBigNum(await loanToken.balanceOf(owner.address)));
  console.log("user1 LOAN balance", fromBigNum(await loanToken.balanceOf(user1.address)));
  console.log("user2 LOAN balance", fromBigNum(await loanToken.balanceOf(user2.address)));
  console.log("user3 LOAN balance", fromBigNum(await loanToken.balanceOf(user3.address)));
  console.log("user4 LOAN balance", fromBigNum(await loanToken.balanceOf(user4.address)));
  console.log("user5 LOAN balance", fromBigNum(await loanToken.balanceOf(user5.address)));
};

