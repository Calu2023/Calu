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
      // Lee el carrito actual desde localStorage
      const storedCart = JSON.parse(localStorage.getItem('carrito')) || [];
      
      // Log para verificar el carrito almacenado
      console.log('Carrito almacenado:', storedCart);
  
      // Verifica si el producto ya está en el carrito usando ID
      const productIndex = storedCart.findIndex(p => p.id === product.id);
  
      console.log('ID del producto a agregar:', product.id);
      console.log('Índice del producto en el carrito:', productIndex);
  
      // Si el producto ya existe en el carrito, no lo agregues de nuevo
      if (productIndex !== -1) {
        console.log('El producto ya está en el carrito:', storedCart[productIndex]);
        return prevCart;
      } 
  
      // Si el producto no existe, agrégalo con cantidad 1
      console.log('Nuevo producto agregado:', product);
      const updatedCart = [...storedCart, { ...product, quantity: 1 }];
      
      // Log para verificar el carrito actualizado
      console.log('Carrito actualizado:', updatedCart);
  
      // Actualiza localStorage
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
