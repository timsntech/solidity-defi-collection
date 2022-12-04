const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");
const EthCrypto = require("eth-crypto");
const { delay, toBigNum, fromBigNum } = require("./utils.js");

var ERC20ABI = artifacts.readArtifactSync("contracts/Mock/FakeUsdc.sol:IERC20").abi;
var pairContract;
var exchangeRouter;
var exchangeFactory;
let wBNB;

let token;

var owner;
var user1;
var user2;

var isOnchain = false; //true: bsc testnet, false: hardhat net

var deployedAddress = {
  exchangeFactory: "0xb7926c0430afb07aa7defde6da862ae0bde767bc",
  wBNB: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
  exchangeRouter: "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
  token: "",
};

/**
 *  _admin: owner.address
 *  _developmentFounders = 0xC01cbc79644283782BabE262D1C56493d83D6fe2
    _advisors = 0x105F706AB60fcc1F760b1b6cAD331A647272BDCb
    _marketingReservesPool = 0x56edb7B2AB826B64c26C599C050B909c4d8E1a29
    _devTeam = 0x4962B860e02eb883CB02Bd879641f3d637e123fC
 */


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
    if (!isOnchain) {
      exchangeFactory = await Factory.deploy(owner.address);
      await exchangeFactory.deployed();
      console.log(await exchangeFactory.INIT_CODE_PAIR_HASH());
    } else {
      exchangeFactory = Factory.attach(deployedAddress.exchangeFactory);
    }
    console.log("Factory", exchangeFactory.address);
  });

  it("WBNB deploy", async () => {
    const WBNB_ = await ethers.getContractFactory("WBNB");
    if (!isOnchain) {
      wBNB = await WBNB_.deploy();
      await wBNB.deployed();
    } else {
      wBNB = WBNB_.attach(deployedAddress.wBNB);
    }
    console.log("WBNB", wBNB.address);
  });

  it("Router deploy", async () => {
    const Router = await ethers.getContractFactory("PancakeRouter");
    if (!isOnchain) {
      exchangeRouter = await Router.deploy(
        exchangeFactory.address,
        wBNB.address
      );
      await exchangeRouter.deployed();
    } else {
      exchangeRouter = Router.attach(deployedAddress.exchangeRouter);
    }
    console.log("Router", exchangeRouter.address);
  });

  it("Token deploy", async () => {
    Token = await ethers.getContractFactory("FurioFinanceToken");
    if (!isOnchain) {
      token = await upgrades.deployProxy(Token,["FurioFinanceToken", "$FURFI", toBigNum("1000000", 18), owner.address, "0xC01cbc79644283782BabE262D1C56493d83D6fe2", "0x105F706AB60fcc1F760b1b6cAD331A647272BDCb", "0x56edb7B2AB826B64c26C599C050B909c4d8E1a29", "0x4962B860e02eb883CB02Bd879641f3d637e123fC"]);
      await token.deployed();
    }
    else{
      token = Token.attach(deployedAddress.token);
    }
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
      if (!isOnchain) {
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
      }
    });
  
    it("owner transfer 10000 token to user1", async () => {
      if(!isOnchain){
            var tx =await token.transfer(user1.address, toBigNum("10000", 18));
            await tx.wait();
        }
    });

    it("owner transfer 10000 token to user2", async () => {
        if(!isOnchain){
              var tx =await token.transfer(user2.address, toBigNum("10000", 18));
              await tx.wait();
          }
    });

    it("user1 transfer 5000 token to user2", async () => {
        if(!isOnchain){
              var tx =await token.connect(user1).transfer(user2.address, toBigNum("5000", 18));
              await tx.wait();
          }
    });

    it("check balances", async () => {
        // await checkBNBBalance();
        await checkTokenBalance();
    });

    it("user2 sell 10000 tokens", async () => {
      if(!isOnchain){
  
        var tx = await token.connect(user2).approve(exchangeRouter.address, toBigNum("10000", 18));
        await tx.wait();
        
        var tx = await exchangeRouter.connect(user2).swapExactTokensForETHSupportingFeeOnTransferTokens(
          toBigNum("10000", 18),
          0,
          [token.address, wBNB.address],
          user2.address,
          "124325454365443"
        );
        await tx.wait();
      }
    });
  
    it("user1 buy with 1 BNB", async () => {
      if(!isOnchain){
        var tx = await exchangeRouter.connect(user1).swapExactETHForTokensSupportingFeeOnTransferTokens(
          0,
          [
            wBNB.address,
            token.address
          ],
          user1.address,
          "341443532432123",
          {value: ethers.utils.parseUnits("1", 18)}
        );
        await tx.wait();
      }
    });

    it("check balances", async () => {
        // await checkBNBBalance();
        await checkTokenBalance();
    });
  
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

const checkBNBBalance = async () =>{
    console.log("owner wBNB balance", fromBigNum(await ethers.provider.getBalance(owner.address), 18));
    console.log("user1 wBNB balance", fromBigNum(await ethers.provider.getBalance(user1.address), 18));
    console.log("user2 wBNB balance", fromBigNum(await ethers.provider.getBalance(user2.address), 18));
  }
  
  const checkTokenBalance = async () =>{
    console.log("owner Token balance", fromBigNum(await token.balanceOf(owner.address), 18));
    console.log("user1 Token balance", fromBigNum(await token.balanceOf(user1.address), 18));
    console.log("user2 Token balance", fromBigNum(await token.balanceOf(user2.address), 18));
  }