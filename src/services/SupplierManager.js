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

export const createSupplier = async (supplierName) => {
  const token = sessionStorage.getItem("token");
  try {
    const supplier = axios.post(
      `${apiUrl}/api/supplier`,
      { supplierName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return supplier;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const updatePriceList = async (supplierName, document) => {
  const token = sessionStorage.getItem("token");
  const formData = new FormData();
  formData.append("supplierName", supplierName);
  formData.append("document", document); // esto debe ser un archivo (Blob o File)

  try {
    const response = await axios.post(
      `${apiUrl}/api/supplier/table`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // axios la infiere pero es mejor dejarla explícita
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
