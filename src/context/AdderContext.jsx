import { createContext, useContext, useState } from "react";

const AdderContext = createContext({
  cart: [],
  addItem: () => {},
  clearCart: () => {},
});

export const AdderProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (itemToAdd) => {
    if (!isInCart(itemToAdd.id)) {
      setCart((prev) => [...prev, itemToAdd]);
    } else {
      const cartUpdate = cart.map((prod) => {
        if (prod.id === itemToAdd.id) {
          return {
            ...prod,
            quantity: 1,
          };
        } else {
          return prod;
        }
      });
      setCart(cartUpdate);
    }
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AdderContext.Provider value={{ cart, addItem, clearCart }}>
      {children}
    </AdderContext.Provider>
  );
};

export const useAdderContext = () => {
  return useContext(AdderContext);
};
