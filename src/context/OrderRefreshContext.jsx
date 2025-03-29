// RefreshContext.js
import React, { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export const useRefreshContext = () => useContext(RefreshContext);

export const RefreshProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => setRefresh((prevRefresh) => !prevRefresh);

  return (
    <RefreshContext.Provider value={{ refresh, toggleRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};
