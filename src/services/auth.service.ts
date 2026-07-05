import { delay } from '@/lib/utils';
import { findDummyUser, getDashboardRoute } from '@/constants/auth.data';
import { AUTH_CONFIG } from '@/config/app.config';
import type { AuthResponse, LoginCredentials, User } from '@/types/auth.types';

function generateToken(): string {
  return `dummy_jwt_${crypto.randomUUID().replace(/-/g, '')}`;
}

function stripPassword(user: User & { password?: string }): User {
  const { password: _, ...rest } = user;
  return rest;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  await delay(800);

  const user = findDummyUser(credentials.email, credentials.password);
  if (!user) {
    throw {
      status: 401,
      message: 'Invalid email or password',
      code: 'INVALID_CREDENTIALS',
    };
  }

  const tokens = {
    accessToken: generateToken(),
    refreshToken: generateToken(),
    expiresIn: 3600,
  };

  const safeUser = stripPassword(user);

  localStorage.setItem(AUTH_CONFIG.tokenKey, tokens.accessToken);
  localStorage.setItem(AUTH_CONFIG.refreshTokenKey, tokens.refreshToken);
  localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(safeUser));
  localStorage.setItem(
    AUTH_CONFIG.tokenExpiryKey,
    String(Date.now() + tokens.expiresIn * 1000),
  );

  if (credentials.remember) {
    localStorage.setItem('digiayudh_remember', 'true');
  }

  return { user: safeUser, tokens };
}

export function logout(): void {
  localStorage.removeItem(AUTH_CONFIG.tokenKey);
  localStorage.removeItem(AUTH_CONFIG.refreshTokenKey);
  localStorage.removeItem(AUTH_CONFIG.userKey);
  localStorage.removeItem(AUTH_CONFIG.tokenExpiryKey);
}

export function getStoredUser(): User | null {
  const raw = localStorage.getItem(AUTH_CONFIG.userKey);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
  const expiry = localStorage.getItem(AUTH_CONFIG.tokenExpiryKey);
  if (!token || !expiry) return false;
  return Date.now() < Number(expiry);
}

export { getDashboardRoute };
