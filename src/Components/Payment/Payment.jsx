import React from "react";
import "./payment.css";
import Paypal from '../../images/payments/paypal.png'
import Mercado from '../../images/payments/Mercado-Pago-Logo.png'
import Stripe from '../../images/payments/2560px-Stripe_Logo,_revised_2016.svg.png'
import Wise from '../../images/payments/1200x630wa.png'
import { Header } from "../Header/header";

function PaymentGateway() {
  const handlePayment = (paymentMethod) => {
    console.log("Seleccionaste el método de pago:", paymentMethod);
  };

  return (
    <div className="payment-content">
      <Header/>
      <br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br /><br />
      <h1 className="title-payment">Pasarela de Pagos</h1>
      <div className="payment-options">
        {/* PayPal */}
        <div className="payment-option" onClick={() => handlePayment("paypal")}>
          <img src={Paypal} alt="PayPal" />
          <p>PayPal</p>
        </div>

        {/* MercadoPago */}
        <div className="payment-option" onClick={() => handlePayment("mercadopago")}>
          <img src={Mercado} alt="MercadoPago" />
          <p>MercadoPago</p>
        </div>

        {/* Stripe */}
        <div className="payment-option" onClick={() => handlePayment("stripe")}>
          <img src={Stripe} alt="Stripe" />
          <p>Stripe</p>
        </div>

        {/* Wise */}
        <div className="payment-option" onClick={() => handlePayment("wise")}>
          <img src={Wise} alt="Wise" />
          <p>Wise</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentGateway;