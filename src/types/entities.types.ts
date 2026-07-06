// Comprehensive entity types for DigiAyuDh Enterprise System

// ============ COMPANY MANAGEMENT ============
export interface Company {
  id: string;
  name: string;
  legalName: string;
  description: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  registrationNumber: string;
  gstNumber: string;
  panNumber: string;
  currency: string;
  timezone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  industry: string;
  employeeCount: number;
  foundedYear: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  metadata?: Record<string, any>;
}

// ============ ADMIN MANAGEMENT ============
export interface Admin {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin';
  department?: string;
  company?: Company;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  loginAttempts: number;
  isLocked: boolean;
}

// ============ EMPLOYEE MANAGEMENT ============
export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: Date;
  gender?: 'M' | 'F' | 'Other';
  personalEmail?: string;
  alternatePhone?: string;
  // Company Information
  employeeCode: string;
  department: Department;
  designation: Designation;
  reportingManager?: Employee;
  team?: Team;
  // Employment Details
  employmentType: 'Full-Time' | 'Part-Time' | 'Contract' | 'Freelance' | 'Intern';
  employmentStatus: 'Active' | 'On Leave' | 'On Notice' | 'Separated';
  joinDate: Date;
  resignDate?: Date;
  // Salary Information
  salaryStructure: SalaryStructure;
  bankDetails: BankDetails;
  // Documents
  documents: EmployeeDocument[];
  // Skills and Experience
  skills: Skill[];
  experience: Experience[];
  // Contact Details
  emergencyContact: EmergencyContact;
  // Attendance and Leave
  attendance: Attendance[];
  leave: Leave[];
  payroll: Payroll[];
  performance: Performance[];
  assets: Asset[];
  // Meta
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  head?: Employee;
  company: Company;
  parentDepartment?: Department;
  budget?: number;
  headCount: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Designation {
  id: string;
  name: string;
  description?: string;
  department: Department;
  level: 'Entry' | 'Junior' | 'Senior' | 'Lead' | 'Manager' | 'Director' | 'Executive';
  salaryRange: { min: number; max: number };
  reportingTo?: Designation;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  department: Department;
  lead: Employee;
  members: Employee[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface SalaryStructure {
  id: string;
  employee: Employee;
  baseSalary: number;
  hra?: number;
  dearness?: number;
  conveyance?: number;
  medicalAllowance?: number;
  otherAllowances?: number;
  grossSalary: number;
  deductions?: Record<string, number>;
  netSalary: number;
  currency: string;
  effectiveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BankDetails {
  id: string;
  accountHolderName: string;
  accountNumber: string;
  accountType: 'Savings' | 'Current' | 'Other';
  bankName: string;
  ifscCode: string;
  branchName?: string;
  country?: string;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeDocument {
  id: string;
  type: 'Aadhar' | 'PAN' | 'Passport' | 'Visa' | 'License' | 'Certificate' | 'Other';
  documentNumber: string;
  issueDate: Date;
  expiryDate?: Date;
  fileUrl: string;
  isVerified: boolean;
  verifiedBy?: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  yearsOfExperience: number;
  endorsements: number;
}

export interface Experience {
  id: string;
  jobTitle: string;
  companyName: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  currentlyWorking: boolean;
  description: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address: string;
}

// ============ CLIENT MANAGEMENT ============
export interface Client {
  id: string;
  companyName: string;
  displayName: string;
  email: string;
  phone: string;
  website?: string;
  industry: string;
  employeeCount?: number;
  annualRevenue?: number;
  // Contact Information
  primaryContact: ClientContact;
  billingContact?: ClientContact;
  // Address
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  // Tax Information
  gstNumber?: string;
  panNumber?: string;
  taxId?: string;
  // Account Details
  accountManager?: Employee;
  projectManager?: Employee;
  accountStatus: 'Active' | 'Inactive' | 'Suspended' | 'Archived';
  // Business Details
  contracts: Contract[];
  projects: Project[];
  invoices: Invoice[];
  payments: Payment[];
  meetings: Meeting[];
  documents: ClientDocument[];
  communications: CommunicationRecord[];
  // Meta
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation?: string;
  isPrimary: boolean;
}

export interface ClientDocument {
  id: string;
  type: 'Contract' | 'NDA' | 'Agreement' | 'License' | 'Certificate' | 'Other';
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  expiryDate?: Date;
}

export interface CommunicationRecord {
  id: string;
  type: 'Email' | 'Call' | 'Meeting' | 'Message' | 'Note';
  subject: string;
  description: string;
  communicatedBy: Employee;
  communicatedWith: ClientContact;
  communicatedAt: Date;
}

// ============ PROJECT MANAGEMENT ============
export interface Project {
  id: string;
  name: string;
  description: string;
  client: Client;
  projectManager: Employee;
  team: Employee[];
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Archived' | 'Cancelled';
  startDate: Date;
  endDate?: Date;
  budget: number;
  actualCost: number;
  currency: string;
  milestones: Milestone[];
  tasks: Task[];
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Milestone {
  id: string;
  project: Project;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed' | 'At Risk' | 'On Hold';
  startDate: Date;
  endDate: Date;
  completionPercentage: number;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  project?: Project;
  milestone?: Milestone;
  assignedTo: Employee;
  assignedBy: Employee;
  status: 'Backlog' | 'Todo' | 'In Progress' | 'In Review' | 'Done' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  startDate: Date;
  dueDate: Date;
  estimatedHours: number;
  actualHours: number;
  completionPercentage: number;
  subtasks: Task[];
  attachments: Attachment[];
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadedBy: Employee;
  uploadedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: Employee;
  createdAt: Date;
  updatedAt: Date;
  replies: Comment[];
}

// ============ HRMS MODULES ============
export interface Attendance {
  id: string;
  employee: Employee;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: 'Present' | 'Absent' | 'Half Day' | 'On Leave' | 'Work From Home' | 'Late';
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Leave {
  id: string;
  employee: Employee;
  leaveType: 'Casual' | 'Sick' | 'Earned' | 'Maternity' | 'Paternity' | 'Unpaid' | 'Other';
  startDate: Date;
  endDate: Date;
  noOfDays: number;
  reason: string;
  attachments?: Attachment[];
  status: 'Applied' | 'Approved' | 'Rejected' | 'Cancelled';
  approvedBy?: Employee;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payroll {
  id: string;
  employee: Employee;
  payPeriod: string; // YYYY-MM
  salaryStructure: SalaryStructure;
  grossSalary: number;
  deductions: Record<string, number>;
  netSalary: number;
  status: 'Draft' | 'Processing' | 'Processed' | 'Paid' | 'On Hold';
  paidDate?: Date;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Performance {
  id: string;
  employee: Employee;
  reviewPeriod: string; // YYYY-QN or YYYY (Annual)
  reviewedBy: Employee;
  rating: number; // 1-5
  strengths: string;
  areasForImprovement: string;
  goals: string;
  comments: string;
  status: 'Draft' | 'Submitted' | 'Reviewed' | 'Finalized';
  createdAt: Date;
  updatedAt: Date;
}

export interface Asset {
  id: string;
  employee: Employee;
  assetType: 'Laptop' | 'Mobile' | 'Tablet' | 'Other';
  assetName: string;
  serialNumber: string;
  purchaseDate: Date;
  manufacturer: string;
  configuration: string;
  status: 'Active' | 'Inactive' | 'Damaged' | 'Lost' | 'Returned';
  createdAt: Date;
  updatedAt: Date;
}

// ============ FINANCE & CRM ============
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  designation: string;
  industry: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost' | 'Unqualified';
  source: 'Website' | 'Referral' | 'Advertisement' | 'Cold Call' | 'Email' | 'Event' | 'Social Media' | 'Other';
  assignedTo?: Employee;
  value: number;
  currency: string;
  expectedCloseDate?: Date;
  probability: number; // 0-100
  notes: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  lead: Lead;
  client?: Client;
  issuedDate: Date;
  validUntilDate: Date;
  items: QuotationItem[];
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  currency: string;
  notes?: string;
  terms?: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected' | 'Expired';
  createdBy: Employee;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuotationItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: Client;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount?: number;
  total: number;
  currency: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
  notes?: string;
  terms?: string;
  createdBy: Employee;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  tax?: number;
  total: number;
}

export interface Payment {
  id: string;
  invoice: Invoice;
  amount: number;
  currency: string;
  paymentMethod: 'Bank Transfer' | 'Credit Card' | 'Cheque' | 'Cash' | 'UPI' | 'Other';
  transactionId?: string;
  paymentDate: Date;
  status: 'Pending' | 'Completed' | 'Failed' | 'Refunded';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contract {
  id: string;
  contractNumber: string;
  client: Client;
  startDate: Date;
  endDate: Date;
  value: number;
  currency: string;
  status: 'Draft' | 'Active' | 'Expired' | 'Terminated' | 'Archived';
  terms: string;
  fileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  client?: Client;
  attendees: Employee[];
  meetingDate: Date;
  startTime: Date;
  endTime: Date;
  location: string;
  meetingLink?: string;
  notes?: string;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

// ============ CONTENT MANAGEMENT ============
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: Employee;
  featuredImage?: string;
  category: string;
  tags: string[];
  status: 'Draft' | 'Published' | 'Scheduled' | 'Archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  category: string;
  client?: Client;
  project?: Project;
  technologies: string[];
  completionDate: Date;
  featured: boolean;
  status: 'Draft' | 'Published' | 'Archived';
  createdAt: Date;
  updatedAt: Date;
}

// ============ SYSTEM MODULES ============
export interface Notification {
  id: string;
  recipient: Employee | Admin;
  type: 'Task' | 'Leave' | 'Invoice' | 'Payment' | 'Meeting' | 'System' | 'Other';
  title: string;
  message: string;
  actionUrl?: string;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  secret: string;
  scope: string[];
  rateLimit: number;
  isActive: boolean;
  lastUsedAt?: Date;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  user: Employee | Admin;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  status: 'Success' | 'Failure';
  errorMessage?: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  user: Employee | Admin;
  action: string;
  entityType: string;
  entityId: string;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'Welcome' | 'Password Reset' | 'Invitation' | 'Invoice' | 'Meeting' | 'Leave Approval' | 'Custom';
  variables: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThemeConfiguration {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  favicon: string;
  companyName: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
