import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), "ether");
};

const ID = 1;
const NAME = "Shoes";
const CATEGORY = "Clothing";
const IMAGE =
  "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HuBNgNfSZBx5Msztg/shoes.jpg";
const COST = tokens(1);
const RATING = 4;
const STOCK = 5;

describe("Dappcom", () => {
  let dappcom, deployer, buyer;
  beforeEach(async () => {
    // Set up user accounts
    [deployer, buyer] = await ethers.getSigners();

    // Deploy contract
    const Dappcom = await ethers.getContractFactory("Dappcom");
    dappcom = await Dappcom.deploy();
  });

  describe("deployment", async () => {
    it("Sets the owner", async () => {
      expect(deployer.address).to.be.equal(await dappcom.owner());
    });
  });

  describe("Listing", async () => {
    let transaction;

    beforeEach(async () => {
      transaction = await dappcom
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();
    });

    it("Returns item attributes", async () => {
      const item = await dappcom.items(ID);
      expect(item.id).to.equal(ID);
      expect(item.name).to.be.equal(NAME);
      expect(item.category).to.be.equal(CATEGORY);
      expect(item.image).to.be.equal(IMAGE);
      expect(item.cost).to.be.equal(COST);
      expect(item.rating).to.be.equal(RATING);
      expect(item.stock).to.be.equal(STOCK);
    });

    it("Emits List() event", async () => {
      expect(transaction).to.emit(dappcom, "List");
    });
  });

  describe("Buying", () => {
    let transaction;

    beforeEach(async () => {
      transaction = await dappcom
        .connect(deployer)
        .list(ID, NAME, CATEGORY, IMAGE, COST, RATING, STOCK);
      await transaction.wait();

      transaction = await dappcom.connect(buyer).buy(ID, { value: COST });
    });

    it("Updates contract balance", async () => {
      expect(await ethers.provider.getBalance(dappcom.target)).to.be.equal(
        COST
      );
    });

    it("Updates address order count", async () => {
      const orderCount = await dappcom.orderCount(buyer.address);
      expect(orderCount).to.equal(1);
    });

    it("Adds the order", async () => {
      const order = await dappcom.orders(buyer.address, 1);

      expect(order.timestamp).to.be.greaterThan(0);
      expect(order.item.name).to.be.equal(NAME);
    });

    it("Emits Buy event", async () => {
      expect(transaction).to.emit(dappcom, "Buy");
    });
  });
});
