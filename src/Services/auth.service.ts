import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Users, CreateUsers } from "../Types/types";

const apiUrl = import.meta.env.VITE_API_URL;

// Interfaces para las respuestas de la API
interface LoginResponse {
  token: string;
  user: Users;
  message?: string;
}

interface RegisterResponse {
  user: Users;
  message: string;
}

interface ApiError {
  message: string;
  error?: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${apiUrl}/api/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    let apiError: ApiError;
    if (axios.isAxiosError(error) && error.response) {
      apiError = error.response.data;
    } else if (error instanceof Error) {
      apiError = { message: error.message };
    } else {
      apiError = { message: "An unknown error occurred" };
    }
    throw apiError;
  }
};

export const register = async (userData: CreateUsers): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${apiUrl}/auth/register`, userData);
    return response.data;
  } catch (error: unknown) {
    let apiError: ApiError;
    if (axios.isAxiosError(error) && error.response) {
      apiError = error.response.data;
    } else if (error instanceof Error) {
      apiError = { message: error.message };
    } else {
      apiError = { message: "An unknown error occurred" };
    }
    throw apiError;
  }
};