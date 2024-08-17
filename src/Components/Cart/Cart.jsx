import React, { useState, useEffect } from 'react';
import './Cart.css';
function Cart({ close, buy }) {
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const getCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(getCarrito);
    calculateTotal(getCarrito);
  }, []);

  const calculateTotal = (updatedCarrito) => {
    let newTotal = 0;
    if (updatedCarrito.length > 0) {
      newTotal = updatedCarrito.reduce((accumulator, product) => {
        const cleanedPrice = product.price.replace(/[^0-9.,-]/g, '').trim();
        const productPrice = parseFloat(cleanedPrice.replace(',', '.'));
        const quantity = product.quantity || 1;
        return !isNaN(productPrice) ? accumulator + (productPrice * quantity) : accumulator;
      }, 0);
    }
    setTotal(newTotal);
  };

  const handleDelete = (index) => {
    const updatedCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(updatedCarrito);
    localStorage.setItem('carrito', JSON.stringify(updatedCarrito));
    calculateTotal(updatedCarrito);
  };

  return (
    <div>
      <div className='cartPage'>
        <div className='cartContainer'>
          <p className='closeCart' onClick={close}>X</p>
          <h2>Carrito de compras</h2>
          <div className='cartItems'>
            {carrito.length > 0 ? (
              carrito.map((product, index) => (
                <div className='cartItem' key={index}>
                  <img src={product.thumbnail} alt={product.title} />
                  <p>
                    <span className='product_title'>{product.title}</span>
                    <span className='product_price'> {product.price}</span>
                    <span className='product_quantity'> ({product.quantity || 1})</span>
                  </p>
                  <div>
                    <button className='deleteItem' onClick={() => handleDelete(index)}>X</button>
                  </div>
                </div>
              ))
            ) : (
              <h3>Carrito vacío</h3>
            )}
          </div>
          <p className='total'>
            <span>Total</span>
            <span>{!isNaN(total) ? `$${total.toFixed(2)}` : '$0'}</span>
          </p>
          {carrito.length > 0 && (
          <div className='compra_btn'>
            <button onClick={() => buy(total)}>
              {total > 0 ? 'Iniciar compra' : 'Descargar'}
            </button>
          </div>
          )}
        </div>
        <div className='modal-background' onClick={close}></div>
      </div>
    </div>
  );
}

export default Cart;