import hardhat from "hardhat";
import _items from "./../src/items.json" assert { type: "json" };

const { items } = _items;

const { ethers } = hardhat;

const tokens = (n) => ethers.parseUnits(n.toString(), "ether");

async function main() {
  const [deployer] = await ethers.getSigners();

  const Dappcom = await ethers.getContractFactory("Dappcom");
  const dappcom = await Dappcom.deploy();
  await dappcom.waitForDeployment();

  console.log(`Dappcom address deployed at: ${dappcom.target}`);

  for (let i = 0; i < items.length; i++) {
    const { id, name, image, category, price, rating, stock } = items[i];
    const transaction = await dappcom
      .connect(deployer)
      .list(id, name, category, image, tokens(price), rating, stock);
    await transaction.wait();
    console.log(`Deployed item no. ${i + 1}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
