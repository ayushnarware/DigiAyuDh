import { apiClient } from '@/api/client';
import type { PaginatedResponse } from '@/types/auth.types';

export interface Task {
  id: string;
  title: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'in-review' | 'completed';
  dueDate: string;
  progress: number;
}

export interface EmployeeProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  avatar?: string;
}

export const employeesService = {
  // Get employee's own profile
  getProfile: async () => {
    const { data } = await apiClient.get<EmployeeProfile>('/employees/me');
    return data;
  },

  // Get employee's tasks
  getTasks: async (filters?: { status?: string; page?: number }) => {
    const { data } = await apiClient.get<PaginatedResponse<Task>>('/employees/tasks', {
      params: filters,
    });
    return data;
  },

  // Get task detail
  getTaskDetail: async (taskId: string) => {
    const { data } = await apiClient.get<Task>(`/employees/tasks/${taskId}`);
    return data;
  },

  // Update task status
  updateTaskStatus: async (taskId: string, status: Task['status']) => {
    const { data } = await apiClient.patch(`/employees/tasks/${taskId}`, { status });
    return data;
  },

  // Update task progress
  updateTaskProgress: async (taskId: string, progress: number) => {
    const { data } = await apiClient.patch(`/employees/tasks/${taskId}`, { progress });
    return data;
  },

  // Update employee profile
  updateProfile: async (profile: Partial<EmployeeProfile>) => {
    const { data } = await apiClient.patch('/employees/me', profile);
    return data;
  },

  // Get employee's projects
  getProjects: async () => {
    const { data } = await apiClient.get('/employees/projects');
    return data;
  },
};
