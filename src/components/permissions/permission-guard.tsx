import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { Permission, UserRole } from '@/types/rbac.types';

interface PermissionGuardProps {
  permission?: Permission;
  role?: UserRole;
  roles?: UserRole[];
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * Component that conditionally renders children based on user permissions
 * Supports permission-based or role-based access control
 */
export function PermissionGuard({
  permission,
  role,
  roles,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const { canPerform, hasRole, hasAnyRole } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = canPerform(permission).hasPermission;
  } else if (role) {
    hasAccess = hasRole(role);
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles);
  } else {
    // No specific permission/role requirement
    hasAccess = true;
  }

  return hasAccess ? children : fallback;
}

interface ProtectedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  permission?: Permission;
  role?: UserRole;
  roles?: UserRole[];
  tooltip?: string;
  children: ReactNode;
}

/**
 * Button component that is disabled or hidden based on permissions
 */
export function ProtectedButton({
  permission,
  role,
  roles,
  tooltip,
  disabled,
  children,
  ...props
}: ProtectedButtonProps) {
  const { canPerform, hasRole, hasAnyRole } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = canPerform(permission).hasPermission;
  } else if (role) {
    hasAccess = hasRole(role);
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles);
  } else {
    hasAccess = true;
  }

  return (
    <button
      disabled={disabled || !hasAccess}
      title={!hasAccess ? tooltip || 'You do not have permission for this action' : undefined}
      {...props}
    >
      {children}
    </button>
  );
}

interface ProtectedMenuItemProps {
  permission?: Permission;
  role?: UserRole;
  roles?: UserRole[];
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  danger?: boolean;
}

/**
 * Menu item that respects user permissions
 */
export function ProtectedMenuItem({
  permission,
  role,
  roles,
  label,
  onClick,
  icon,
  danger,
}: ProtectedMenuItemProps) {
  const { canPerform, hasRole, hasAnyRole } = usePermissions();

  let hasAccess = false;

  if (permission) {
    hasAccess = canPerform(permission).hasPermission;
  } else if (role) {
    hasAccess = hasRole(role);
  } else if (roles && roles.length > 0) {
    hasAccess = hasAnyRole(roles);
  } else {
    hasAccess = true;
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
        danger
          ? 'hover:bg-red-50 text-red-700 hover:text-red-800'
          : 'hover:bg-muted text-foreground'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
