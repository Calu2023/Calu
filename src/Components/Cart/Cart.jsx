import React, { useState, useEffect } from 'react';
import './Cart.css';

function Cart({ close, buy }) {
  const [total, setTotal] = useState(0);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const getCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    console.log('Carrito desde localStorage:', getCarrito);

    setCarrito(getCarrito);
    calculateTotal(getCarrito);
  }, []);

  const calculateTotal = (updatedCarrito) => {
    let newTotal = 0;
    if (updatedCarrito.length > 0) {
      newTotal = updatedCarrito.reduce((accumulator, product) => {
        const cleanedPrice = product.price.replace(/[^0-9.,-]/g, '').trim();
        const productPrice = parseFloat(cleanedPrice.replace(',', '.'));
        return !isNaN(productPrice) ? accumulator + productPrice : accumulator;
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

  const addProductToCart = (newProduct) => {
    const storedCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verifica si el producto ya está en el carrito
    const productIndex = storedCarrito.findIndex(product => product.id === newProduct.id);

    if (productIndex !== -1) {
      // Actualiza la cantidad del producto existente
      storedCarrito[productIndex].quantity = (storedCarrito[productIndex].quantity || 1) + 1;
    } else {
      // Agrega un nuevo producto al carrito con cantidad 1
      newProduct.quantity = 1;
      storedCarrito.push(newProduct);
    }

    setCarrito(storedCarrito);
    localStorage.setItem('carrito', JSON.stringify(storedCarrito));
    calculateTotal(storedCarrito);
  };

  return (
    <div>
      <div className='cartPage'>
        <div className='cartContainer'>
          <p className='closeCart' onClick={close}>
            X
          </p>
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
                    <button className='deleteItem' onClick={() => handleDelete(index)}>
                      X
                    </button>
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
          {total > 0 ? (
            <div className='compra_btn'>
              <button onClick={buy}>Iniciar compra</button>
            </div>
          ) : null}
        </div>

        <div className='modal-background' onClick={close}></div>
      </div>
    </div>
  );
}

export default Cart;
