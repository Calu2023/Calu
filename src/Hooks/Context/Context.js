import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function Provider({ children }) {
  const [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const [blur, setBlur] = useState(false);
  const handleBlur = () => {
    setBlur(!blur);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    localStorage.setItem('carrito', JSON.stringify([...cart, product]));
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
    if (products.compressed !== 0 && products.compressed !== null) {
      const a = document.createElement('a');
      a.href = products.compressed;
      a.download = `productoCalu.rar`;
      a.target = '_blank'; // Agregar esta línea para abrir en nueva pestaña
      a.click();
    }
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
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCustomContext() {
  return useContext(Context);
}
