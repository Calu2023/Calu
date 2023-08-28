import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function Provider({ children }) {
  const [cart, setCart] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productTitle) => {
    setCart((prevCart) => prevCart.filter((product) => product.title !== productTitle));
  };

  const loginGoogle = () => {
    setIsAuth(true);
  };

  const logoutGoogle = () => {
    setIsAuth(false);
  };

  return (
    <Context.Provider
      value={{ cart, addToCart, removeFromCart, loginGoogle, logoutGoogle, isAuth }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCustomContext() {
  return useContext(Context);
}
