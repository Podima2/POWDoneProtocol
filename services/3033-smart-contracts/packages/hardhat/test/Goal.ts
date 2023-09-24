import { expect } from "chai";
import { ethers } from "hardhat";
import { Goal, Token } from "../typechain-types";

describe("Goal", () => {
  let GoalContract: Goal;
  let ERC20TokenContract: Token;

  before(async () => {
    const [owner] = await ethers.getSigners();

    const erc20Token = await ethers.getContractFactory("Token");
    ERC20TokenContract = (await erc20Token.deploy(["0xC03d0Bccf7aDe9Ef0A5158A299d5aA21c20e2C9a"])) as Token;
    await ERC20TokenContract.deployed();

    const goalContract = await ethers.getContractFactory("Goal");
    GoalContract = (await goalContract.deploy(ERC20TokenContract.address)) as Goal;
    await GoalContract.deployed();
  });

  describe("Initialise", () => {
    it("should fail to depositStake because the user has not approved the contract to spend their tokens", async () => {
      const [owner] = await ethers.getSigners();
      const depositAmount = ethers.utils.parseEther("1");
      await expect(GoalContract.depositStake(depositAmount)).to.be.revertedWith("ERC20: insufficient allowance");
    });

    it("should depositStake", async () => {
      const [owner] = await ethers.getSigners();
      const depositAmount = ethers.utils.parseEther("1");

      await ERC20TokenContract.approve(GoalContract.address, depositAmount);
      await GoalContract.depositStake(depositAmount);
      expect((await GoalContract.tasks(owner.address))[3]).to.equal(depositAmount);
    });
  });
});
