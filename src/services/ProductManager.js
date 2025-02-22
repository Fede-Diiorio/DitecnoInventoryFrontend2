import { useFetch } from "../hooks";
import axios from "axios";

const apiUrl = import.meta.env.VITE_HOST;

// export const getInventory = () => {
//   const { data, loading, error } = useFetch(`${apiUrl}/api/products`);
//   return { data, loading, error };
// };

export const getInventory = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/products`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo producto:", error);
    return { error: error.message };
  }
};
