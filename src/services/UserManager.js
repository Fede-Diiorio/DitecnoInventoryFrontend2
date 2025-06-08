import axios from "axios";
import { handleApiError } from "../utilities";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_HOST;

export const authUserByCode = async (code) => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/login`, { code });
    if (response.data.message === "Bienvenido") {
      toast.success(response.data.message);
    } else {
      toast.warning(response.data.message);
    }
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
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
    throw new Error(handleApiError(error));
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

export const createUser = async (name, lastname, code, role) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.post(
      `${apiUrl}/api/users/register`,
      {
        name,
        lastname,
        code,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getUserById = async (id) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.get(`${apiUrl}/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updateUser = async (id, name, lastname, code, role) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${apiUrl}/api/users/${id}`,
      { name, lastname, code, role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
