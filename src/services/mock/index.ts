// Mock Data Services - Follow future DTO structures exactly
// When Spring Boot APIs are connected, only replace the service implementations

import {
  Client,
  Employee,
  Project,
  Department,
  Designation,
  Team,
  Role,
  Permission,
  Tenant,
  Invoice,
  Payment,
  Lead,
  Quotation,
  Meeting,
  CommunicationLog,
} from '@/types';

// Helper: Generate mock UUID
const generateId = () => Math.random().toString(36).substr(2, 9);

// CLIENTS
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Tech Corp',
    email: 'contact@techcorp.com',
    phone: '+91 9876543210',
    industry: 'Technology',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    avatar: 'TC',
  },
  {
    id: '2',
    name: 'Global Industries',
    email: 'hello@globalind.com',
    phone: '+91 9876543211',
    industry: 'Manufacturing',
    status: 'active',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-06-18'),
    avatar: 'GI',
  },
  {
    id: '3',
    name: 'StartUp X',
    email: 'support@startupx.io',
    phone: '+91 9876543212',
    industry: 'Software',
    status: 'inactive',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-05-01'),
    avatar: 'SX',
  },
];

// EMPLOYEES
export const mockEmployees: Employee[] = [
  {
    id: '1',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh.kumar@digiayudh.com',
    phone: '+91 9876543210',
    department: 'Engineering',
    designation: 'Senior Developer',
    status: 'active',
    joinDate: new Date('2023-06-15'),
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-06-20'),
    avatar: 'RK',
  },
  {
    id: '2',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya.singh@digiayudh.com',
    phone: '+91 9876543211',
    department: 'Design',
    designation: 'UI/UX Designer',
    status: 'active',
    joinDate: new Date('2023-08-20'),
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2024-06-15'),
    avatar: 'PS',
  },
  {
    id: '3',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit.patel@digiayudh.com',
    phone: '+91 9876543212',
    department: 'Sales',
    designation: 'Sales Executive',
    status: 'active',
    joinDate: new Date('2023-09-01'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-06-10'),
    avatar: 'AP',
  },
];

// PROJECTS
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Platform Redesign',
    client: 'Tech Corp',
    status: 'in-progress',
    progress: 65,
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-09-30'),
    budget: 500000,
    spent: 325000,
    teamSize: 5,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    client: 'Global Industries',
    status: 'in-progress',
    progress: 45,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-11-30'),
    budget: 750000,
    spent: 337500,
    teamSize: 6,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: '3',
    name: 'Data Analytics Dashboard',
    client: 'StartUp X',
    status: 'completed',
    progress: 100,
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-04-30'),
    budget: 300000,
    spent: 295000,
    teamSize: 3,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-04-30'),
  },
];

// DEPARTMENTS
export const mockDepartments: Department[] = [
  { id: '1', name: 'Engineering', description: 'Software development team', active: true },
  { id: '2', name: 'Design', description: 'UI/UX design team', active: true },
  { id: '3', name: 'Sales', description: 'Sales and business development', active: true },
  { id: '4', name: 'HR', description: 'Human resources', active: true },
  { id: '5', name: 'Finance', description: 'Finance and accounting', active: true },
];

// DESIGNATIONS
export const mockDesignations: Designation[] = [
  { id: '1', name: 'Senior Developer', department: 'Engineering', active: true },
  { id: '2', name: 'Junior Developer', department: 'Engineering', active: true },
  { id: '3', name: 'Lead Designer', department: 'Design', active: true },
  { id: '4', name: 'UI/UX Designer', department: 'Design', active: true },
  { id: '5', name: 'Sales Executive', department: 'Sales', active: true },
  { id: '6', name: 'HR Manager', department: 'HR', active: true },
  { id: '7', name: 'Finance Manager', department: 'Finance', active: true },
];

// TEAMS
export const mockTeams: Team[] = [
  { id: '1', name: 'Backend Team', members: 4, lead: 'Rajesh Kumar', active: true },
  { id: '2', name: 'Frontend Team', members: 3, lead: 'Priya Singh', active: true },
  { id: '3', name: 'Mobile Team', members: 3, lead: 'Amit Patel', active: true },
];

// ROLES
export const mockRoles: Role[] = [
  { id: '1', name: 'Super Admin', description: 'Full system access', permissions: 999 },
  { id: '2', name: 'Admin', description: 'Admin level access', permissions: 50 },
  { id: '3', name: 'Employee', description: 'Standard employee access', permissions: 15 },
  { id: '4', name: 'Client', description: 'Client level access', permissions: 5 },
];

// PERMISSIONS
export const mockPermissions: Permission[] = [
  { id: '1', name: 'manage_users', description: 'Manage user accounts' },
  { id: '2', name: 'manage_projects', description: 'Manage projects' },
  { id: '3', name: 'view_reports', description: 'View reports' },
  { id: '4', name: 'manage_finance', description: 'Manage finance' },
  { id: '5', name: 'manage_crm', description: 'Manage CRM' },
];

// TENANTS
export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Tenant A',
    subdomain: 'tenant-a',
    status: 'active',
    users: 150,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Tenant B',
    subdomain: 'tenant-b',
    status: 'active',
    users: 200,
    createdAt: new Date('2024-02-15'),
  },
];

// INVOICES
export const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    clientName: 'Tech Corp',
    amount: 45000,
    status: 'paid',
    date: new Date('2024-05-10'),
    dueDate: new Date('2024-06-10'),
  },
  {
    id: 'INV-002',
    clientName: 'Global Industries',
    amount: 67500,
    status: 'pending',
    date: new Date('2024-06-01'),
    dueDate: new Date('2024-07-01'),
  },
  {
    id: 'INV-003',
    clientName: 'StartUp X',
    amount: 32000,
    status: 'overdue',
    date: new Date('2024-04-15'),
    dueDate: new Date('2024-05-15'),
  },
];

// PAYMENTS
export const mockPayments: Payment[] = [
  {
    id: 'PAY-001',
    invoiceId: 'INV-001',
    amount: 45000,
    method: 'Bank Transfer',
    date: new Date('2024-05-20'),
    status: 'completed',
  },
  {
    id: 'PAY-002',
    invoiceId: 'INV-002',
    amount: 67500,
    method: 'Credit Card',
    date: new Date('2024-06-10'),
    status: 'pending',
  },
];

// CRM - LEADS
export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    company: 'ABC Corp',
    status: 'new',
    source: 'Website',
    createdAt: new Date('2024-06-18'),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 9876543211',
    company: 'XYZ Inc',
    status: 'contacted',
    source: 'Referral',
    createdAt: new Date('2024-06-15'),
  },
];

// CRM - QUOTATIONS
export const mockQuotations: Quotation[] = [
  {
    id: 'QT-001',
    leadName: 'John Doe',
    amount: 100000,
    status: 'draft',
    createdAt: new Date('2024-06-18'),
    validTill: new Date('2024-07-18'),
  },
  {
    id: 'QT-002',
    leadName: 'Jane Smith',
    amount: 150000,
    status: 'sent',
    createdAt: new Date('2024-06-16'),
    validTill: new Date('2024-07-16'),
  },
];

// CRM - MEETINGS
export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Client Discussion - Tech Corp',
    participant: 'Rajesh Kumar',
    date: new Date('2024-06-25T10:00:00'),
    duration: 60,
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Project Review',
    participant: 'Priya Singh',
    date: new Date('2024-06-26T14:00:00'),
    duration: 45,
    status: 'scheduled',
  },
];

// CRM - COMMUNICATION
export const mockCommunications: CommunicationLog[] = [
  {
    id: '1',
    leadName: 'John Doe',
    type: 'email',
    subject: 'Project Proposal',
    date: new Date('2024-06-18'),
    status: 'sent',
  },
  {
    id: '2',
    leadName: 'Jane Smith',
    type: 'call',
    subject: 'Follow-up Call',
    date: new Date('2024-06-17'),
    status: 'completed',
  },
];

// Mock Service API
export const mockServiceApi = {
  // Clients
  getClients: async () => mockClients,
  createClient: async (data: Partial<Client>) => ({ id: generateId(), ...data }),
  updateClient: async (id: string, data: Partial<Client>) => ({ ...mockClients.find(c => c.id === id), ...data }),
  deleteClient: async (id: string) => true,

  // Employees
  getEmployees: async () => mockEmployees,
  createEmployee: async (data: Partial<Employee>) => ({ id: generateId(), ...data }),
  updateEmployee: async (id: string, data: Partial<Employee>) => ({ ...mockEmployees.find(e => e.id === id), ...data }),
  deleteEmployee: async (id: string) => true,

  // Projects
  getProjects: async () => mockProjects,
  createProject: async (data: Partial<Project>) => ({ id: generateId(), ...data }),
  updateProject: async (id: string, data: Partial<Project>) => ({ ...mockProjects.find(p => p.id === id), ...data }),
  deleteProject: async (id: string) => true,

  // Departments
  getDepartments: async () => mockDepartments,
  createDepartment: async (data: Partial<Department>) => ({ id: generateId(), ...data }),
  updateDepartment: async (id: string, data: Partial<Department>) => ({ ...mockDepartments.find(d => d.id === id), ...data }),
  deleteDepartment: async (id: string) => true,

  // Designations
  getDesignations: async () => mockDesignations,
  createDesignation: async (data: Partial<Designation>) => ({ id: generateId(), ...data }),
  updateDesignation: async (id: string, data: Partial<Designation>) => ({ ...mockDesignations.find(d => d.id === id), ...data }),
  deleteDesignation: async (id: string) => true,

  // Teams
  getTeams: async () => mockTeams,
  createTeam: async (data: Partial<Team>) => ({ id: generateId(), ...data }),
  updateTeam: async (id: string, data: Partial<Team>) => ({ ...mockTeams.find(t => t.id === id), ...data }),
  deleteTeam: async (id: string) => true,

  // Roles
  getRoles: async () => mockRoles,
  createRole: async (data: Partial<Role>) => ({ id: generateId(), ...data }),
  updateRole: async (id: string, data: Partial<Role>) => ({ ...mockRoles.find(r => r.id === id), ...data }),
  deleteRole: async (id: string) => true,

  // Permissions
  getPermissions: async () => mockPermissions,

  // Tenants
  getTenants: async () => mockTenants,

  // Invoices
  getInvoices: async () => mockInvoices,

  // Payments
  getPayments: async () => mockPayments,

  // CRM
  getLeads: async () => mockLeads,
  getQuotations: async () => mockQuotations,
  getMeetings: async () => mockMeetings,
  getCommunications: async () => mockCommunications,
};

export default mockServiceApi;
