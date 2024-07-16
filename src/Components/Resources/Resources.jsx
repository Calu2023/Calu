import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, getDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import './resources.css';
import Slider from '../Portfolio/Slider/Slider';
import { Link, useNavigate } from 'react-router-dom';
import CardRes from './Card_resources/Card_res';
import elipse from './Card_resources/elipse.svg';
import cart_ from './Card_resources/cart.svg';
import { useCustomContext } from '../../Hooks/Context/Context';

const Resources = () => {
  const { addToCart } = useCustomContext();
  const [cards, setCards] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const breakpoint = 1280;

  useEffect(() => {
    const fetchData = async () => {
      const results = await getDocs(query(collection(db, 'e-commerce')));
      setCards(results.docs.slice(-3));
    };

    fetchData();

    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    
    return () => window.removeEventListener('resize', handleResizeWindow);
  }, []);

  const handleAddToCart = async (id) => {
    const querySnapshot = await getDoc(doc(db, 'e-commerce', id));
    addToCart(querySnapshot.data());
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0 });
  };

  const RenderProducts = () => (
    <>
      {cards.map((product, index) => (
        <div key={index}>
          <div onClick={() => handleProductClick(product.id)}>
            <CardRes
              description={product.data().thumbnail}
              title={product.data().title}
              price={<p className='price'>${product.data().price}</p>}
            />
          </div>
          <div className='res_cart' onClick={() => handleAddToCart(product.id)}>
            <img src={elipse} alt=' ' className='elipse' />
            <img src={cart_} alt=' ' className='cart' />
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className='res_ctn'>
      <div className='res_items'>
        <h1 className='res_title_adm'>RECURSOS PARA TU NEGOCIO</h1>
        {width > breakpoint ? (
          <div className='res_card'>
            <RenderProducts />
          </div>
        ) : (
          <Slider>
            {cards.map((product, index) => (
              <div onClick={() => handleProductClick(product.id)} key={index}>
                <CardRes
                  description={product.data().thumbnail}
                  title={product.data().title}
                  price={<p className='price'>${product.data().price}</p>}
                />
              </div>
            ))}
          </Slider>
        )}
        <div className='btn_cont'>
          <Link className='btn_res_more' to='/product-list/' onClick={() => window.scrollTo({ top: 0 })}>
            Ver Más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Resources;
