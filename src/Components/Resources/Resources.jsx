import React from 'react';
import CardRes from './Card_resources/Card_res';
import { getDocs, collection, query, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import './resources.css';
import { useState, useEffect } from 'react';
import Slider from '../Portfolio/Slider/Slider';
import { Link, useNavigate } from 'react-router-dom';
import elipse from './Card_resources/elipse.webp';
import cart_ from './Card_resources/carrito.webp';
import { useCustomContext } from '../../Hooks/Context/Context';
import arrow_L from '../Home/icon_arrow_left.webp';

const Resources = () => {
  const { cart, addToCart } = useCustomContext();
  const [cards, setCard] = useState([]);

  const getCard = async () => {
    const results = await getDocs(query(collection(db, 'e-commerce')));
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
  const breakpoint = 1280;

  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const handleAddToCart = async (id) => {
    const querySnapshot = doc(db, 'e-commerce', id);
    const docSnapshot = await getDoc(querySnapshot);
    const productToAdd = docSnapshot.data();
    addToCart(productToAdd);
  };

  const [res, setRes] = useState([]);

  const getRes = async () => {
    const results = await getDocs(query(collection(db, 'e-commerce')));
    return results;
  };
  useEffect(() => {
    getResData();
  }, []);

  const getResData = async () => {
    const res = await getRes();

    setRes(res.docs);
  };

  const navigate = useNavigate();

  if (width > breakpoint) {
    return (
      <div className='res_ctn'>
        <div className='res_items'>
          <h1 className='res_title_adm'>RECURSOS PARA TU NEGOCIO</h1>

          <div className='res_card'>
            {cards &&
              cards.map((product, index) => (
                <div>
                  <div
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      window.scroll({
                        top: 0,
                      });
                    }}
                  >
                    <CardRes
                      key={index}
                      description={product.data().thumbnail} // Pass the thumbnail URL as the description
                      title={product.data().title}
                      price={<p className='price'>${product.data().price}</p>}
                    ></CardRes>
                  </div>
                  <div className='res_cart' onClick={() => handleAddToCart(product.id)}>
                    <img src={elipse} alt=' ' className='elipse' />
                    <img src={cart_} alt=' ' className='cart' />
                  </div>
                </div>
              ))}
          </div>
          <Link
            className='btn_res_more'
            to={'/product-list/'}
            onClick={() => {
              window.scroll({
                top: 0,
              });
            }}
          >
            <div className='verMas'>
              Ver Más
           
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='res_ctn'>
      <div className='res_items'>
        <h1 className='res_title_adm'>RECURSOS PARA TU NEGOCIO</h1>

        <Slider>
          {cards &&
            cards.map((product, index) => (
              <div>
                <div
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    window.scroll({
                      top: 0,
                    });
                  }}
                >
                  <CardRes
                    key={index}
                    description={product.data().thumbnail} // Pass the thumbnail URL as the description
                    title={product.data().title}
                    price={<p className='price'>${product.data().price}</p>}
                  ></CardRes>
                </div>
                <div className='res_cart' onClick={() => handleAddToCart(product.id)}>
                  <img src={elipse} alt=' ' className='elipse' />
                  <img src={cart_} alt=' ' className='cart' />
                </div>
              </div>
            ))}
        </Slider>
        <Link
          className="btn_res_more"
          to={"/product-list/"}
          onClick={() => {
            window.scroll({
              top: 0,
            });
          }}
        >
          Ver Más
        </Link>
      </div>
    </div>
  );
};

export default Resources;
