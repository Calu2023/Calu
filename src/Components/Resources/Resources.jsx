import React from "react";
import Card_res from "./Card_resources/Card_res";
import { getDocs, collection, query } from "firebase/firestore";
import { db } from "../../firebase-config";
import "./resources.css";
import { useState, useEffect } from "react";
import Slider from "../Portfolio/Slider/Slider";
import { Link, useNavigate } from "react-router-dom";
import elipse from "./Card_resources/elipse.svg";
import cart from "./Card_resources/cart.svg";

const Resources = () => {
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

  ////////////////////////
  const [width, setWidth] = React.useState(window.innerWidth);
  const breakpoint = 1024;

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  const handleClick = () => {
    "caca";
  };
  if (width > breakpoint) {
    return (
      <div className="res_ctn">
        <div className="res_items">
          <h1 className="res_title_adm">RECURSOS PARA TU NEGOCIO</h1>

          <div className="res_card">
            {cards &&
              cards.map((product) => (
                <Card_res
                  description={product.data().thumbnail} // Pass the thumbnail URL as the description
                  title={product.data().title}
                  button={
                    <Link to={`/product/${product.id}`}>
                      <div className="res_cart">
                        <img src={elipse} alt=" " className="elipse" />
                        <img src={cart} alt=" " className="cart" />
                      </div>
                    </Link>
                  }
                ></Card_res>
              ))}
          </div>
          <Link className="btn_res_more" to={"/product-list"}>
            Ver Más
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="res_ctn">
      <div className="res_items">
        <h1 className="res_title_adm">RECURSOS PARA TU NEGOCIO</h1>

        <Slider>
          {cards &&
            cards.map((product) => (
              <Card_res
                description={product.data().thumbnail} // Pass the thumbnail URL as the description
                title={product.data().title}
                button={
                  <Link to={`/product/${product.id}`}>
                    <div className="res_cart">
                      <img src={elipse} alt=" " className="elipse" />
                      <img src={cart} alt=" " className="cart" />
                    </div>
                  </Link>
                }
              ></Card_res>
            ))}
        </Slider>
        <button className="btn_news" onClick={() => ""}>
          Ver Más
        </button>
      </div>
    </div>
  );
};

export default Resources;
