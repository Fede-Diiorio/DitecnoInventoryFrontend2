import { toast } from "react-toastify";
import axios from "axios";

export const handleApiError = (error) => {
  if (axios.isAxiosError(error)) {
    const { response } = error;

    if (!response) {
      toast.error("Error de conexión con el servidor");
      return "Error de conexión con el servidor";
    }

    const errorMessage = response.data?.error || "Ocurrió un error inesperado";
    toast.error(errorMessage);
    return errorMessage;
  }

  console.error("Error desconocido:", error);
  toast.error("Ocurrió un error inesperado");
  return "Ocurrió un error inesperado";
};
