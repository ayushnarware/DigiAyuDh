import { useAuth } from '@/contexts/auth.context';
import { Permission, UserRole } from '@/types/rbac.types';

// Default role-based permission mappings
const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    Permission.MANAGE_PLATFORM,
    Permission.MANAGE_TENANTS,
    Permission.MANAGE_ROLES,
    Permission.MANAGE_PERMISSIONS,
    Permission.VIEW_AUDIT_LOGS,
    Permission.MANAGE_SECURITY,
    Permission.MANAGE_EMPLOYEES,
    Permission.MANAGE_CLIENTS,
    Permission.MANAGE_PROJECTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_INVOICES,
    Permission.CREATE,
    Permission.READ,
    Permission.UPDATE,
    Permission.DELETE,
    Permission.EXPORT,
    Permission.IMPORT,
  ],
  [UserRole.ADMIN]: [
    Permission.MANAGE_EMPLOYEES,
    Permission.MANAGE_CLIENTS,
    Permission.MANAGE_PROJECTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_INVOICES,
    Permission.CREATE,
    Permission.READ,
    Permission.UPDATE,
    Permission.DELETE,
    Permission.EXPORT,
    Permission.APPROVE,
    Permission.REJECT,
    Permission.ARCHIVE,
    Permission.RESTORE,
  ],
  [UserRole.MANAGER]: [
    Permission.MANAGE_TEAM,
    Permission.ASSIGN_TASKS,
    Permission.APPROVE_TIMESHEETS,
    Permission.VIEW_REPORTS,
    Permission.VIEW_OWN_TASKS,
    Permission.UPDATE_OWN_PROFILE,
    Permission.READ,
    Permission.UPDATE,
    Permission.ASSIGN,
    Permission.UNASSIGN,
    Permission.EXPORT,
  ],
  [UserRole.EMPLOYEE]: [
    Permission.VIEW_OWN_TASKS,
    Permission.UPDATE_OWN_PROFILE,
    Permission.SUBMIT_TIMESHEETS,
    Permission.VIEW_PROJECTS,
    Permission.READ,
    Permission.UPDATE,
  ],
  [UserRole.CLIENT]: [
    Permission.VIEW_OWN_PROJECTS,
    Permission.MANAGE_SUPPORT_TICKETS,
    Permission.VIEW_INVOICES,
    Permission.DOWNLOAD_REPORTS,
    Permission.READ,
    Permission.UPDATE,
  ],
  [UserRole.CTO]: [
    Permission.MANAGE_EMPLOYEES,
    Permission.MANAGE_PROJECTS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_ANALYTICS,
    Permission.CREATE,
    Permission.READ,
    Permission.UPDATE,
    Permission.DELETE,
    Permission.EXPORT,
    Permission.IMPORT,
    Permission.ASSIGN,
  ],
  [UserRole.CEO]: [
    Permission.VIEW_ANALYTICS,
    Permission.VIEW_AUDIT_LOGS,
    Permission.MANAGE_SETTINGS,
    Permission.VIEW_REPORTS,
    Permission.READ,
    Permission.EXPORT,
    Permission.DOWNLOAD_REPORTS,
  ],
};

export function usePermissions() {
  const { user } = useAuth();

  const canPerform = (permission: Permission): { hasPermission: boolean; reason?: string } => {
    if (!user) {
      return {
        hasPermission: false,
        reason: 'User not authenticated',
      };
    }

    const userRole = (user.role || 'employee') as UserRole;
    const permissions = ROLE_PERMISSIONS[userRole] || [];

    if (permissions.includes(permission)) {
      return { hasPermission: true };
    }

    return {
      hasPermission: false,
      reason: `User role '${userRole}' does not have permission '${permission}'`,
    };
  };

  const canCreate = (): boolean => {
    return canPerform(Permission.CREATE).hasPermission;
  };

  const canRead = (): boolean => {
    return canPerform(Permission.READ).hasPermission;
  };

  const canUpdate = (): boolean => {
    return canPerform(Permission.UPDATE).hasPermission;
  };

  const canDelete = (): boolean => {
    return canPerform(Permission.DELETE).hasPermission;
  };

  const canApprove = (): boolean => {
    return canPerform(Permission.APPROVE).hasPermission;
  };

  const canReject = (): boolean => {
    return canPerform(Permission.REJECT).hasPermission;
  };

  const canExport = (): boolean => {
    return canPerform(Permission.EXPORT).hasPermission;
  };

  const canImport = (): boolean => {
    return canPerform(Permission.IMPORT).hasPermission;
  };

  const canArchive = (): boolean => {
    return canPerform(Permission.ARCHIVE).hasPermission;
  };

  const canRestore = (): boolean => {
    return canPerform(Permission.RESTORE).hasPermission;
  };

  const canAssign = (): boolean => {
    return canPerform(Permission.ASSIGN).hasPermission;
  };

  const canViewAuditLogs = (): boolean => {
    return canPerform(Permission.VIEW_AUDIT_LOGS).hasPermission;
  };

  const canManageSecurity = (): boolean => {
    return canPerform(Permission.MANAGE_SECURITY).hasPermission;
  };

  const canManageUsers = (): boolean => {
    return canPerform(Permission.MANAGE_EMPLOYEES).hasPermission || canPerform(Permission.MANAGE_CLIENTS).hasPermission;
  };

  const isSuperAdmin = (): boolean => {
    return (user?.role as string) === 'super_admin';
  };

  const isAdmin = (): boolean => {
    return (user?.role as string) === 'admin';
  };

  const isManager = (): boolean => {
    return (user?.role as string) === 'manager';
  };

  const isEmployee = (): boolean => {
    return (user?.role as string) === 'employee';
  };

  const isClient = (): boolean => {
    return (user?.role as string) === 'client';
  };

  const hasRole = (role: UserRole): boolean => {
    return (user?.role as string) === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return roles.includes(user?.role as UserRole);
  };

  return {
    user,
    canPerform,
    canCreate,
    canRead,
    canUpdate,
    canDelete,
    canApprove,
    canReject,
    canExport,
    canImport,
    canArchive,
    canRestore,
    canAssign,
    canViewAuditLogs,
    canManageSecurity,
    canManageUsers,
    isSuperAdmin,
    isAdmin,
    isManager,
    isEmployee,
    isClient,
    hasRole,
    hasAnyRole,
  };
}
