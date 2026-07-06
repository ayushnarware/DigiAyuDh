import { apiClient } from '@/api/client';
import type { PaginatedResponse } from '@/types/auth.types';

export interface PlatformStats {
  totalTenants: number;
  totalUsers: number;
  systemHealth: string;
  mrrGrowth: string;
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  email: string;
  plan: 'startup' | 'growth' | 'enterprise';
  status: 'active' | 'trial' | 'suspended' | 'inactive';
  users: number;
  createdAt: string;
  revenue: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  status: 'success' | 'error' | 'warning';
}

export const superAdminService = {
  // Get platform stats
  getStats: async () => {
    const { data } = await apiClient.get<PlatformStats>('/super-admin/stats');
    return data;
  },

  // Get all tenants
  getTenants: async (filters?: { page?: number; limit?: number; search?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<Tenant>>('/super-admin/tenants', {
      params: filters,
    });
    return data;
  },

  // Get tenant details
  getTenantDetail: async (id: string) => {
    const { data } = await apiClient.get<Tenant>(`/super-admin/tenants/${id}`);
    return data;
  },

  // Create tenant
  createTenant: async (tenant: Omit<Tenant, 'id' | 'createdAt' | 'users'>) => {
    const { data } = await apiClient.post('/super-admin/tenants', tenant);
    return data;
  },

  // Update tenant
  updateTenant: async (id: string, tenant: Partial<Tenant>) => {
    const { data } = await apiClient.patch(`/super-admin/tenants/${id}`, tenant);
    return data;
  },

  // Suspend tenant
  suspendTenant: async (id: string) => {
    const { data } = await apiClient.post(`/super-admin/tenants/${id}/suspend`);
    return data;
  },

  // Activate tenant
  activateTenant: async (id: string) => {
    const { data } = await apiClient.post(`/super-admin/tenants/${id}/activate`);
    return data;
  },

  // Get system logs
  getLogs: async (filters?: { page?: number; limit?: number }) => {
    const { data } = await apiClient.get<PaginatedResponse<SystemLog>>(
      '/super-admin/logs',
      { params: filters },
    );
    return data;
  },

  // Get system health
  getSystemHealth: async () => {
    const { data } = await apiClient.get('/super-admin/health');
    return data;
  },
};
