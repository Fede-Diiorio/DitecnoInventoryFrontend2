import axios from "axios";
import { handleApiError } from "../utilities";

const apiUrl = import.meta.env.VITE_HOST;

export const authUserByCode = async (code) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/code`, { code });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return {
      error: error,
      message: error.response.data.error,
    };
  }
};

export const userLogout = async (token) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/users/logout`,
      {}, // Importante: pasar un objeto vacío como data
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error cerrando sesión:", error);
    return {
      error: error.message,
      message:
        "Hubo un error al cerrar la sesión y su usuario puede haber quedado bloqueado.",
    };
  }
};

export const getAllUsers = async () => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
