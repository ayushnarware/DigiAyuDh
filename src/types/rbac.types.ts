// Role-Based Access Control Types

export const UserRole = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  EMPLOYEE: 'employee',
  CLIENT: 'client',
  CTO: 'cto',
  CEO: 'ceo',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Permission = {
  // Super Admin Permissions
  MANAGE_PLATFORM: 'manage_platform',
  MANAGE_TENANTS: 'manage_tenants',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_PERMISSIONS: 'manage_permissions',
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  MANAGE_SECURITY: 'manage_security',

  // Admin Permissions
  MANAGE_EMPLOYEES: 'manage_employees',
  MANAGE_CLIENTS: 'manage_clients',
  MANAGE_PROJECTS: 'manage_projects',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_INVOICES: 'manage_invoices',

  // Manager Permissions
  MANAGE_TEAM: 'manage_team',
  ASSIGN_TASKS: 'assign_tasks',
  APPROVE_TIMESHEETS: 'approve_timesheets',
  VIEW_REPORTS: 'view_reports',

  // Employee Permissions
  VIEW_OWN_TASKS: 'view_own_tasks',
  UPDATE_OWN_PROFILE: 'update_own_profile',
  SUBMIT_TIMESHEETS: 'submit_timesheets',
  VIEW_PROJECTS: 'view_projects',

  // Client Permissions
  VIEW_OWN_PROJECTS: 'view_own_projects',
  MANAGE_SUPPORT_TICKETS: 'manage_support_tickets',
  VIEW_INVOICES: 'view_invoices',
  DOWNLOAD_REPORTS: 'download_reports',

  // General Permissions
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  EXPORT: 'export',
  IMPORT: 'import',
  APPROVE: 'approve',
  REJECT: 'reject',
  ARCHIVE: 'archive',
  RESTORE: 'restore',
  ASSIGN: 'assign',
  UNASSIGN: 'unassign',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export interface RolePermissionMap {
  [UserRole.SUPER_ADMIN]: Permission[];
  [UserRole.ADMIN]: Permission[];
  [UserRole.MANAGER]: Permission[];
  [UserRole.EMPLOYEE]: Permission[];
  [UserRole.CLIENT]: Permission[];
  [UserRole.CTO]: Permission[];
  [UserRole.CEO]: Permission[];
}

export interface UserWithPermissions {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  departments?: string[];
  projects?: string[];
  restrictions?: UserRestriction[];
}

export interface UserRestriction {
  type: 'department' | 'project' | 'action' | 'time';
  value: string;
  reason?: string;
}

export interface AccessControlList {
  resource: string;
  roles: {
    [key in UserRole]?: Permission[];
  };
}

export interface PermissionCheck {
  hasPermission: boolean;
  reason?: string;
  requiresApproval?: boolean;
  approvers?: string[];
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, any>;
  status: 'success' | 'failure';
  timestamp: Date;
  ipAddress?: string;
  userAgent?: string;
}
