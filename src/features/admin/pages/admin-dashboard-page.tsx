import { FolderKanban, Users, TrendingUp } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClientsTable } from '@/features/admin/components/clients-table';
import { ProjectsTable } from '@/features/admin/components/projects-table';
import { EmployeesTable } from '@/features/admin/components/employees-table';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Employees', href: '/admin/employees' },
  { label: 'Settings', href: '/admin/settings' },
];

const metrics = [
  { label: 'Total Clients', value: '48', icon: Users, change: '+5 this month' },
  { label: 'Active Projects', value: '24', icon: FolderKanban, change: '12 in progress' },
  { label: 'Team Members', value: '16', icon: Users, change: '+2 new hires' },
  { label: 'Revenue (MTD)', value: '₹12.4L', icon: TrendingUp, change: '↗ 18% vs last month' },
];

export default function AdminDashboardPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of business metrics and operations</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {m.label}
                </CardTitle>
                <m.icon className="size-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}

export function AdminClientsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage and track all client accounts</p>
        </div>
        <ClientsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminProjectsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Track all active and completed projects</p>
        </div>
        <ProjectsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminEmployeesPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-muted-foreground">Manage team members and assignments</p>
        </div>
        <EmployeesTable />
      </div>
    </PortalLayout>
  );
}

export function AdminSettingsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure system and admin preferences</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Settings page coming soon</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
