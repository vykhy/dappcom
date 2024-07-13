import { ethers } from "ethers";
import Rating from "./Rating";

function Section({ title, items, togglePop }) {
  return (
    <div className="cards__section">
      <h3 id={title}>{title}</h3>
      <hr />
      <div className="cards">
        {items.map((item, i) => (
          <div className="card" key={i} onClick={() => togglePop(item)}>
            <div className="card__image">
              <img src={item.image} alt="Product photo" />
            </div>
            <div className="card__info">
              <h4>{item.name}</h4>
              <Rating value={item.rating} />
              <p>{ethers.formatUnits(item.cost.toString(), "ether")} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Section;
