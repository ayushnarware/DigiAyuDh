// User Profile Domain Types

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  role: UserRole;
  department?: string;
  designation?: string;
  company?: string;
  companyRegistration?: string;
  gst?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  bio?: string;
  avatar?: string;
}

export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType: 'billing' | 'shipping' | 'both';
}

export interface CompanyInfo {
  companyName: string;
  companyRegistration: string;
  gst: string;
  pan?: string;
  industryType: string;
  companySize: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  website?: string;
  phone?: string;
}

export interface SecuritySettings {
  password?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  twoFactorEnabled: boolean;
  twoFactorMethod?: 'sms' | 'email' | 'authenticator';
  backupCodes?: string[];
  lastPasswordChange?: Date;
}

export interface DeviceSession {
  id: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  lastActivity: Date;
  createdAt: Date;
  isCurrent: boolean;
}

export interface NotificationPreference {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  projectUpdates: boolean;
  teamMentions: boolean;
  assignedTasks: boolean;
  systemAlerts: boolean;
  marketingEmails: boolean;
  weeklyDigest: boolean;
}

export interface PreferenceSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  timeFormat: '12h' | '24h';
  currency: string;
  theme: 'light' | 'dark' | 'auto';
  sidebarCollapsed: boolean;
  compactView: boolean;
}

export interface DocumentInfo {
  id: string;
  type: 'passport' | 'driving_license' | 'national_id' | 'visa' | 'other';
  documentNumber: string;
  issuedDate: Date;
  expiryDate?: Date;
  issuingCountry: string;
  verified: boolean;
  verificationDate?: Date;
}

export interface BankInfo {
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  ifscCode: string;
  accountType: 'savings' | 'current' | 'other';
  verified: boolean;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
}

export interface SocialLink {
  platform: 'linkedin' | 'twitter' | 'github' | 'portfolio' | 'other';
  url: string;
  verified: boolean;
}

export type UserRole = 'super_admin' | 'admin' | 'client' | 'employee' | 'manager' | 'cto' | 'ceo';

// API Request/Response DTOs

export interface UpdateProfileRequest {
  personalInfo: Partial<PersonalInfo>;
  addressInfo?: Partial<AddressInfo>;
  companyInfo?: Partial<CompanyInfo>;
  notificationPreferences?: Partial<NotificationPreference>;
  preferenceSettings?: Partial<PreferenceSettings>;
}

export interface UpdateSecurityRequest {
  currentPassword: string;
  newPassword?: string;
  twoFactorMethod?: 'sms' | 'email' | 'authenticator';
  disableTwoFactor?: boolean;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UploadAvatarRequest {
  file: File;
}

export interface UploadDocumentRequest {
  file: File;
  documentType: DocumentInfo['type'];
  documentNumber: string;
  issuedDate: Date;
  expiryDate?: Date;
  issuingCountry: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: UserProfile;
  errors?: Record<string, string>;
}

export interface ProfileListResponse {
  success: boolean;
  data: UserProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
