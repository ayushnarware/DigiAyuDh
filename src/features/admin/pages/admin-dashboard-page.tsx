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

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name</label>
                <input
                  type="text"
                  defaultValue="DigiAyuDh"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Support Email</label>
                <input
                  type="email"
                  defaultValue="support@digiayudh.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                  <option>IST (UTC+5:30)</option>
                  <option>EST (UTC-5:00)</option>
                  <option>GMT (UTC+0:00)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">API Base URL</label>
                <input
                  type="text"
                  defaultValue="https://api.digiayudh.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Provider</label>
                <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                  <option>AWS SES</option>
                  <option>SendGrid</option>
                  <option>Mailgun</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">From Address</label>
                <input
                  type="email"
                  defaultValue="noreply@digiayudh.com"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
              Reset to Defaults
            </button>
            <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
