import { createContext, useContext, useState } from 'react';
import { storage } from "../../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

const Context = createContext();

export function Provider({ children }) {
  const [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const [blur, setBlur] = useState(false);
  const handleBlur = () => {
    setBlur(!blur);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem('carrito', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const removeFromCart = (position) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, index) => index !== position);
      localStorage.setItem('carrito', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const loginGoogle = () => {
    setIsAuth(true);
  };

  const logoutGoogle = () => {
    setIsAuth(false);
  };

  const handleDownload = (products) => {
    if (products.compressed && products.compressed !== null) {
      console.log("Intentando descargar archivo:", products.compressed);
  
      window.location.href = products.compressed;
    } else {
      alert("No hay archivo comprimido disponible para descargar.");
    }
  };
  
  
  
  

  const getFileExtension = (filename) => {
    return filename.split('.').pop().toLowerCase();
  };

  const scroll_top = () => {
    window.scroll({
      top: 0,
    });
  };

  return (
    <Context.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        loginGoogle,
        logoutGoogle,
        isAuth,
        handleBlur,
        blur,
        handleDownload,
        scroll_top,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCustomContext() {
  return useContext(Context);
}
