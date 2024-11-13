import React, { Suspense, useEffect, useState } from 'react';
import './payment.css';
import MercadoPagoLogo from '../../images/payments/mercadopago.png';
import { Header } from '../Header/header';
import { useCustomContext } from '../../Hooks/Context/Context';
import { useNavigate } from 'react-router-dom';

function PaymentGateway() {
  const { removeFromCart, handleDownload } = useCustomContext();
  const [modalMercadoPago, setModalMercadoPago] = useState(false);
  const [mercadoPagoLoaded, setMercadoPagoLoaded] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const navigate = useNavigate();
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.onload = () => setMercadoPagoLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (mercadoPagoLoaded) {
      createPreference().then(setPreferenceId);
    }
  }, [mercadoPagoLoaded]);

  const createPreference = () => {
    let totalAmount = carrito.reduce((acc, product) => {
      const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ''));
      return !isNaN(price) ? acc + price : acc;
    }, 0);

    const preference = {
      items: carrito.map((product) => ({
        title: product.name,
        quantity: 1,
        unit_price: parseFloat(product.price.replace(/[^0-9.-]+/g, '')),
      })),
      back_urls: {
        success: window.location.href,
        failure: window.location.href,
        pending: window.location.href,
      },
      auto_return: 'approved',
    };

    return fetch('https://api.mercadopago.com/checkout/preferences?access_token=APP_USR-5037751749727441-110811-6aef9aa3db30416a2863cd81be033452-112800158', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(preference),
    })
      .then((response) => response.json())
      .then((data) => data.id)
      .catch((error) => {
        console.error('Error al crear la preferencia:', error);
      });
  };

  const verifyPayment = (paymentId) => {
    console.log(`Verificando el pago con ID: ${paymentId}`);
    fetch(`https://api.mercadopago.com/v1/payments/${paymentId}?access_token=APP_USR-5037751749727441-110811-6aef9aa3db30416a2863cd81be033452-112800158`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Datos del pago:', data);
        if (data.status === 'approved') {
          setIsPaymentPending(false);  // Habilita nuevamente el botón
          handlePaymentConfirmation();
        } else {
          alert('El pago no se pudo completar. Intenta de nuevo.');
          setIsPaymentPending(false); // Permite otro intento de pago si falla
        }
      })
      .catch((error) => {
        console.error('Error al verificar el pago:', error);
        alert('Hubo un error al verificar el estado del pago.');
        setIsPaymentPending(false); // Permite otro intento en caso de error
      });
  };

  const handlePaymentConfirmation = () => {
    const confirmDownload = window.confirm('¿Quieres descargar el archivo?');
    if (confirmDownload) {
      localStorage.clear();
      alert('El pago ha sido exitoso! Vuelva pronto :)');
      handleDownload(carrito[0]);
      navigate('/product-list');
    } else {
      alert('El pago ha sido exitoso, pero no descargaste el archivo.');
      navigate('/product-list');
    }
  };

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const paymentId = hashParams.get('payment_id');
    const collectionStatus = hashParams.get('collection_status');
    
    if (paymentId && collectionStatus === 'approved') {
      console.log('Redirigido con payment_id:', paymentId);
      verifyPayment(paymentId);
    } else {
      console.log('No se encontró un payment_id o el estado no es aprobado.');
    }
  }, []);

  useEffect(() => {
    if (mercadoPagoLoaded && preferenceId) {
      setTimeout(() => {
        const mp = new window.MercadoPago('APP_USR-b0644426-19dd-474d-8e68-0741631b01a8');
        mp.bricks().create('wallet', 'wallet_container', {
          initialization: {
            preferenceId,
          },
          customization: {
            texts: {
              valueProp: 'smart_option',
            },
          },
        });
      }, 1000);
    }
  }, [mercadoPagoLoaded, preferenceId]);

  const handleModal = () => {
    if (!isPaymentPending) {
      setModalMercadoPago((prev) => !prev);
      setIsPaymentPending(true); // Deshabilita el botón después del primer clic
    }
  };

  return (
    <Suspense>
      <div className="paymentCtn">
        <Header cartItem={localStorage.getItem('carrito')} handleDelete={removeFromCart} />
        <div className="payment-content">
          <h1 className="title-payment">Pasarela de Pagos</h1>
          <div className="payment-options">
            <div className="payment-option" onClick={handleModal} style={{ pointerEvents: isPaymentPending ? 'none' : 'auto', opacity: isPaymentPending ? 0.5 : 1 }}>
              <img src={MercadoPagoLogo} alt="Mercado Pago" />
            </div>
            {mercadoPagoLoaded && modalMercadoPago && preferenceId && (
              <div id="wallet_container"></div>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default PaymentGateway;
