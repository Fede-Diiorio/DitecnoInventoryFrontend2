import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  // Función para iniciar sesión
  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
  };

  // Verificar si hay un token al montar el componente
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
