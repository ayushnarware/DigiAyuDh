import { apiClient } from '@/api/client';
import type { PaginatedResponse } from '@/types/auth.types';

export interface ClientAccount {
  id: string;
  email: string;
  company: string;
  projects: number;
  status: 'active' | 'inactive' | 'paused';
  joinDate: string;
  totalSpent: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
}

export const clientsService = {
  // Get client's own account details
  getAccount: async () => {
    const { data } = await apiClient.get<ClientAccount>('/clients/me');
    return data;
  },

  // Get client's projects
  getProjects: async (filters?: { status?: string; page?: number }) => {
    const { data } = await apiClient.get<PaginatedResponse<Project>>('/clients/projects', {
      params: filters,
    });
    return data;
  },

  // Get project details
  getProjectDetail: async (projectId: string) => {
    const { data } = await apiClient.get<Project>(`/clients/projects/${projectId}`);
    return data;
  },

  // Get support tickets
  getTickets: async (filters?: { status?: string; page?: number }) => {
    const { data } = await apiClient.get('/clients/support/tickets', {
      params: filters,
    });
    return data;
  },

  // Create support ticket
  createTicket: async (ticket: { title: string; description: string; priority: string }) => {
    const { data } = await apiClient.post('/clients/support/tickets', ticket);
    return data;
  },

  // Update client profile
  updateProfile: async (profile: Partial<ClientAccount>) => {
    const { data } = await apiClient.patch('/clients/me', profile);
    return data;
  },
};
