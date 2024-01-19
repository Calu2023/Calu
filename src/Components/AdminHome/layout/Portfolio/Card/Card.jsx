import React from "react";

import "./card.css";
const Card = ({ image, title, btn, btn_delete }) => {
  return (
    <div className="card">
      <div className="btn_delete">{btn_delete}</div>
      <div className="image">{image}</div>

      <div className="title">{title}</div>

      <div className="card_btn">{btn}</div>
    </div>
  );
};

export default Card;
