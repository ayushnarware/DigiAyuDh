import { apiClient } from '@/api/client';
import type {
  Company, Admin, Employee, Department, Designation, Team, Client, Project,
  Task, Lead, Quotation, Invoice, Payment, Leave, Attendance
} from '@/types/entities.types';

const API_BASE = '/api/v1';

// ============ COMPANY ENDPOINTS ============
export const companyService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ companies: Company[]; total: number }>(
      `${API_BASE}/companies`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Company>(`${API_BASE}/companies/${id}`);
    return response.data;
  },

  create: async (data: Partial<Company>) => {
    const response = await apiClient.post<Company>(`${API_BASE}/companies`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Company>) => {
    const response = await apiClient.put<Company>(`${API_BASE}/companies/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/companies/${id}`);
  },

  archive: async (id: string) => {
    const response = await apiClient.patch<Company>(`${API_BASE}/companies/${id}/archive`, {});
    return response.data;
  },
};

// ============ ADMIN ENDPOINTS ============
export const adminService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ admins: Admin[]; total: number }>(
      `${API_BASE}/admins`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Admin>(`${API_BASE}/admins/${id}`);
    return response.data;
  },

  create: async (data: Partial<Admin>) => {
    const response = await apiClient.post<Admin>(`${API_BASE}/admins`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Admin>) => {
    const response = await apiClient.put<Admin>(`${API_BASE}/admins/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/admins/${id}`);
  },

  resetPassword: async (id: string, newPassword: string) => {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_BASE}/admins/${id}/reset-password`,
      { newPassword }
    );
    return response.data;
  },
};

// ============ EMPLOYEE ENDPOINTS ============
export const employeeService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ employees: Employee[]; total: number }>(
      `${API_BASE}/employees`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Employee>(`${API_BASE}/employees/${id}`);
    return response.data;
  },

  create: async (data: Partial<Employee>) => {
    const response = await apiClient.post<Employee>(`${API_BASE}/employees`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Employee>) => {
    const response = await apiClient.put<Employee>(`${API_BASE}/employees/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/employees/${id}`);
  },

  archive: async (id: string) => {
    const response = await apiClient.patch<Employee>(`${API_BASE}/employees/${id}/archive`, {});
    return response.data;
  },

  updateSalary: async (id: string, salaryData: any) => {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_BASE}/employees/${id}/salary`,
      salaryData
    );
    return response.data;
  },

  uploadDocument: async (id: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<{ documentId: string }>(
      `${API_BASE}/employees/${id}/documents`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },
};

// ============ DEPARTMENT ENDPOINTS ============
export const departmentService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ departments: Department[]; total: number }>(
      `${API_BASE}/departments`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Department>(`${API_BASE}/departments/${id}`);
    return response.data;
  },

  create: async (data: Partial<Department>) => {
    const response = await apiClient.post<Department>(`${API_BASE}/departments`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Department>) => {
    const response = await apiClient.put<Department>(`${API_BASE}/departments/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/departments/${id}`);
  },
};

// ============ DESIGNATION ENDPOINTS ============
export const designationService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ designations: Designation[]; total: number }>(
      `${API_BASE}/designations`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Designation>(`${API_BASE}/designations/${id}`);
    return response.data;
  },

  create: async (data: Partial<Designation>) => {
    const response = await apiClient.post<Designation>(`${API_BASE}/designations`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Designation>) => {
    const response = await apiClient.put<Designation>(`${API_BASE}/designations/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/designations/${id}`);
  },
};

// ============ TEAM ENDPOINTS ============
export const teamService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ teams: Team[]; total: number }>(
      `${API_BASE}/teams`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Team>(`${API_BASE}/teams/${id}`);
    return response.data;
  },

  create: async (data: Partial<Team>) => {
    const response = await apiClient.post<Team>(`${API_BASE}/teams`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Team>) => {
    const response = await apiClient.put<Team>(`${API_BASE}/teams/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/teams/${id}`);
  },
};

// ============ CLIENT ENDPOINTS ============
export const clientService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ clients: Client[]; total: number }>(
      `${API_BASE}/clients`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Client>(`${API_BASE}/clients/${id}`);
    return response.data;
  },

  create: async (data: Partial<Client>) => {
    const response = await apiClient.post<Client>(`${API_BASE}/clients`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Client>) => {
    const response = await apiClient.put<Client>(`${API_BASE}/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/clients/${id}`);
  },

  archive: async (id: string) => {
    const response = await apiClient.patch<Client>(`${API_BASE}/clients/${id}/archive`, {});
    return response.data;
  },

  suspend: async (id: string) => {
    const response = await apiClient.patch<Client>(`${API_BASE}/clients/${id}/suspend`, {});
    return response.data;
  },

  restore: async (id: string) => {
    const response = await apiClient.patch<Client>(`${API_BASE}/clients/${id}/restore`, {});
    return response.data;
  },
};

// ============ PROJECT ENDPOINTS ============
export const projectService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ projects: Project[]; total: number }>(
      `${API_BASE}/projects`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Project>(`${API_BASE}/projects/${id}`);
    return response.data;
  },

  create: async (data: Partial<Project>) => {
    const response = await apiClient.post<Project>(`${API_BASE}/projects`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Project>) => {
    const response = await apiClient.put<Project>(`${API_BASE}/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/projects/${id}`);
  },

  archive: async (id: string) => {
    const response = await apiClient.patch<Project>(`${API_BASE}/projects/${id}/archive`, {});
    return response.data;
  },
};

// ============ TASK ENDPOINTS ============
export const taskService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ tasks: Task[]; total: number }>(
      `${API_BASE}/tasks`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Task>(`${API_BASE}/tasks/${id}`);
    return response.data;
  },

  create: async (data: Partial<Task>) => {
    const response = await apiClient.post<Task>(`${API_BASE}/tasks`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Task>) => {
    const response = await apiClient.put<Task>(`${API_BASE}/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/tasks/${id}`);
  },

  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.patch<Task>(`${API_BASE}/tasks/${id}/status`, { status });
    return response.data;
  },

  addComment: async (id: string, content: string) => {
    const response = await apiClient.post<{ commentId: string }>(
      `${API_BASE}/tasks/${id}/comments`,
      { content }
    );
    return response.data;
  },
};

// ============ LEAD ENDPOINTS ============
export const leadService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ leads: Lead[]; total: number }>(
      `${API_BASE}/leads`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Lead>(`${API_BASE}/leads/${id}`);
    return response.data;
  },

  create: async (data: Partial<Lead>) => {
    const response = await apiClient.post<Lead>(`${API_BASE}/leads`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Lead>) => {
    const response = await apiClient.put<Lead>(`${API_BASE}/leads/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/leads/${id}`);
  },

  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.patch<Lead>(`${API_BASE}/leads/${id}/status`, { status });
    return response.data;
  },
};

// ============ QUOTATION ENDPOINTS ============
export const quotationService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ quotations: Quotation[]; total: number }>(
      `${API_BASE}/quotations`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Quotation>(`${API_BASE}/quotations/${id}`);
    return response.data;
  },

  create: async (data: Partial<Quotation>) => {
    const response = await apiClient.post<Quotation>(`${API_BASE}/quotations`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Quotation>) => {
    const response = await apiClient.put<Quotation>(`${API_BASE}/quotations/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/quotations/${id}`);
  },

  sendToLead: async (id: string, leadId: string) => {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_BASE}/quotations/${id}/send`,
      { leadId }
    );
    return response.data;
  },
};

// ============ INVOICE ENDPOINTS ============
export const invoiceService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ invoices: Invoice[]; total: number }>(
      `${API_BASE}/invoices`,
      { params }
    );
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Invoice>(`${API_BASE}/invoices/${id}`);
    return response.data;
  },

  create: async (data: Partial<Invoice>) => {
    const response = await apiClient.post<Invoice>(`${API_BASE}/invoices`, data);
    return response.data;
  },

  update: async (id: string, data: Partial<Invoice>) => {
    const response = await apiClient.put<Invoice>(`${API_BASE}/invoices/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    await apiClient.delete(`${API_BASE}/invoices/${id}`);
  },

  sendToClient: async (id: string) => {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_BASE}/invoices/${id}/send`,
      {}
    );
    return response.data;
  },

  downloadPDF: async (id: string) => {
    const response = await apiClient.get<Blob>(
      `${API_BASE}/invoices/${id}/pdf`,
      { responseType: 'blob' }
    );
    return response.data;
  },
};

// ============ PAYMENT ENDPOINTS ============
export const paymentService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ payments: Payment[]; total: number }>(
      `${API_BASE}/payments`,
      { params }
    );
    return response.data;
  },

  create: async (data: Partial<Payment>) => {
    const response = await apiClient.post<Payment>(`${API_BASE}/payments`, data);
    return response.data;
  },

  get: async (id: string) => {
    const response = await apiClient.get<Payment>(`${API_BASE}/payments/${id}`);
    return response.data;
  },

  cancel: async (id: string, reason: string) => {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_BASE}/payments/${id}/cancel`,
      { reason }
    );
    return response.data;
  },
};

// ============ LEAVE ENDPOINTS ============
export const leaveService = {
  list: async (params?: Record<string, any>) => {
    const response = await apiClient.get<{ leaves: Leave[]; total: number }>(
      `${API_BASE}/leaves`,
      { params }
    );
    return response.data;
  },

  create: async (data: Partial<Leave>) => {
    const response = await apiClient.post<Leave>(`${API_BASE}/leaves`, data);
    return response.data;
  },

  approve: async (id: string) => {
    const response = await apiClient.post<Leave>(`${API_BASE}/leaves/${id}/approve`, {});
    return response.data;
  },

  reject: async (id: string, reason: string) => {
    const response = await apiClient.post<Leave>(`${API_BASE}/leaves/${id}/reject`, { reason });
    return response.data;
  },
};

// ============ ATTENDANCE ENDPOINTS ============
export const attendanceService = {
  markPresent: async (employeeId: string, date: Date) => {
    const response = await apiClient.post<Attendance>(
      `${API_BASE}/attendance/mark`,
      { employeeId, date, status: 'Present' }
    );
    return response.data;
  },

  getEmployeeAttendance: async (employeeId: string, month: string) => {
    const response = await apiClient.get<{ attendance: Attendance[] }>(
      `${API_BASE}/attendance/${employeeId}`,
      { params: { month } }
    );
    return response.data;
  },

  bulkMark: async (data: any[]) => {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_BASE}/attendance/bulk`,
      { records: data }
    );
    return response.data;
  },
};
