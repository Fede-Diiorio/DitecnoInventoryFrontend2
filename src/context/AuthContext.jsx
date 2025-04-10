import { createContext, useState, useEffect, useRef } from "react";
import { userLogout } from "../services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate();

  const logoutTimerRef = useRef(null); // Referencia para el temporizador

  // Función para cerrar sesión
  const logout = async () => {
    await userLogout(token);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  // Función para reiniciar el temporizador
  const resetLogoutTimer = () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    logoutTimerRef.current = setTimeout(() => {
      logout();
      navigate("/");
    }, 5 * 60 * 1000); // 5 minutos en milisegundos
  };

  // Función para iniciar sesión
  const login = (newToken) => {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
    resetLogoutTimer(); // Reiniciar el temporizador al iniciar sesión
  };

  // Función para guardar información de usuario
  const userInfo = (newUser) => {
    sessionStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  // Verificar si hay un token al montar el componente
  useEffect(() => {
    if (token) {
      resetLogoutTimer(); // Iniciar el temporizador si hay un token
    }

    return () => clearTimeout(logoutTimerRef.current); // Limpiar al desmontar
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userInfo, user, resetLogoutTimer }}
    >
      {children}
    </AuthContext.Provider>
  );
};
