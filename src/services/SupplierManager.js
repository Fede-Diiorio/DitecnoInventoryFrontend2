import axios from "axios";
import { handleApiError } from "../utilities";
import { toast } from "react-toastify";

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

export const getSupplierByName = async (name) => {
  const token = sessionStorage.getItem("token");

  try {
    const supplier = await axios.get(`${apiUrl}/api/supplier/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return supplier.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const createSupplier = async (
  name,
  discount,
  nestDiscount,
  exchangeRate
) => {
  const token = sessionStorage.getItem("token");
  try {
    const supplier = await axios.post(
      `${apiUrl}/api/supplier`,
      { name, discount, nestDiscount, exchangeRate },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return supplier.data;
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

export const updateSupplier = async (
  id,
  name,
  discount,
  nestedDiscount,
  exchangeRate
) => {
  const token = sessionStorage.getItem("token");

  try {
    const response = await axios.put(
      `${apiUrl}/api/supplier/${id}`,
      {
        name,
        discount,
        nestedDiscount,
        exchangeRate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
