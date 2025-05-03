import axios from "axios";
import { handleApiError } from "../utilities";

const apiUrl = import.meta.env.VITE_HOST;

export const getAllSuppliers = async () => {
  const token = sessionStorage.getItem("token");

  try {
    const suppliers = await axios.get(`${apiUrl}/api/supplier`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return suppliers.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
