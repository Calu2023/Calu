import React from 'react';
import Card_res from '../../../Resources/Card_resources/Card_res';

import { getDocs, collection, query } from 'firebase/firestore';

import { db } from '../../../../firebase-config';
import './resources.css';
import { useState, useEffect } from 'react';
import Slider from '../../../Slider/Slider';
const Resources = () => {
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
  const breakpoint = 1024;
  React.useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);
  if (width > breakpoint) {
    return (
      <div className='res_ctn'>
        <h1 className='res_title_adm'>RECURSOS PARA TU NEGOCIO</h1>

        <div className='res_card'>
          {cards &&
            cards.map((product) => (
              <Card_res
                description={product.data().thumbnail}
                title={product.data().title}
                btn={
                  <a
                    target='_blank'
                    className='
                button_portfolio'
                  >
                    Ver más
                  </a>
                }
              ></Card_res>
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className='res_ctn'>
      <h1 className='res_title_adm'>RECUSOS PARA TU NEGOCIO</h1>

      <Slider>
        {cards &&
          cards.map((product) => (
            <Card_res
              description={product.data().detail}
              title={product.data().title}
              btn={
                <a
                  target='_blank'
                  className='
          button_portfolio'
                >
                  Ver más
                </a>
              }
            ></Card_res>
          ))}
      </Slider>
    </div>
  );
};

export default Resources;
