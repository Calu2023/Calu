import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function Provider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productTitle) => {
    setCart((prevCart) => prevCart.filter((product) => product.title !== productTitle));
  };

  return (
    <Context.Provider value={{ cart, addToCart, removeFromCart }}>{children}</Context.Provider>
  );
}

export function useCustomContext() {
  return useContext(Context);
}
