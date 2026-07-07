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
const ClientInvoicesPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientInvoicesPage,
  })),
);
const ClientContractsPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientContractsPage,
  })),
);
const ClientPaymentsPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientPaymentsPage,
  })),
);
const ClientTeamPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientTeamPage,
  })),
);
const ClientDocumentsPage = lazy(() =>
  import('@/features/client/pages/client-dashboard-page').then((m) => ({
    default: m.ClientDocumentsPage,
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
const EmployeeAttendancePage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeAttendancePage,
  })),
);
const EmployeeLeavePage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeLeavePage,
  })),
);
const EmployeePayrollPage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeePayrollPage,
  })),
);
const EmployeeMeetingsPage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeMeetingsPage,
  })),
);
const EmployeeDocumentsPage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeDocumentsPage,
  })),
);
const EmployeePerformancePage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeePerformancePage,
  })),
);
const EmployeeProfilePage = lazy(() =>
  import('@/features/employee/pages/employee-dashboard-page').then((m) => ({
    default: m.EmployeeProfilePage,
  })),
);

const AdminDashboardPage = lazy(() => import('@/features/admin/pages/admin-dashboard-page'));
const AdminEmployeesPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminEmployeesPage,
  })),
);
const AdminClientsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminClientsPage,
  })),
);
const AdminProjectsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminProjectsPage,
  })),
);
const AdminTeamsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminTeamsPage,
  })),
);
const AdminDepartmentsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminDepartmentsPage,
  })),
);
const AdminDesignationsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminDesignationsPage,
  })),
);
const AdminMeetingsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminMeetingsPage,
  })),
);
const AdminDocumentsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminDocumentsPage,
  })),
);
const AdminReportsPage = lazy(() =>
  import('@/features/admin/pages/admin-dashboard-page').then((m) => ({
    default: m.AdminReportsPage,
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
const SuperAdminCompaniesPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminCompaniesPage,
  })),
);
const SuperAdminAdminsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminAdminsPage,
  })),
);
const SuperAdminDepartmentsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminDepartmentsPage,
  })),
);
const SuperAdminDesignationsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminDesignationsPage,
  })),
);
const SuperAdminRolesPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminRolesPage,
  })),
);
const SuperAdminPermissionsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminPermissionsPage,
  })),
);
const SuperAdminFinancePage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminFinancePage,
  })),
);
const SuperAdminReportsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminReportsPage,
  })),
);
const SuperAdminAuditLogsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminAuditLogsPage,
  })),
);
const SuperAdminBackupPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminBackupPage,
  })),
);
const SuperAdminSettingsPage = lazy(() =>
  import('@/features/super-admin/pages/super-admin-dashboard-page').then((m) => ({
    default: m.SuperAdminSettingsPage,
  })),
);

const CRMDashboardPage = lazy(() =>
  import('@/features/crm/pages/crm-dashboard-page'),
);
const CRMLeadsPage = lazy(() =>
  import('@/features/crm/pages/crm-dashboard-page').then((m) => ({
    default: m.CRMLeadsPage,
  })),
);
const CRMQuotationsPage = lazy(() =>
  import('@/features/crm/pages/crm-dashboard-page').then((m) => ({
    default: m.CRMQuotationsPage,
  })),
);
const CRMMeetingsPage = lazy(() =>
  import('@/features/crm/pages/crm-dashboard-page').then((m) => ({
    default: m.CRMMeetingsPage,
  })),
);
const CRMCommunicationPage = lazy(() =>
  import('@/features/crm/pages/crm-dashboard-page').then((m) => ({
    default: m.CRMCommunicationPage,
  })),
);

const FinanceDashboardPage = lazy(() =>
  import('@/features/finance/pages/finance-dashboard-page'),
);
const FinanceInvoicesPage = lazy(() =>
  import('@/features/finance/pages/finance-dashboard-page').then((m) => ({
    default: m.FinanceInvoicesPage,
  })),
);
const FinancePaymentsPage = lazy(() =>
  import('@/features/finance/pages/finance-dashboard-page').then((m) => ({
    default: m.FinancePaymentsPage,
  })),
);
const FinanceReportsPage = lazy(() =>
  import('@/features/finance/pages/finance-dashboard-page').then((m) => ({
    default: m.FinanceReportsPage,
  })),
);

const MessagingPage = lazy(() =>
  import('@/features/messaging/pages/messaging-page'),
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
      { path: '/client/invoices', element: withSuspense(<ClientInvoicesPage />) },
      { path: '/client/contracts', element: withSuspense(<ClientContractsPage />) },
      { path: '/client/payments', element: withSuspense(<ClientPaymentsPage />) },
      { path: '/client/team', element: withSuspense(<ClientTeamPage />) },
      { path: '/client/documents', element: withSuspense(<ClientDocumentsPage />) },
      { path: '/client/support', element: withSuspense(<ClientSupportPage />) },
      { path: '/client/profile', element: withSuspense(<ClientProfilePage />) },
      { path: '/client/messages', element: withSuspense(<MessagingPage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['EMPLOYEE']} />,
    children: [
      { path: '/employee/dashboard', element: withSuspense(<EmployeeDashboardPage />) },
      { path: '/employee/tasks', element: withSuspense(<EmployeeTasksPage />) },
      { path: '/employee/attendance', element: withSuspense(<EmployeeAttendancePage />) },
      { path: '/employee/leave', element: withSuspense(<EmployeeLeavePage />) },
      { path: '/employee/payroll', element: withSuspense(<EmployeePayrollPage />) },
      { path: '/employee/meetings', element: withSuspense(<EmployeeMeetingsPage />) },
      { path: '/employee/documents', element: withSuspense(<EmployeeDocumentsPage />) },
      { path: '/employee/performance', element: withSuspense(<EmployeePerformancePage />) },
      { path: '/employee/profile', element: withSuspense(<EmployeeProfilePage />) },
      { path: '/employee/messages', element: withSuspense(<MessagingPage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      { path: '/admin/dashboard', element: withSuspense(<AdminDashboardPage />) },
      { path: '/admin/employees', element: withSuspense(<AdminEmployeesPage />) },
      { path: '/admin/clients', element: withSuspense(<AdminClientsPage />) },
      { path: '/admin/projects', element: withSuspense(<AdminProjectsPage />) },
      { path: '/admin/teams', element: withSuspense(<AdminTeamsPage />) },
      { path: '/admin/departments', element: withSuspense(<AdminDepartmentsPage />) },
      { path: '/admin/designations', element: withSuspense(<AdminDesignationsPage />) },
      { path: '/admin/meetings', element: withSuspense(<AdminMeetingsPage />) },
      { path: '/admin/documents', element: withSuspense(<AdminDocumentsPage />) },
      { path: '/admin/reports', element: withSuspense(<AdminReportsPage />) },
      { path: '/admin/settings', element: withSuspense(<AdminSettingsPage />) },
      { path: '/admin/messages', element: withSuspense(<MessagingPage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['SUPER_ADMIN']} />,
    children: [
      { path: '/super-admin/dashboard', element: withSuspense(<SuperAdminDashboardPage />) },
      { path: '/super-admin/tenants', element: withSuspense(<SuperAdminTenantsPage />) },
      { path: '/super-admin/companies', element: withSuspense(<SuperAdminCompaniesPage />) },
      { path: '/super-admin/admins', element: withSuspense(<SuperAdminAdminsPage />) },
      { path: '/super-admin/departments', element: withSuspense(<SuperAdminDepartmentsPage />) },
      { path: '/super-admin/designations', element: withSuspense(<SuperAdminDesignationsPage />) },
      { path: '/super-admin/roles', element: withSuspense(<SuperAdminRolesPage />) },
      { path: '/super-admin/permissions', element: withSuspense(<SuperAdminPermissionsPage />) },
      { path: '/super-admin/finance', element: withSuspense(<SuperAdminFinancePage />) },
      { path: '/super-admin/reports', element: withSuspense(<SuperAdminReportsPage />) },
      { path: '/super-admin/audit-logs', element: withSuspense(<SuperAdminAuditLogsPage />) },
      { path: '/super-admin/backup', element: withSuspense(<SuperAdminBackupPage />) },
      { path: '/super-admin/settings', element: withSuspense(<SuperAdminSettingsPage />) },
      { path: '/super-admin/messages', element: withSuspense(<MessagingPage />) },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      { path: '/crm/dashboard', element: withSuspense(<CRMDashboardPage />) },
      { path: '/crm/leads', element: withSuspense(<CRMLeadsPage />) },
      { path: '/crm/quotations', element: withSuspense(<CRMQuotationsPage />) },
      { path: '/crm/meetings', element: withSuspense(<CRMMeetingsPage />) },
      { path: '/crm/communication', element: withSuspense(<CRMCommunicationPage />) },
      { path: '/finance/dashboard', element: withSuspense(<FinanceDashboardPage />) },
      { path: '/finance/invoices', element: withSuspense(<FinanceInvoicesPage />) },
      { path: '/finance/payments', element: withSuspense(<FinancePaymentsPage />) },
      { path: '/finance/reports', element: withSuspense(<FinanceReportsPage />) },
    ],
  },
  { path: '/unauthorized', element: withSuspense(<UnauthorizedPage />) },
  { path: '*', element: withSuspense(<NotFoundPage />) },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
