import axios from "axios";
import type { AxiosResponse } from "axios";
import "dotenv/config";
import type { Users, CreateUsers } from "../Types/types";

const apiUrl = process.env.API_URL

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

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response ? error.response.data : { message: error.message };
    throw apiError;
  }
};

export const register = async (userData: CreateUsers): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(`${apiUrl}/auth/register`, userData);
    return response.data;
  } catch (error: any) {
    const apiError: ApiError = error.response ? error.response.data : { message: error.message };
    throw apiError;
  }
};