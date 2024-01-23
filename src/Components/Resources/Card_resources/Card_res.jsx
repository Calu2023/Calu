import React from "react";
import arrow_R from "./icon_arrow_right.webp";
import "./card_res.css";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useState, useEffect } from "react";

const Card_res = ({ title, description, button, price, more }) => {
  const [cards, setCard] = useState([]);

  const getCard = async () => {
    const results = await getDocs(query(collection(db, "e-commerce")));
    return results;
  };

  useEffect(() => {
    getCardData();
  }, []);

  const getCardData = async () => {
    const card = await getCard();
    setCard(card.docs.slice(-3));
  };

  return (
    <div className="card_ctn">
      <div className="card_res">
        <div className="arrow_res">
          <img src={arrow_R} alt=" " className="arrow_r" />
          <img src={arrow_R} alt=" " className="arrow_r" />
          {button}
        </div>
        <div className="res_description">
          <img className="res_img" src={description} alt={title} />
        </div>
      </div>

      <div className="title_res">{title}</div>
      <div>{price}</div>
      <div>{more}</div>
    </div>
  );
};

export default Card_res;
