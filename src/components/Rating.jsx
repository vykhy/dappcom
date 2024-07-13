import React from "react";
import star_regular from "./../assets/star-regular.svg";
import star_solid from "./../assets/star-solid.svg";

function Rating({ value }) {
  return (
    <div className="rating">
      {[0, 0, 0, 0, 0].map((n, i) => (
        <img
          src={value >= i ? star_solid : star_regular}
          width={"20px"}
          height={"20px"}
          alt="Star"
        />
      ))}
    </div>
  );
}

export default Rating;
