import { createContext, useContext, useState } from "react";

const AdderContext = createContext({
  cart: [],
  addItem: () => {},
  clearCart: () => {},
});

export const AdderProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (itemToAdd) => {
    const index = cart.findIndex((item) => item.id === itemToAdd.id);

    if (index === -1) {
      // Si el producto no está en el carrito, agregarlo con quantity: 1
      setCart((prev) => [...prev, { ...itemToAdd, quantity: 1 }]);
    } else {
      // Si el producto ya está en el carrito, verificar el stock antes de actualizar
      const updatedCart = cart.map((item, idx) => {
        if (idx === index) {
          const newQuantity = item.quantity + 1;
          // Si supera el stock, no actualizar el carrito
          if (newQuantity > item.stock) return item;
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setCart(updatedCart);
    }
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
