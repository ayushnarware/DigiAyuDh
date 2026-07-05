import { PortalLayout } from '@/layouts/portal-layout';

const employeeNav = [
  { label: 'Dashboard', href: '/employee/dashboard' },
  { label: 'Tasks', href: '/employee/tasks' },
  { label: 'Profile', href: '/employee/profile' },
];

export default function EmployeeDashboardPage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Employee Dashboard</h1>
          <p className="text-muted-foreground">Your tasks and assignments</p>
        </div>
        <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">Employee portal modules — ready for backend integration</p>
        </div>
      </div>
    </PortalLayout>
  );
}

export function EmployeeTasksPage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <h1 className="text-2xl font-bold">Tasks</h1>
    </PortalLayout>
  );
}

export function EmployeeProfilePage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <h1 className="text-2xl font-bold">Profile</h1>
    </PortalLayout>
  );
}
