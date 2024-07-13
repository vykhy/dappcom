import { ethers } from "ethers";

import Navigation from "./components/Navigation";
import Section from "./components/Section";
import Product from "./components/Product";

import DappcomAbi from "./abis/Dappcom.json";
import config from "./config.json";
import { useEffect, useState } from "react";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [dappcom, setDappcom] = useState(null);

  const [item, setItem] = useState(null);
  const [electronics, setElectronics] = useState([]);
  const [clothing, setClothing] = useState([]);
  const [toys, setToys] = useState([]);

  async function loadBlockChainData() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();

    const DappcomContractAddress = config[network.chainId].dappcom.address;

    const dappcom = new ethers.Contract(
      DappcomContractAddress,
      DappcomAbi,
      provider
    );
    setDappcom(dappcom);

    const clothing = [];
    const toys = [];
    const electronics = [];

    for (let i = 0; i < 9; i++) {
      const item = await dappcom.items(i + 1);
      if (item.category === "electronics") {
        electronics.push(item);
      } else if (item.category === "clothing") {
        clothing.push(item);
      } else if (item.category === "toys") {
        toys.push(item);
      }
    }

    setToys(toys);
    setClothing(clothing);
    setElectronics(electronics);
  }

  useEffect(() => {
    loadBlockChainData();
  }, []);

  function togglePop(item) {
    setItem(item);
  }
  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      {electronics.length > 0 && (
        <Section
          title={"Electronics & Gadgets"}
          items={electronics}
          togglePop={togglePop}
        />
      )}
      {electronics.length > 0 && (
        <Section
          title={"Clothing & Jewelry"}
          items={clothing}
          togglePop={togglePop}
        />
      )}
      {electronics.length > 0 && (
        <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop} />
      )}
      {item !== null && (
        <Product
          item={item}
          provider={provider}
          account={account}
          dappcom={dappcom}
          togglePop={togglePop}
        />
      )}
    </div>
  );
}

export default App;
