import axios from "axios";

const apiUrl = import.meta.env.VITE_HOST;

export const getInventory = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
  }
};

export const getProductsWithLowStock = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products/low-stock`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
  }
};

export const getProductByCode = async (code) => {
  try {
    const response = await axios.post(`${apiUrl}/api/products/code`, { code });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
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
    console.error(
      "Error obteniendo producto:",
      error.response?.data || error.message
    );
    return { error: error.message };
  }
};
