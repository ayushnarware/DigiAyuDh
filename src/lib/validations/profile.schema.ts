import { z } from 'zod';

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']).optional(),
  bio: z.string().max(500, 'Bio must not exceed 500 characters').optional(),
});

export const addressInfoSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5,}$/, 'Invalid zip code'),
  country: z.string().min(2, 'Country is required'),
  addressType: z.enum(['billing', 'shipping', 'both']),
});

export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  companyRegistration: z.string().min(5, 'Company registration number is required'),
  gst: z.string().regex(/^[0-9A-Z]{15}$/, 'Invalid GST number format'),
  pan: z.string().optional(),
  industryType: z.string().min(2, 'Industry type is required'),
  companySize: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']),
  website: z.string().url('Invalid website URL').optional(),
  phone: z.string().optional(),
});

export const securitySettingsSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters').optional(),
  confirmPassword: z.string().optional(),
  twoFactorMethod: z.enum(['sms', 'email', 'authenticator']).optional(),
}).refine(
  (data) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      return false;
    }
    return true;
  },
  { message: 'Passwords do not match', path: ['confirmPassword'] }
);

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  { message: 'Passwords do not match', path: ['confirmPassword'] }
);

export const notificationPreferencesSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  projectUpdates: z.boolean(),
  teamMentions: z.boolean(),
  assignedTasks: z.boolean(),
  systemAlerts: z.boolean(),
  marketingEmails: z.boolean(),
  weeklyDigest: z.boolean(),
});

export const preferenceSettingsSchema = z.object({
  language: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
  timeFormat: z.enum(['12h', '24h']),
  currency: z.string(),
  theme: z.enum(['light', 'dark', 'auto']),
  sidebarCollapsed: z.boolean(),
  compactView: z.boolean(),
});

export const documentInfoSchema = z.object({
  type: z.enum(['passport', 'driving_license', 'national_id', 'visa', 'other']),
  documentNumber: z.string().min(5, 'Document number is required'),
  issuedDate: z.date(),
  expiryDate: z.date().optional(),
  issuingCountry: z.string().min(2, 'Issuing country is required'),
});

export const bankInfoSchema = z.object({
  accountHolder: z.string().min(2, 'Account holder name is required'),
  accountNumber: z.string().regex(/^\d{8,17}$/, 'Invalid account number'),
  bankName: z.string().min(2, 'Bank name is required'),
  ifscCode: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code'),
  accountType: z.enum(['savings', 'current', 'other']),
});

export const emergencyContactSchema = z.object({
  name: z.string().min(2, 'Contact name is required'),
  relationship: z.string().min(2, 'Relationship is required'),
  phone: z.string().regex(/^\+?[\d\s-()]{10,}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email').optional(),
  address: z.string().optional(),
});

export const socialLinkSchema = z.object({
  platform: z.enum(['linkedin', 'twitter', 'github', 'portfolio', 'other']),
  url: z.string().url('Invalid URL'),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type AddressInfoFormData = z.infer<typeof addressInfoSchema>;
export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;
export type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type NotificationPreferencesFormData = z.infer<typeof notificationPreferencesSchema>;
export type PreferenceSettingsFormData = z.infer<typeof preferenceSettingsSchema>;
export type DocumentInfoFormData = z.infer<typeof documentInfoSchema>;
export type BankInfoFormData = z.infer<typeof bankInfoSchema>;
export type EmergencyContactFormData = z.infer<typeof emergencyContactSchema>;
export type SocialLinkFormData = z.infer<typeof socialLinkSchema>;
