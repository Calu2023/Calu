import {
  doc,
  getDoc,
  updateDoc,
  addDoc,
  getDocs,
  collection,
  query,
  deleteDoc,
} from 'firebase/firestore';

import { db, storage } from '../../../../firebase-config';

import React from 'react';
import Card from './Card/Card';
import Slider from '../../../Slider/Slider';
import './portfolio.css';
import { Card_delete } from './Card_Modal/Card_modal';
import { useEffect, useState } from 'react';

import Modal from '../Modal/modal';
import Card_modal from './Card_Modal/Card_modal';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const cardCollectionRef = collection(db, 'portfolio_cards');
const Portfolio = () => {
  const [portfolioinfo, setPortfolioinfo] = useState([]);
  const [card, setCard] = useState([]);
  /*setDoc(doc(db, "home", "Portfolio"), {
    title: "NUESTROS TRABAJOS",
    t1: "    Ya son varias las personas que decidieron confiar en nuestros servicios y sumarse a la transformación digital",

  });*/

  const createCards = async () => {
    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }

    const newCard = {
      cardTitle,
      imageUrl,
      link,
    };

    await addDoc(cardCollectionRef, newCard);
    alert('¡ Tarjeta creada correctamente !');
  };
  const [cardTitle, setCardTitle] = useState('');
  const [title, setTitle] = useState('');
  const [t1, setT1] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  const updateTitle = async () => {
    const portfolio_info = doc(db, 'home', 'Portfolio');
    await updateDoc(portfolio_info, {
      title: title,
    });
  };

  const updateT1 = async () => {
    const portfolio_info = doc(db, 'home', 'Portfolio');
    await updateDoc(portfolio_info, {
      t1: t1,
    });
  };

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
    console.log(card.docs[0].data());
    setCard(card.docs);
  };

  ////////// DELETE CARD

  const deleteCard = async (card) => {
    await deleteDoc(doc(db, 'portfolio_cards', card.id));
    alert('¡ Tarjeta eliminada con éxito !');
  };

  return (
    <div className='portfolio_container'>
      <div>
        <div className='portfolio_text'>
          <div className='edit'>
            <h1 className='title_portfolio'>{portfolioinfo.title}</h1>
            <Modal>
              <input
                style={{ width: '300px', height: '30px' }}
                type='text'
                placeholder='Ingrese titulo'
                onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={() => updateTitle()}>GUARDAR</button>
            </Modal>
          </div>

          <div className='edit'>
            <p className='text_description'>{portfolioinfo.t1}</p>
            <Modal>
              <input
                style={{ width: '300px', height: '30px' }}
                type='text'
                placeholder='Ingrese texto 1'
                onChange={(e) => setT1(e.target.value)}
              />
              <button onClick={() => updateT1()}>GUARDAR</button>
            </Modal>
          </div>
        </div>

        <div className='slider'>
          <div className='card_modal_btn'>
            <Card_modal>
              <input
                style={{ width: '300px', height: '30px' }}
                type='text'
                value={cardTitle}
                placeholder='Ingrese titulo'
                onChange={(e) => setCardTitle(e.target.value)}
              />
              <input
                style={{ width: '300px', height: '30px' }}
                type='text'
                value={link}
                placeholder='Ingrese Link De Red Social'
                onChange={(e) => setLink(e.target.value)}
              />

              <p>Seleccione imagen</p>
              <input
                className='img_btn'
                type='file'
                onChange={(event) => setImage(event.target.files[0])}
              />
              <button onClick={() => createCards()}>GUARDAR</button>
            </Card_modal>
          </div>

          <div>
            <Slider>
              {card &&
                card.map((card) => (
                  <Card
                    image={<img src={card.data().imageUrl} width='100px' />}
                    title={card.data().cardTitle}
                    btn={''}
                    btn_delete={
                      <Card_delete>
                        <p>¿Esta seguro que desea eliminar esta tarjeta?</p>

                        <button className='delete_btn' onClick={() => deleteCard(card)}>
                          ELIMINAR
                        </button>
                      </Card_delete>
                    }
                  ></Card>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
