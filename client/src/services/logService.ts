import axios from 'axios';
import { LogEntry } from '../types/index';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getAuthConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const fetchLogs = async (token: string): Promise<LogEntry[]> => {
  try {
    const response = await axios.get(`${API_URL}/logs`, getAuthConfig(token));
    return response.data;
  } catch (error) {
    console.error('Error fetching logs:', error);
    throw error;
  }
};

export const logRequest = async (token: string, logEntry: LogEntry): Promise<void> => {
  try {
    await axios.post(`${API_URL}/logs`, logEntry, getAuthConfig(token));
  } catch (error) {
    console.error('Error logging request:', error);
    throw error;
  }
};