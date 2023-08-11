import React from "react";
import arrow_R from "./icon_arrow_right.svg";
import "./card_res.css";
import elipse from "./elipse.svg";
import cart from "./cart.svg";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../../firebase-config";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Card_res = ({ title, description, button }) => {
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
  const handleClick = () => {
    return <Link to={cards.id}></Link>;
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
          <img className="res_img" src={description} alt={title} />{" "}
          {/* Render the thumbnail as an image */}
        </div>
      </div>

      <div className="title_res">{title}</div>
    </div>
  );
};

export default Card_res;
