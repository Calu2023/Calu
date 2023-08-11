import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import "./Cart.css";

function Cart({ close, cart, handleDelete }) {
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

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

  const handlePay = () => {
    setIsModalOpen(true);
  };

  const saveEmailToFirebase = async (email) => {
    try {
      const emailsCollectionRef = collection(db, "email"); // Change to the correct collection name
      await addDoc(emailsCollectionRef, {
        email,
        timestamp: new Date(),
      });
      console.log("Email saved to Firebase successfully");
    } catch (error) {
      console.error("Error saving email to Firebase:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email.match(emailRegex)) {
      await saveEmailToFirebase(email); // Save the email to Firebase
      navigate("/payment");
    } else {
      alert("Invalid email format. Please enter a valid email.");
    }
  };

  return (
    <div className="cartPage">
      <div className="cartContainer">
        <p className="closeCart" onClick={close}>
          X
        </p>
        <h2>Carrito de compras</h2>
        <div className="cartItems">
          {cart &&
            cart.map((product, index) => (
              <div className="cartItem" key={index}>
                <img src={product.thumbnail} alt={product.title} />
                <p>
                  <span>{product.title}</span>
                  <span>${product.price}</span>
                </p>
                <div className="deleteItem">
                  <button onClick={() => handleDelete(product.title)}>
                    <img src="" alt="Borrar" />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <p className="total">
          <span>Total</span>
          <span>${total}</span>
        </p>
        <button onClick={handlePay}>Iniciar compra</button>
      </div>
      {isModalOpen && (
        <div className="emailModal">
          <form onSubmit={handleSubmit}>
            <h3>Ingrese su correo electrónico:</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="email_btn_ctn">
              <button className="email_btn" type="submit">
                Continuar
              </button>
              <button
                className="email_btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
