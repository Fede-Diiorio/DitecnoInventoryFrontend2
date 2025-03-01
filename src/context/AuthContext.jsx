import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Función para iniciar sesión
  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  };

  //Fucnión para guardar inforamción de usuario

  const userInfo = (newUser) => {
    sessionStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  // Verificar si hay un token al montar el componente
  useEffect(() => {
    setToken(sessionStorage.getItem("token"));

    const storedUser = sessionStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, userInfo, user }}>
      {children}
    </AuthContext.Provider>
  );
};
