import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase-config';
import CardRes from './Card_resources/Card_res';
import elipse from './Card_resources/elipse.webp';
import cart_ from '../../images/carrito.webp';
import { useCustomContext } from '../../Hooks/Context/Context';

const CardsMap = () => {
  const [cards, setCard] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCustomContext();

  useEffect(() => {
    const getCard = async () => {
      const results = await getDocs(query(collection(db, 'e-commerce')));
      return results;
    };

    const getCardData = async () => {
      const card = await getCard();
      setCard(card.docs.slice(-3));
    };

    getCardData();
  }, []);

  const handleAddToCart = async (id) => {
    const querySnapshot = doc(db, 'e-commerce', id);
    const docSnapshot = await getDoc(querySnapshot);
    const productToAdd = docSnapshot.data();
    addToCart(productToAdd);
  };
  return (
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
  price={
    <p className='price'>
      {!isNaN(product.data().price) ? `$${product.data().price}` : product.data().price}
    </p>
  }
/>
            </div>
            <div className='res_cart' onClick={() => handleAddToCart(product.id)}>
              <img src={elipse} alt=' ' className='elipse' />
              <img src={cart_} alt=' ' className='cart' />
            </div>
          </div>
        ))}
    </div>
  );
};
export default CardsMap;
