import axios from "axios";
import type { AxiosResponse } from "axios";
import { handleApiError, getApiBaseUrl, type ApiError } from "./utils";
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

const apiUrl = getApiBaseUrl();

export const createCategory = async (categoryData: Omit<CategoriaProducto, "categoria_id"> & { categoria_id: string }): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.post(`${apiUrl}/categoria/crear`, categoryData);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al crear categoría");
  }
};

export const getAllCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response: AxiosResponse<CategoriesResponse> = await axios.get(`${apiUrl}/categoria/listar`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al obtener categorías");
  }
};

export const getCategoryById = async (id: string): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.get(`${apiUrl}/categoria/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al obtener categoría");
  }
};

export const updateCategory = async (id: string, categoryData: Partial<CategoriaProducto>): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.put(`${apiUrl}/categoria/${id}`, categoryData);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al actualizar categoría");
  }
};

export const deleteCategory = async (id: string): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.delete(`${apiUrl}/categoria/${id}`);
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al eliminar categoría");
  }
};

export const toggleCategoryStatus = async (id: string): Promise<CategoryResponse> => {
  try {
    const response: AxiosResponse<CategoryResponse> = await axios.patch(`${apiUrl}/categoria/${id}/toggle`, {});
    return response.data;
  } catch (error: unknown) {
    throw handleApiError(error, "Error desconocido al cambiar estado de categoría");
  }
}; 