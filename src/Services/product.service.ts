import axios from "axios";
import type { AxiosResponse } from "axios";
import { handleApiError, getApiBaseUrl, type ApiError } from "./utils";
import type { Producto, AgregarProducto } from "../Types/types";

// Interfaces para las respuestas de la API
interface ProductResponse {
  mensaje: string;
  data?: Producto;
  errores?: string[];
  error?: string;
}

interface ProductsResponse {
  mensaje: string;
  data?: Producto[];
  errores?: string[];
  error?: string;
}

const apiUrl = getApiBaseUrl();

export const createProduct = async (productData: FormData): Promise<ProductResponse> => {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.post(`${apiUrl}/producto/crear`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al crear producto");
  }
};

export const getAllProducts = async (): Promise<ProductsResponse> => {
  try {
    const response: AxiosResponse<ProductsResponse> = await axios.get(`${apiUrl}/producto/listar`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al obtener productos");
  }
};

export const getProductById = async (codigo: string): Promise<ProductResponse> => {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.get(`${apiUrl}/producto/${codigo}`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al obtener producto");
  }
}; 