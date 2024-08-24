import React, { Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './payment.css';
import Paypal from '../../images/payments/paypal.png';
import { Header } from '../Header/header';
import { useCustomContext } from '../../Hooks/Context/Context';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate(); 
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  useEffect(() => {}, [contadorCarrito]);

  const handlePayment = (paymentMethod) => {
    console.log('Seleccionaste el método de pago:', paymentMethod);
    if (paymentMethod === 'paypal') {
      handleModal();
    }
  };

  const handleModal = () => {
    setModalPaypal(!modalPaypal);
  };

  const createOrder = (data, actions) => {
    let newTotal = 0;
  
    if (carrito.length > 0) {
      carrito.forEach((product) => {
        // Eliminar el símbolo de moneda y convertir el precio a número
        const priceString = product.price.replace(/[^0-9.-]+/g, ''); // Eliminar caracteres no numéricos excepto punto y guión
        const productPrice = parseFloat(priceString);
  
        console.log('Processing product:', product, 'Price:', productPrice); // Verificar datos del producto
  
        if (!isNaN(productPrice)) {
          newTotal += productPrice;
        } else {
          console.warn('Invalid price for product:', product);
        }
      });
    }
  
   
    newTotal = newTotal.toFixed(2);
    console.log('Total amount to be charged:', newTotal); // Verificar monto total
  
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

  const handlePay = () => {
    localStorage.clear('carrito');
    setContadorCarrito(!contadorCarrito);
    console.log('El pago ha sido exitoso! Vuelva pronto :)');
     
    if (carrito.length > 0) {
      alert('El pago ha sido exitoso! Vuelva pronto :)');
      handleDownload(carrito[0]);
    } else {
      alert('No hay productos en el carrito para descargar.');
    }
    navigate('/product-list');
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
      <Suspense>
        <div className='paymentCtn'>
          <Header cartItem={localStorage.getItem('carrito')} handleDelete={removeFromCart} />
          <div className='payment-content'>
            <h1 className='title-payment'>Pasarela de Pagos</h1>
            <div className={width > breakpoint ? 'payment-options' : 'paymentSlider'}>
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
      </Suspense>
    );
  }
}


export default PaymentGateway;
