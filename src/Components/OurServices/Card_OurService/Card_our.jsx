import React from "react";

import "./card_our.css";
const Card_our = ({ image, title, des, btn }) => {
  return (
    <div className="card_our">
      <div className="image_our">{image}</div>

      <div className="title_our">{title}</div>
      <div className="des">{des}</div>
      <div className="card_btn">{btn}</div>
    </div>
  );
};

export default Card_our;
