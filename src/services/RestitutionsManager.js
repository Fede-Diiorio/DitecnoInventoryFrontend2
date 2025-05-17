import axios from "axios";
import { handleApiError } from "../utilities";

const apiUrl = import.meta.env.VITE_HOST;

export const getAllRestitutions = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/restitutions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const getRestitutionById = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${apiUrl}/api/restitutions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const createRestitution = async (products) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `${apiUrl}/api/restitution/`,
      { products },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
