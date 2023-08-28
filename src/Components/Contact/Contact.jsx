import React, { useState } from "react";
import "./contact.css";
import { Header } from "../Header/header";
import CTN from "../CTN/CTN";
import Footer from "../Footer/Footer";
import { db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useCustomContext } from "../../Hooks/Context/Context";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { cart, removeFromCart } = useCustomContext();
  const saveEmailToFirebase = async (email) => {
    try {
      const emailsCollectionRef = collection(db, "email");
      await addDoc(emailsCollectionRef, {
        email,
        timestamp: new Date(),
      });
      console.log("Email saved to Firebase successfully");
    } catch (error) {
      console.error("Error saving email to Firebase:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar los campos antes de enviar el formulario
    if (!nombre || !email || !mensaje) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    // Validar expresiones regulares
    const nombreRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mensajeRegex = /^.{10,}$/;

    if (!nombreRegex.test(nombre)) {
      alert("Por favor ingresa un nombre válido");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un email válido");
      return;
    }

    if (!mensajeRegex.test(mensaje)) {
      alert("Por favor ingresa un mensaje de al menos 10 caracteres");
      return;
    }

    // Validar reCAPTCHA v3
    const recaptchaKey = "6LfOi0wmAAAAAHxliyEI69YMZGrB54KbGx7-S1Ra";
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(recaptchaKey, { action: "submit" })
        .then((token) => {
          // Enviar datos al endpoint de Getform
          const endpoint =
            "https://getform.io/f/2e4cb533-dbbc-46a2-9c5a-b13199d1dedb ";
          const formData = new FormData();
          formData.append("nombre", nombre);
          formData.append("email", email);
          formData.append("telefono", telefono);
          formData.append("mensaje", mensaje);
          formData.append("recaptchaToken", token);

          console.log(
            "Datos enviados al endpoint:",
            Object.fromEntries(formData)
          ); // Verificar los datos enviados en la consola

          fetch(endpoint, {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              // Aquí puedes agregar la lógica para manejar la respuesta del endpoint
              if (response.ok) {
                // El formulario se envió correctamente
                alert("El formulario ha sido enviado con éxito");
                setNombre("");
                setEmail("");
                setTelefono("");
                setMensaje("");

                // Save the email to the "email" collection in Firebase
                saveEmailToFirebase(email);
              } else {
                // Ocurrió un error al enviar el formulario
                alert("Hubo un error al enviar el formulario");
              }
            })
            .catch((error) => {
              // Ocurrió un error en la comunicación con el servidor
              alert("Hubo un error en la comunicación con el servidor");
            });
        });
    });
  };

  return (
    <div>
      <Header cartItem={cart} handleDelete={removeFromCart} />
      <div className="contact">
        <div className="contact-title">
          <h1>Contáctanos</h1>
          <p>Te damos el servicio que nos gustaría recibir</p>
        </div>

        <form className="contact-form" action="post" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            className="contact-inputs"
            type="text"
            name="nombre"
            id="nombre"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            className="contact-inputs"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="tel">Telefono (opcional)</label>
          <input
            className="contact-inputs"
            type="tel"
            name="tel"
            id="tel"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
          />

          <label htmlFor="message">Mensaje</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={mensaje}
            onChange={(event) => setMensaje(event.target.value)}
            required
          ></textarea>
          <div className="buttonContainer">
            <button className="contact-button" type="submit">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
