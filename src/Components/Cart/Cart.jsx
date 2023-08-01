import './Cart.css';
import { useEffect, useState } from 'react';

function Cart({ close, cart, handleDelete }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const calculateTotal = () => {
      let newTotal = 0;
      if (cart && cart.length > 0) {
        newTotal = cart.reduce(
          (accumulator, product) => accumulator + parseFloat(product.price),
          0
        );
      }
      setTotal(newTotal);
    };

    calculateTotal();
  }, [cart]);

  return (
    <div className='cartPage'>
      <div className='cartContainer'>
        <p className='closeCart' onClick={close}>
          X
        </p>
        <h2>Carrito de compras</h2>
        <div className='cartItems'>
          {cart &&
            cart.map((product, index) => (
              <div className='cartItem' key={index}>
                <img src={product.thumbnail} alt={product.title} />
                <p>
                  <span>{product.title}</span>
                  <span>${product.price}</span>
                </p>
                <div className='deleteItem'>
                  <button onClick={() => handleDelete(product.title)}>
                    <img src='' alt='Borrar' />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <p className='total'>
          <span>Total</span>
          <span>${total}</span>
        </p>
        <button>Iniciar compra</button>
      </div>
    </div>
  );
}

export default Cart;
