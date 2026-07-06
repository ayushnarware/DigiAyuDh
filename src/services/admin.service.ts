import { apiClient } from '@/api/client';
import type { PaginatedResponse } from '@/types/auth.types';

export interface AdminStats {
  totalClients: number;
  activeProjects: number;
  teamMembers: number;
  revenue: string;
}

export interface AdminClient {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive' | 'paused';
  createdAt: string;
}

export interface AdminProject {
  id: string;
  name: string;
  clientId: string;
  status: 'planning' | 'in-progress' | 'completed';
  budget: string;
}

export interface AdminEmployee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
}

export const adminService = {
  // Get dashboard stats
  getStats: async () => {
    const { data } = await apiClient.get<AdminStats>('/admin/stats');
    return data;
  },

  // Get all clients
  getClients: async (filters?: { page?: number; limit?: number; search?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<AdminClient>>('/admin/clients', {
      params: filters,
    });
    return data;
  },

  // Create client
  createClient: async (client: Omit<AdminClient, 'id' | 'createdAt'>) => {
    const { data } = await apiClient.post('/admin/clients', client);
    return data;
  },

  // Update client
  updateClient: async (id: string, client: Partial<AdminClient>) => {
    const { data } = await apiClient.patch(`/admin/clients/${id}`, client);
    return data;
  },

  // Delete client
  deleteClient: async (id: string) => {
    await apiClient.delete(`/admin/clients/${id}`);
  },

  // Get all projects
  getProjects: async (filters?: { page?: number; limit?: number; search?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<AdminProject>>('/admin/projects', {
      params: filters,
    });
    return data;
  },

  // Get all employees
  getEmployees: async (filters?: { page?: number; limit?: number; search?: string }) => {
    const { data } = await apiClient.get<PaginatedResponse<AdminEmployee>>('/admin/employees', {
      params: filters,
    });
    return data;
  },

  // Create employee
  createEmployee: async (employee: Omit<AdminEmployee, 'id'>) => {
    const { data } = await apiClient.post('/admin/employees', employee);
    return data;
  },

  // Update employee
  updateEmployee: async (id: string, employee: Partial<AdminEmployee>) => {
    const { data } = await apiClient.patch(`/admin/employees/${id}`, employee);
    return data;
  },

  // Delete employee
  deleteEmployee: async (id: string) => {
    await apiClient.delete(`/admin/employees/${id}`);
  },
};
