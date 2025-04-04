import axios from "axios";

const apiUrl = import.meta.env.VITE_HOST;

export const getAllOrders = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/orders`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return {
      error: error,
      message: error.response.data.error,
    };
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
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
  }
};

export const createOrder = async (products) => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      `${apiUrl}/api/orders`,
      { products },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    return { error: error.message };
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
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
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
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
  }
};
