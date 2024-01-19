import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart({ close, cart, handleDelete, buy }) {
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);
  const getCarrito = JSON.parse(localStorage.getItem('carrito'));
  useEffect(() => {
    const calculateTotal = async () => {
      setCarrito(getCarrito);
      let newTotal = 0;
      if (getCarrito !== null && getCarrito.length > 0) {
        newTotal = getCarrito.reduce((accumulator, product) => {
          const productPrice = parseFloat(product.price);
          return isNaN(productPrice) ? accumulator : accumulator + productPrice;
        }, 0);
      }
      setTotal(newTotal);
    };

    calculateTotal();
  }, [cart]);
  return (
    <div>
      <div className='cartPage'>
        <div className='cartContainer'>
          <p className='closeCart' onClick={close}>
            X
          </p>
          <h2>Carrito de compras</h2>
          <div className='cartItems'>
            {carrito !== null &&
              carrito.length > 0 &&
              carrito.map((product, index) => (
                <div className='cartItem' key={index}>
                  <img src={product.thumbnail} alt={product.title} />
                  <p>
                    <span className='product_title'>{product.title}</span>
                    <span className='product_price'> ${product.price}</span>
                  </p>
                  <div>
                    <button className='deleteItem' onClick={() => handleDelete(index)}>
                      X
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <p className='total'>
            <span>Total</span>
            <span>{!isNaN(total) ? (total ? `$${total}` : 'Gratis') : '$0'}</span>
          </p>
          <div className='compra_btn'>
            <button onClick={buy}>Iniciar compra</button>
          </div>
        </div>

        <div className='modal-background' onClick={close}></div>
      </div>
    </div>
  );
}

export default Cart;
