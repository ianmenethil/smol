import axios from 'axios';
import { User } from '../types/index';

const API_URL = process.env.REACT_APP_API_URL;

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = (): void => {
  // Implement logout functionality, possibly by removing tokens from local storage or updating state
};

// Add more authentication related functions if needed, such as register, reset password, etc.