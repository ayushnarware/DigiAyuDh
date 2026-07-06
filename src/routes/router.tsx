import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { GuestRoute, ProtectedRoute } from '@/routes/guards';

const HomePage = lazy(() => import('@/features/public/pages/home-page'));
const LoginPage = lazy(() => import('@/features/auth/pages/login-page'));
const NotFoundPage = lazy(() =>
  import('@/features/public/pages/error-pages').then((m) => ({ default: m.default })),
);
const UnauthorizedPage = lazy(() =>
  import('@/features/public/pages/error-pages').then((m) => ({ default: m.UnauthorizedPage })),
);

const ClientDashboardPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.default,
  })),
);
const ClientProjectsPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientProjectsPage,
  })),
);
const ClientSupportPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientSupportPage,
  })),
);
const ClientProfilePage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientProfilePage,
  })),
);

const EmployeeDashboardPage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page'),
);
const EmployeeTasksPage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeTasksPage,
  })),
);
const EmployeeProfilePage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeProfilePage,
  })),
);

const AdminDashboardPage = lazy(() => import('@/features/admin/pages/admin-dashboard-page'));
const AdminClientsPage = lazy(() =>
  import('@/features/admin/pages/client-management-page'),
);
const AdminOperationalPage = lazy(() =>
  import('@/features/admin/pages/admin-operational-page'),
);
const AdminProjectsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminProjectsPage,
  })),
);
const AdminEmployeesPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminEmployeesPage,
  })),
);
const AdminSettingsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminSettingsPage,
  })),
);

const SuperAdminDashboardPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page'),
);
const SuperAdminTenantsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminTenantsPage,
  })),
);
const SuperAdminCompanyManagementPage = lazy(() =>
  import('@/features/super-admin/pages/company-management-page'),
);
const SuperAdminAdminManagementPage = lazy(() =>
  import('@/features/super-admin/pages/admin-management-page'),
);
const SuperAdminEmployeeManagementPage = lazy(() =>
  import('@/features/super-admin/pages/employee-management-page'),
);
const SuperAdminSettingsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminSettingsPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-4 w-full max-w-md p-8">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(<HomePage />),
  },
  {
    element: <GuestRoute />,
    children: [
      {
        path: '/login',
        element: withSuspense(<LoginPage />),
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['CLIENT']} />,
    children: [
      { path: '/client/dashboard', element: withSuspense(<ClientDashboardPage />) },
      { path: '/client/projects', element: withSuspense(<ClientProjectsPage />) },
      { path: '/client/support', element: withSuspense(<ClientSupportPage />) },
      { path: '/client/profile', element: withSuspense(<ClientProfilePage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['EMPLOYEE']} />,
    children: [
      { path: '/employee/dashboard', element: withSuspense(<EmployeeDashboardPage />) },
      { path: '/employee/tasks', element: withSuspense(<EmployeeTasksPage />) },
      { path: '/employee/profile', element: withSuspense(<EmployeeProfilePage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      { path: '/admin/dashboard', element: withSuspense(<AdminDashboardPage />) },
      { path: '/admin/clients', element: withSuspense(<AdminClientsPage />) },
      { path: '/admin/operations', element: withSuspense(<AdminOperationalPage />) },
      { path: '/admin/projects', element: withSuspense(<AdminProjectsPage />) },
      { path: '/admin/employees', element: withSuspense(<AdminEmployeesPage />) },
      { path: '/admin/settings', element: withSuspense(<AdminSettingsPage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']} />,
    children: [
      { path: '/super-admin/dashboard', element: withSuspense(<SuperAdminDashboardPage />) },
      { path: '/super-admin/tenants', element: withSuspense(<SuperAdminTenantsPage />) },
      { path: '/super-admin/companies', element: withSuspense(<SuperAdminCompanyManagementPage />) },
      { path: '/super-admin/admins', element: withSuspense(<SuperAdminAdminManagementPage />) },
      { path: '/super-admin/employees', element: withSuspense(<SuperAdminEmployeeManagementPage />) },
      { path: '/super-admin/settings', element: withSuspense(<SuperAdminSettingsPage />) },
    ],
  },
  { path: '/unauthorized', element: withSuspense(<UnauthorizedPage />) },
  { path: '*', element: withSuspense(<NotFoundPage />) },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
