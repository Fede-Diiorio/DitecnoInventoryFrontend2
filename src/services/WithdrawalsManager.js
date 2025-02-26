import axios from "axios";

const apiUrl = import.meta.env.VITE_HOST;

export const getAllWithdrawals = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/withdrawals`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
  }
};
