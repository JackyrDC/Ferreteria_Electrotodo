import axios from "axios";
import type { AxiosResponse } from "axios";
import type { CategoriaProducto } from "../Types/types";

// Interfaces para las respuestas de la API
interface CategoryResponse {
  mensaje: string;
  data?: CategoriaProducto;
  errores?: string[];
  error?: string;
}

interface CategoriesResponse {
  mensaje: string;
  data?: CategoriaProducto[];
  errores?: string[];
  error?: string;
}

interface ApiError {
  message: string;
  error?: string;
}

// Type guard para verificar si un objeto es un ApiError
function isApiError(error: unknown): error is ApiError {
  return error !== null && 
         typeof error === 'object' && 
         'message' in error && 
         typeof (error as ApiError).message === 'string';
}

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createCategory = async (categoryData: Omit<CategoriaProducto, "categoria_id"> & { categoria_id: string }): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.post(`${apiUrl}/categoria/crear`, categoryData);
    return response.data;
  } catch (error: unknown) {
    let apiError: ApiError;
    
    if (axios.isAxiosError(error) && error.response) {
      apiError = { message: error.response.data?.mensaje || "Error al crear categoría" };
    } else if (error instanceof Error) {
      apiError = { message: error.message };
    } else if (isApiError(error)) {
      apiError = error;
    } else {
      apiError = { message: "Error desconocido al crear categoría" };
    }
    throw apiError;
  }
};

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response: AxiosResponse<CategoriesResponse> = await axios.get(`${apiUrl}/categoria/listar`);
    return response.data;
  } catch (error: unknown) {
    let apiError: ApiError;
    
    if (axios.isAxiosError(error) && error.response) {
      apiError = { message: error.response.data?.mensaje || "Error al obtener categorías" };
    } else if (error instanceof Error) {
      apiError = { message: error.message };
    } else if (isApiError(error)) {
      apiError = error;
    } else {
      apiError = { message: "Error desconocido al obtener categorías" };
    }
    throw apiError;
  }
};

export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.get(`${apiUrl}/categoria/${id}`);
    return response.data;
  } catch (error: unknown) {
    let apiError: ApiError;
    
    if (axios.isAxiosError(error) && error.response) {
      apiError = { message: error.response.data?.mensaje || "Error al obtener categoría" };
    } else if (error instanceof Error) {
      apiError = { message: error.message };
    } else if (isApiError(error)) {
      apiError = error;
    } else {
      apiError = { message: "Error desconocido al obtener categoría" };
    }
    throw apiError;
  }
}; 