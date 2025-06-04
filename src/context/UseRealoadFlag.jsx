// src/context/ReloadContext.tsx
import { createContext, useContext, useState, useCallback } from "react";

const ReloadContext = createContext();

export const ReloadProvider = ({ children }) => {
  const [reloadFlag, setReloadFlag] = useState(false);

  const reload = useCallback(() => {
    setReloadFlag((prev) => !prev);
  }, []);

  return (
    <ReloadContext.Provider value={{ reloadFlag, reload }}>
      {children}
    </ReloadContext.Provider>
  );
};

export const useReload = () => useContext(ReloadContext);
