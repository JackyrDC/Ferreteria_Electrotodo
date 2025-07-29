import axios from "axios";
import config from "dotenv";
config.config();

const apiUrl = process.env.API_URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}


export const register = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
}