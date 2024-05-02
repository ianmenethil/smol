export interface LogEntry {
  id: string;
  timestamp: string;
  method: string;
  endpoint: string;
  statusCode: number;
  responseTime: number; // in milliseconds
  requestBody?: any;
  responseBody?: any;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number; // in seconds
}

export interface ApiKey {
  key: string;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error?: any;
}