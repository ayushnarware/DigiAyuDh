import { z } from 'zod';

// Common schemas
const dateSchema = z.coerce.date();
const emailSchema = z.string().email('Invalid email address');
const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');
const currencySchema = z.enum(['INR', 'USD', 'EUR', 'GBP', 'AED']);

// ============ COMPANY ============
export const companyCreateSchema = z.object({
  name: z.string().min(1, 'Company name is required').max(255),
  legalName: z.string().min(1).max(255),
  description: z.string().optional(),
  logo: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  email: emailSchema,
  phone: phoneSchema,
  registrationNumber: z.string().min(1).max(50),
  gstNumber: z.string().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/).optional().or(z.literal('')),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).optional().or(z.literal('')),
  currency: currencySchema.default('INR'),
  timezone: z.string().default('Asia/Kolkata'),
  country: z.string().min(1),
  state: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  zipCode: z.string().regex(/^\d{5,6}$/),
  industry: z.string().min(1),
  employeeCount: z.coerce.number().optional(),
  foundedYear: z.coerce.number().optional(),
});

export type CompanyCreateFormData = z.infer<typeof companyCreateSchema>;

// ============ ADMIN ============
export const adminCreateSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  email: emailSchema,
  phone: phoneSchema,
  role: z.enum(['super_admin', 'admin']),
  department: z.string().optional(),
});

export type AdminCreateFormData = z.infer<typeof adminCreateSchema>;

// ============ EMPLOYEE ============
export const employeeCreateSchema = z.object({
  // Personal Information
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: emailSchema,
  phone: phoneSchema,
  dateOfBirth: dateSchema.optional(),
  gender: z.enum(['M', 'F', 'Other']).optional(),
  personalEmail: emailSchema.optional(),
  alternatePhone: phoneSchema.optional(),

  // Company Information
  employeeCode: z.string().min(1, 'Employee code is required'),
  departmentId: z.string().min(1, 'Department is required'),
  designationId: z.string().min(1, 'Designation is required'),
  reportingManagerId: z.string().optional(),
  teamId: z.string().optional(),

  // Employment Details
  employmentType: z.enum(['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Intern']),
  joinDate: dateSchema,

  // Bank Details
  accountHolderName: z.string().min(1),
  accountNumber: z.string().regex(/^\d{9,18}$/),
  accountType: z.enum(['Savings', 'Current', 'Other']),
  bankName: z.string().min(1),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/),

  // Emergency Contact
  emergencyContactName: z.string().min(1),
  emergencyContactRelationship: z.string().min(1),
  emergencyContactPhone: phoneSchema,
  emergencyContactAddress: z.string().min(1),
});

export type EmployeeCreateFormData = z.infer<typeof employeeCreateSchema>;

export const employeeSalarySchema = z.object({
  baseSalary: z.coerce.number().min(0, 'Base salary must be positive'),
  hra: z.coerce.number().min(0).optional(),
  dearness: z.coerce.number().min(0).optional(),
  conveyance: z.coerce.number().min(0).optional(),
  medicalAllowance: z.coerce.number().min(0).optional(),
  otherAllowances: z.coerce.number().min(0).optional(),
  effectiveDate: dateSchema,
});

export type EmployeeSalaryFormData = z.infer<typeof employeeSalarySchema>;

// ============ DEPARTMENT ============
export const departmentCreateSchema = z.object({
  name: z.string().min(1, 'Department name is required').max(100),
  description: z.string().optional(),
  parentDepartmentId: z.string().optional(),
  budget: z.coerce.number().min(0).optional(),
});

export type DepartmentCreateFormData = z.infer<typeof departmentCreateSchema>;

// ============ DESIGNATION ============
export const designationCreateSchema = z.object({
  name: z.string().min(1, 'Designation name is required').max(100),
  description: z.string().optional(),
  departmentId: z.string().min(1, 'Department is required'),
  level: z.enum(['Entry', 'Junior', 'Senior', 'Lead', 'Manager', 'Director', 'Executive']),
  minSalary: z.coerce.number().min(0),
  maxSalary: z.coerce.number().min(0),
});

export type DesignationCreateFormData = z.infer<typeof designationCreateSchema>;

// ============ TEAM ============
export const teamCreateSchema = z.object({
  name: z.string().min(1, 'Team name is required').max(100),
  description: z.string().optional(),
  departmentId: z.string().min(1, 'Department is required'),
  leadId: z.string().min(1, 'Team lead is required'),
  memberIds: z.array(z.string()).optional().default([]),
});

export type TeamCreateFormData = z.infer<typeof teamCreateSchema>;

// ============ CLIENT ============
export const clientCreateSchema = z.object({
  companyName: z.string().min(1, 'Company name is required').max(255),
  displayName: z.string().min(1).max(255),
  email: emailSchema,
  phone: phoneSchema,
  website: z.string().url().optional().or(z.literal('')),
  industry: z.string().min(1, 'Industry is required'),
  employeeCount: z.coerce.number().min(0).optional(),
  annualRevenue: z.coerce.number().min(0).optional(),

  // Primary Contact
  contactFirstName: z.string().min(1),
  contactLastName: z.string().min(1),
  contactEmail: emailSchema,
  contactPhone: phoneSchema,
  contactDesignation: z.string().optional(),

  // Address
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zipCode: z.string().regex(/^\d{5,6}$/),

  // Tax Information
  gstNumber: z.string().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/).optional().or(z.literal('')),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/).optional().or(z.literal('')),

  // Account Manager
  accountManagerId: z.string().optional(),
  projectManagerId: z.string().optional(),
});

export type ClientCreateFormData = z.infer<typeof clientCreateSchema>;

// ============ PROJECT ============
export const projectCreateSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255),
  description: z.string().min(1, 'Description is required'),
  clientId: z.string().min(1, 'Client is required'),
  projectManagerId: z.string().min(1, 'Project manager is required'),
  teamMemberIds: z.array(z.string()).min(1, 'Select at least one team member'),
  startDate: dateSchema,
  endDate: dateSchema,
  budget: z.coerce.number().min(0, 'Budget must be positive'),
  currency: currencySchema.default('INR'),
});

export type ProjectCreateFormData = z.infer<typeof projectCreateSchema>;

// ============ TASK ============
export const taskCreateSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(255),
  description: z.string().optional(),
  projectId: z.string().optional(),
  milestoneId: z.string().optional(),
  assignedToId: z.string().min(1, 'Assignee is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']).default('Medium'),
  dueDate: dateSchema,
  estimatedHours: z.coerce.number().min(0),
});

export type TaskCreateFormData = z.infer<typeof taskCreateSchema>;

// ============ LEAVE ============
export const leaveCreateSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  leaveType: z.enum(['Casual', 'Sick', 'Earned', 'Maternity', 'Paternity', 'Unpaid', 'Other']),
  startDate: dateSchema,
  endDate: dateSchema,
  reason: z.string().min(10, 'Reason must be at least 10 characters'),
}).refine((data) => data.endDate > data.startDate, {
  message: 'End date must be after start date',
  path: ['endDate'],
});

export type LeaveCreateFormData = z.infer<typeof leaveCreateSchema>;

// ============ ATTENDANCE ============
export const attendanceMarkSchema = z.object({
  employeeId: z.string().min(1, 'Employee is required'),
  date: dateSchema,
  status: z.enum(['Present', 'Absent', 'Half Day', 'On Leave', 'Work From Home', 'Late']),
  checkInTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  checkOutTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  remarks: z.string().optional(),
});

export type AttendanceMarkFormData = z.infer<typeof attendanceMarkSchema>;

// ============ LEAD ============
export const leadCreateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().min(1, 'Company is required'),
  designation: z.string().optional(),
  industry: z.string().min(1, 'Industry is required'),
  source: z.enum(['Website', 'Referral', 'Advertisement', 'Cold Call', 'Email', 'Event', 'Social Media', 'Other']),
  assignedToId: z.string().optional(),
  value: z.coerce.number().min(0).optional(),
  currency: currencySchema.default('INR'),
  expectedCloseDate: dateSchema.optional(),
  notes: z.string().optional(),
});

export type LeadCreateFormData = z.infer<typeof leadCreateSchema>;

// ============ QUOTATION ============
export const quotationCreateSchema = z.object({
  leadId: z.string().optional(),
  clientId: z.string().optional(),
  validUntilDate: dateSchema,
  items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.coerce.number().min(1),
    unitPrice: z.coerce.number().min(0),
    discount: z.coerce.number().min(0).optional(),
    tax: z.coerce.number().min(0).optional(),
  })).min(1, 'Add at least one item'),
  tax: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).optional(),
  currency: currencySchema.default('INR'),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

export type QuotationCreateFormData = z.infer<typeof quotationCreateSchema>;

// ============ INVOICE ============
export const invoiceCreateSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  issueDate: dateSchema,
  dueDate: dateSchema,
  items: z.array(z.object({
    description: z.string().min(1),
    quantity: z.coerce.number().min(1),
    unitPrice: z.coerce.number().min(0),
    discount: z.coerce.number().min(0).optional(),
    tax: z.coerce.number().min(0).optional(),
  })).min(1, 'Add at least one item'),
  tax: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).optional(),
  currency: currencySchema.default('INR'),
  notes: z.string().optional(),
  terms: z.string().optional(),
});

export type InvoiceCreateFormData = z.infer<typeof invoiceCreateSchema>;

// ============ PAYMENT ============
export const paymentCreateSchema = z.object({
  invoiceId: z.string().min(1, 'Invoice is required'),
  amount: z.coerce.number().min(0, 'Amount must be positive'),
  paymentMethod: z.enum(['Bank Transfer', 'Credit Card', 'Cheque', 'Cash', 'UPI', 'Other']),
  transactionId: z.string().optional(),
  paymentDate: dateSchema,
  notes: z.string().optional(),
});

export type PaymentCreateFormData = z.infer<typeof paymentCreateSchema>;
