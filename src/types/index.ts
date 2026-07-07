// Core Domain Types - Match future Spring Boot DTOs

// Base Response DTO
export interface ApiResponse<T> {
  data: T;
  message: string;
  statusCode: number;
}

// Pagination DTO
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Error DTO
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

// ============ USERS & AUTH ============
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE' | 'CLIENT';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// ============ CLIENTS ============
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  industry: string;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientDetail extends Client {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  taxId?: string;
  bankDetails?: BankDetails;
  documents?: Document[];
  contacts?: ClientContact[];
}

export interface ClientContact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

// ============ EMPLOYEES ============
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: Date;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeDetail extends Employee {
  employeeId: string;
  dob?: Date;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  taxId?: string;
  bankDetails?: BankDetails;
  emergencyContact?: EmergencyContact;
  skills?: Skill[];
  documents?: Document[];
  governmentIds?: GovernmentId[];
}

export interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  branchName: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: 'beginner' | 'intermediate' | 'expert';
  endorsements: number;
}

export interface GovernmentId {
  type: 'PAN' | 'AADHAR' | 'PASSPORT' | 'DRIVING_LICENSE';
  number: string;
  issuedDate?: Date;
  expiryDate?: Date;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

// ============ PROJECTS ============
export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'on-hold' | 'completed' | 'cancelled';
  progress: number;
  startDate: Date;
  endDate: Date;
  budget: number;
  spent: number;
  teamSize: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDetail extends Project {
  description?: string;
  manager?: string;
  team?: Employee[];
  tasks?: Task[];
  milestones?: Milestone[];
  documents?: Document[];
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: string;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate: Date;
  completedDate?: Date;
  deliverables?: string[];
}

// ============ ORGANIZATIONAL ============
export interface Department {
  id: string;
  name: string;
  description?: string;
  active: boolean;
}

export interface Designation {
  id: string;
  name: string;
  department: string;
  active: boolean;
}

export interface Team {
  id: string;
  name: string;
  members: number;
  lead: string;
  active: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: number; // Can be expanded to permission array
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  status: 'active' | 'inactive' | 'suspended';
  users: number;
  createdAt: Date;
}

// ============ FINANCE ============
export interface Invoice {
  id: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  date: Date;
  dueDate: Date;
  items?: InvoiceItem[];
  notes?: string;
  taxAmount?: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax?: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'bank-transfer' | 'credit-card' | 'check' | 'cash' | 'upi';
  date: Date;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  referenceNumber?: string;
  notes?: string;
}

// ============ HR - ATTENDANCE & LEAVE ============
export interface Attendance {
  id: string;
  employeeId: string;
  date: Date;
  status: 'present' | 'absent' | 'half-day' | 'leave';
  checkInTime?: Date;
  checkOutTime?: Date;
  notes?: string;
}

export interface Leave {
  id: string;
  employeeId: string;
  type: 'sick' | 'casual' | 'earned' | 'unpaid' | 'maternity' | 'paternity';
  startDate: Date;
  endDate: Date;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approvedBy?: string;
  approvedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payroll {
  id: string;
  employeeId: string;
  month: string; // YYYY-MM
  baseSalary: number;
  bonus?: number;
  deductions?: number;
  netSalary: number;
  status: 'draft' | 'submitted' | 'approved' | 'paid';
  paymentDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ============ CRM ============
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'won' | 'lost';
  source: 'website' | 'referral' | 'cold-call' | 'email' | 'event' | 'other';
  score?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quotation {
  id: string;
  leadName: string;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  items?: QuotationItem[];
  createdAt: Date;
  validTill: Date;
  notes?: string;
}

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tax?: number;
}

export interface Meeting {
  id: string;
  title: string;
  participant: string;
  date: Date;
  duration: number; // in minutes
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export interface CommunicationLog {
  id: string;
  leadName: string;
  type: 'email' | 'call' | 'message' | 'meeting' | 'proposal';
  subject: string;
  notes?: string;
  date: Date;
  status: 'pending' | 'sent' | 'completed' | 'failed';
}

// ============ SECURITY ============
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordExpiryDays?: number;
  sessionTimeout: number; // in minutes
  ipRestriction?: string[];
  allowedDevices?: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  status: 'success' | 'failure';
}

// ============ NOTIFICATIONS ============
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notificationFrequency: 'instant' | 'daily' | 'weekly' | 'monthly';
  categories?: {
    projectUpdates: boolean;
    leaveApprovals: boolean;
    payrollNotifications: boolean;
    systemAlerts: boolean;
  };
}
