import React from "react";
import "./payment.css";
import Paypal from "../../images/payments/paypal.png";
import Mercado from "../../images/payments/Mercado-Pago-Logo.png";
import Stripe from "../../images/payments/2560px-Stripe_Logo,_revised_2016.svg.png";
import Wise from "../../images/payments/1200x630wa.png";
import { Header } from "../Header/header";
import Slider from '../Portfolio/Slider/Slider';
function PaymentGateway() {
  const handlePayment = (paymentMethod) => {
    console.log("Seleccionaste el método de pago:", paymentMethod);
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
    <div className="paymentCtn">
      <Header />
      <div className="payment-content">
        <h1 className="title-payment">Pasarela de Pagos</h1>
        <div className="payment-options">
          {/* PayPal */}
          <div
            className="payment-option"
            onClick={() => handlePayment("paypal")}
          >
            <img src={Paypal} alt="PayPal" />
          </div>

          {/* MercadoPago */}
          <div
            className="payment-option"
            onClick={() => handlePayment("mercadopago")}
          >
            <img src={Mercado} alt="MercadoPago" />
          </div>

          {/* Stripe */}
          <div
            className="payment-option"
            onClick={() => handlePayment("stripe")}
          >
            <img src={Stripe} alt="Stripe" />
          </div>

          {/* Wise */}
          <div className="payment-option" onClick={() => handlePayment("wise")}>
            <img src={Wise} alt="Wise" />
          </div>
        </div>
      </div>
    </div>
  );
}
return (<div className="paymentCtn">
<Header />
<div className="payment-content">
  <h1 className="title-payment">Pasarela de Pagos</h1>
<Slider>
 
    {/* PayPal */}
    <div
      className="payment-option"
      onClick={() => handlePayment("paypal")}
    >
      <img src={Paypal} alt="PayPal" />
    </div>

    {/* MercadoPago */}
    <div
      className="payment-option"
      onClick={() => handlePayment("mercadopago")}
    >
      <img src={Mercado} alt="MercadoPago" />
    </div>

    {/* Stripe */}
    <div
      className="payment-option"
      onClick={() => handlePayment("stripe")}
    >
      <img src={Stripe} alt="Stripe" />
    </div>

    {/* Wise */}
    <div className="payment-option" onClick={() => handlePayment("wise")}>
      <img src={Wise} alt="Wise" />
    </div>
 
</Slider>
</div>
</div>
);
}


export default PaymentGateway;
