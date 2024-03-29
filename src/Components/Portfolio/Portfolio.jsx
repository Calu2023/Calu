import { doc, getDoc, getDocs, collection, query } from 'firebase/firestore';

import { db } from '../../firebase-config';

import React, { Suspense } from 'react';
import Card from './Card/Card';
import Slider from '../Slider/Slider';
import './portfolio.css';

import { useEffect, useState } from 'react';

const Portfolio = () => {
  const [portfolioinfo, setPortfolioinfo] = useState([]);
  const [card, setCard] = useState([]);

  ////////////////////////////////////
  useEffect(() => {
    const getPortfolio = async () => {
      const PortfolioDoc = doc(db, 'home', 'Portfolio');
      const docSnapshot = await getDoc(PortfolioDoc);
      if (docSnapshot.exists()) {
        setPortfolioinfo(docSnapshot.data());
      }
    };
    getPortfolio();
  }, []);
  ////////////////////////////////////

  const getCards = async () => {
    const results = await getDocs(query(collection(db, 'portfolio_cards')));
    return results;
  };
  useEffect(() => {
    getCardsData();
  }, []);

  const getCardsData = async () => {
    const card = await getCards();

    setCard(card.docs);
  };

  return (
    <Suspense>
      <div className='portfolio_container'>
        <div className='portfolio_items'>
          <div className='portfolio_text'>
            <div className='edit'>
              <h1 className='title_portfolio'>{portfolioinfo.title}</h1>
            </div>

            <div className='edit'>
              <p className='text_description'>{portfolioinfo.t1}</p>
            </div>
          </div>

          <div className='slider'>
            <div>
              <Slider>
                {card &&
                  card.map((card, index) => (
                    <div className='card_slider_port' key={index}>
                      <Card
                        image={<img src={card.data().imageUrl} />}
                        title={card.data().cardTitle}
                        btn={
                          <a
                            target='_blank'
                            className='
                  button_portfolio'
                            href={card.data().link}
                          >
                            Ver más
                          </a>
                        }
                      ></Card>
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Portfolio;
