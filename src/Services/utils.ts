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
    console.error('🔍 Error de API detectado:', {
      status: error.response.status,
      statusText: error.response.statusText,
      data: error.response.data,
      url: error.config?.url
    });
    
    // Intentar obtener el mensaje de error del backend
    let errorMessage = defaultMessage;
    if (error.response.data) {
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.mensaje) {
        errorMessage = error.response.data.mensaje;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    }
    
    apiError = { 
      message: errorMessage,
      error: `HTTP ${error.response.status}: ${error.response.statusText}`
    };
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