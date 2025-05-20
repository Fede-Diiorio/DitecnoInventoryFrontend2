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

export const getProductById = async (id) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.get(`${apiUrl}/api/products/${id}`, {
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

export const getProductByCodeAndSupplier = async (code, supplier) => {
  const token = sessionStorage.getItem("token");
  try {
    const products = await axios.post(
      `${apiUrl}/api/budget/product`,
      { code, supplier },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return products.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getPendingProducts = async () => {
  const token = sessionStorage.getItem("token");

  try {
    const products = await axios.get(`${apiUrl}/api/orders/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return products.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
