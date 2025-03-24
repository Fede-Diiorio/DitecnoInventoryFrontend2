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
