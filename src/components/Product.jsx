import { ethers } from "ethers";
import close from "./../assets/close.svg";
import Rating from "./Rating";

function Product({ provider, item, dappcom, togglePop, account }) {
  async function buyHandler() {}
  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>
          <Rating value={item.rating} />
          <hr />
          <p>{item.address}</p>
          <h2>{ethers.formatUnits(item.cost.toString(), "ether")} ETH</h2>
          <hr />
          <h2>Overview</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
            beatae enim deleniti corporis
          </p>
        </div>
        <div className="product__order">
          <h1>{ethers.formatUnits(item.cost.toString(), "ether")} ETH</h1>
          <p>
            FREE Delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>
          {item.stock > 0 ? <p>In Stock</p> : <p>Out of Stock :(</p>}
          <button onClick={buyHandler} className="product__buy">
            Buy Now
          </button>

          <p>
            <small>Ships from</small> Dappcom
          </p>
          <p>
            <small>Sold by</small> Dappcom
          </p>
        </div>
        <button onClick={() => togglePop(null)} className="product__close">
          <img src={close} alt="Close" />
        </button>
      </div>
    </div>
  );
}

export default Product;
