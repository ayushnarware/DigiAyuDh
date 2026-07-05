import { PortalLayout } from '@/layouts/portal-layout';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Employees', href: '/admin/employees' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminDashboardPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage clients, projects, and team operations</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Clients', value: '48' },
            { label: 'Active Projects', value: '24' },
            { label: 'Team Members', value: '16' },
            { label: 'Revenue (MTD)', value: '₹12.4L' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}

export function AdminClientsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <h1 className="text-2xl font-bold">Clients</h1>
    </PortalLayout>
  );
}

export function AdminProjectsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <h1 className="text-2xl font-bold">Projects</h1>
    </PortalLayout>
  );
}

export function AdminEmployeesPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <h1 className="text-2xl font-bold">Employees</h1>
    </PortalLayout>
  );
}

export function AdminSettingsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <h1 className="text-2xl font-bold">Settings</h1>
    </PortalLayout>
  );
}
