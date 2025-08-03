import axios from "axios";

// Interfaz para errores de API
export interface ApiError {
  message: string;
  error?: string;
}

// Función utilitaria para manejar errores de API
export const handleApiError = (error: unknown, defaultMessage: string): never => {
  let apiError: ApiError;
  
  if (axios.isAxiosError(error) && error.response) {
    apiError = { message: error.response.data?.mensaje || defaultMessage };
  } else if (error instanceof Error) {
    apiError = { message: error.message };
  } else {
    apiError = { message: defaultMessage };
  }
  
  throw apiError;
};

// Función para obtener la URL base de la API
export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_API_URL || "http://localhost:3000";
}; 