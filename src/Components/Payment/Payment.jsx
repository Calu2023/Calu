import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './payment.css';
import Paypal from '../../images/payments/paypal.png';
import { Header } from '../Header/header';
import { useCustomContext } from '../../Hooks/Context/Context';

function PaymentGateway() {
  const PayPalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });
  window.paypal.Buttons({
    style: {
      layout: 'horizontal',
      color: 'blue',
    },
  });
  const { removeFromCart, handleDownload } = useCustomContext();
  const [modalPaypal, setModalPaypal] = useState(false);
  const [contadorCarrito, setContadorCarrito] = useState(false);

  const carrito = JSON.parse(localStorage.getItem('carrito'));
  useEffect(() => {}, [contadorCarrito]);

  const handlePayment = (paymentMethod) => {
    console.log('Seleccionaste el método de pago:', paymentMethod);
    if (paymentMethod === 'paypal') {
      handleModal();
      //return handleCreateOrder(precioTotal);
    }
  };

  const handleModal = () => {
    setModalPaypal(!modalPaypal);
  };

  const createOrder = (data, actions) => {
    let newTotal = 0;
    if (carrito.length > 0) {
      newTotal = carrito.reduce((accumulator, product) => {
        const productPrice = parseFloat(product.price);
        return isNaN(productPrice) ? accumulator : accumulator + productPrice;
      }, 0);
    }
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: newTotal,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture(handlePay());
  };
  const handlehandle = () => {
    console.log(carrito);
  };
  const handlePay = () => {
    handleDownload(carrito);
    localStorage.clear('carrito');
    setContadorCarrito(!contadorCarrito);
    console.log('El pago ha sido exitoso! vuelva prontos :)');
  };

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
      <div className='paymentCtn'>
        <Header cartItem={localStorage.getItem('carrito')} handleDelete={removeFromCart} />
        <div className='payment-content'>
          <h1 className='title-payment'>Pasarela de Pagos</h1>
          {/* <button onClick={handlehandle}>descargar</button> */}
          <div className='payment-options'>
            {/* PayPal */}
            <div className='payment-option' onClick={() => handlePayment('paypal')}>
              <img src={Paypal} alt='PayPal' />
            </div>
            <div className='paypalButton'>
              <PayPalButton
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='paymentCtn'>
      <Header cartItem={localStorage.getItem('carrito')} handleDelete={removeFromCart} />
      <div className='payment-content'>
        <h1 className='title-payment'>Pasarela de Pagos</h1>
        {/* <button onClick={handlehandle}>descargar</button> */}
        <div className='paymentSlider'>
          {/* PayPal */}
          <div className='payment-option' onClick={() => handlePayment('paypal')}>
            <img src={Paypal} alt='PayPal' />
          </div>
          <div className='paypalButton'>
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;
