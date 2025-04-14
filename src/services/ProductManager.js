import axios from "axios";
import { handleApiError } from "../utilities";

const apiUrl = import.meta.env.VITE_HOST;

export const getInventory = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProductsWithLowStock = async () => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/api/products/low-stock`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getProductByCode = async (code) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${apiUrl}/api/products/code`,
      { code },
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

export const descountStock = async (products) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${apiUrl}/api/products/descount`,
      { products },
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
