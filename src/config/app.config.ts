export const APP_CONFIG = {
  name: 'DigiAyudh',
  tagline: 'Digital Weapons for the Future',
  description:
    'Premium enterprise software company building websites, web apps, mobile apps, ERP, CRM, HRMS, AI solutions, and digital transformation platforms.',
  url: 'https://digiayudh.com',
  supportEmail: 'hello@digiayudh.com',
  phone: '+91 98765 43210',
} as const;

export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
} as const;

export const AUTH_CONFIG = {
  tokenKey: 'digiayudh_access_token',
  refreshTokenKey: 'digiayudh_refresh_token',
  userKey: 'digiayudh_user',
  tokenExpiryKey: 'digiayudh_token_expiry',
} as const;

export const ROUTES = {
  public: {
    home: '/',
    services: '/#services',
    work: '/#work',
    process: '/#process',
    pricing: '/#pricing',
    contact: '/#contact',
    login: '/login',
  },
  client: {
    dashboard: '/client/dashboard',
    projects: '/client/projects',
    support: '/client/support',
    profile: '/client/profile',
  },
  employee: {
    dashboard: '/employee/dashboard',
    tasks: '/employee/tasks',
    profile: '/employee/profile',
  },
  admin: {
    dashboard: '/admin/dashboard',
    clients: '/admin/clients',
    projects: '/admin/projects',
    employees: '/admin/employees',
    settings: '/admin/settings',
  },
  superAdmin: {
    dashboard: '/super-admin/dashboard',
    tenants: '/super-admin/tenants',
    settings: '/super-admin/settings',
  },
} as const;
