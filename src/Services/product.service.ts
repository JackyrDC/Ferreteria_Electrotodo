import axios from "axios";
import type { AxiosResponse } from "axios";
import { handleApiError } from "./utils";
import type { Producto } from "../Types/types";

// Interfaces para las respuestas de la API (Producto)
interface ProductResponse {
  mensaje: string;
  data?: Producto;
  errores?: string[];
  error?: string;
}

// Interfaces para las respuestas de la API (Productos)
interface ProductsResponse {
  mensaje: string;
  data?: Producto[];
  errores?: string[];
  error?: string;
}

// URL de la API
const apiUrl = 'http://localhost:3000';

// Función para crear un producto
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

// Función para obtener todos los productos
export const getAllProducts = async (): Promise<ProductsResponse> => {
  try {
    const response: AxiosResponse<ProductsResponse> = await axios.get(`${apiUrl}/producto/listar`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al obtener productos");
  }
};

// Función para obtener un producto por su código
export const getProductById = async (codigo: string): Promise<ProductResponse> => {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.get(`${apiUrl}/producto/${codigo}`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al obtener producto");
  }
};

// Función para actualizar un producto
export const updateProduct = async (codigo: string, productData: FormData): Promise<ProductResponse> => {
  try {
    // Agregar el código al FormData para que el backend sepa qué producto actualizar
    productData.append('codigo', codigo);
    
    // Usar el endpoint correcto según el backend: PUT /:codigo
    const response: AxiosResponse<ProductResponse> = await axios.put(`${apiUrl}/producto/${codigo}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al actualizar producto");
  }
};

// Función para eliminar un producto
export const deleteProduct = async (codigo: string): Promise<ProductResponse> => {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.delete(`${apiUrl}/producto/${codigo}`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al eliminar producto");
  }
};

// Función para cambiar el estado de un producto
export const toggleProductStatus = async (codigo: string): Promise<ProductResponse> => {
  try {
    const response: AxiosResponse<ProductResponse> = await axios.patch(`${apiUrl}/producto/${codigo}/toggle`, {});
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al cambiar estado de producto");
  }
}; 