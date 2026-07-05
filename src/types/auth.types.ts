export type UserRole = 'CLIENT' | 'EMPLOYEE' | 'ADMIN' | 'SUPER_ADMIN';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
  company?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
