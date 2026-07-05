import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context';
import type { UserRole } from '@/types/auth.types';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({
  allowedRoles,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    const dashboardMap: Record<UserRole, string> = {
      CLIENT: '/client/dashboard',
      EMPLOYEE: '/employee/dashboard',
      ADMIN: '/admin/dashboard',
      SUPER_ADMIN: '/super-admin/dashboard',
    };
    return <Navigate to={dashboardMap[user.role]} replace />;
  }

  return <Outlet />;
}
