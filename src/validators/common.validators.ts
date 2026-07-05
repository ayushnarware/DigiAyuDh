import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a number');

export const phoneSchema = z
  .string()
  .regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number');

export const gstSchema = z
  .string()
  .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number');

export const panSchema = z
  .string()
  .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number');

export const ifscSchema = z
  .string()
  .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code');

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
  remember: z.boolean().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: emailSchema,
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
