import axios from "axios";
import { handleApiError } from "../utilities";

const apiUrl = import.meta.env.VITE_HOST;

export const createDeliveryNote = async (
  orderNumber,
  deliveryNoteNumber,
  products
) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${apiUrl}/api/notes`,
      { orderNumber, deliveryNoteNumber, products },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error(handleApiError(error)); // Lanza el error procesado
  }
};
