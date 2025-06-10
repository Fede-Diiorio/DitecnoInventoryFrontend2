import axios from "axios";
import { handleApiError } from "../utilities";
import { toast } from "react-toastify";

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
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error)); // Lanza el error procesado
  }
};
