import { createContext, useContext, useState } from "react";

const DeliveryNoteContext = createContext();

export const useDeliveryNoteContext = () => useContext(DeliveryNoteContext);

export const DeliveryNoteProvider = ({ children }) => {
  const [deliveryNoteData, setDeliveryNoteData] = useState({
    order: null,
    products: [],
  });

  const setDraftDeliveryNote = (order, products) => {
    setDeliveryNoteData({ order, products });
  };

  const clearDeliveryNote = () => {
    setDeliveryNoteData({ order: null, products: [] });
  };

  return (
    <DeliveryNoteContext.Provider
      value={{ ...deliveryNoteData, setDraftDeliveryNote, clearDeliveryNote }}
    >
      {children}
    </DeliveryNoteContext.Provider>
  );
};
