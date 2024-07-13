import { ethers } from "ethers";

function Navigation({ account, setAccount }) {
  async function handleConnect() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.getAddress(accounts[0]);
    setAccount(account);
  }
  function handleDisconnect() {
    setAccount(null);
  }
  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappcom Best Sellers</h1>
      </div>
      <input type="text" className="nav__search" />
      {account ? (
        <button onClick={handleDisconnect} className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button onClick={handleConnect} className="nav__connect">
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#Clothing & Jewelry">Clothing & Jewelry</a>
        </li>
        <li>
          <a href="#Electronics & Gadgets">Electronics & Gadgets</a>
        </li>
        <li>
          <a href="#Toys & Gaming">Toys & Gaming</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
