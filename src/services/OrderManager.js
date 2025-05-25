import axios from "axios";
import { handleApiError } from "../utilities";

const apiUrl = import.meta.env.VITE_HOST;

export const getAllIncompleteOrders = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getAllCompleteOrders = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/orders/complete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getOrderById = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const createOrder = async (products, supplier) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${apiUrl}/api/orders`,
      { products, supplier },
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

export const updateOrdernumber = async (id, orderNumber) => {
  try {
    const token = sessionStorage.getItem("token");
    await axios.post(
      `${apiUrl}/api/orders/${id}`,
      { orderNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updateOrderQuantity = async (orderId, productId, quantity) => {
  const token = sessionStorage.getItem("token");
  try {
    await axios.put(
      `${apiUrl}/api/orders/${orderId}`,
      { productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const dowloadExcel = async (orderId) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${apiUrl}/api/orders/excel`,
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // <- clave para axios
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const a = document.createElement("a");
    a.href = url;
    a.download = `presupuesto-${orderId}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
