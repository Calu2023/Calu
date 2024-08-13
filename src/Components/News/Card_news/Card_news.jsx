import React from "react";
import arrow_R from "./icon_arrow_right.webp";
import "./card_news.css";

const Card_news = ({ image, title, description, btn }) => {
  return (
    <div className="card_news">
      <div className="card_cont">
        <div className="card_f_news">
          <div className="arrow_res">
            <img src={arrow_R} alt=" " className="arrow_r" />
            <img src={arrow_R} alt=" " className="arrow_r" />
          </div>
          <div className="image_">{image}</div>
        </div>
      </div>
      <div className="title_news">{title}</div>
    </div>
  );
};

export default Card_news;
