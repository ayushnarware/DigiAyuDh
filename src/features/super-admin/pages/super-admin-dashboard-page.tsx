import { Zap, Users, Activity, TrendingUp } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TenantsTable } from '@/features/super-admin/components/tenants-table';

const superAdminNav = [
  { label: 'Dashboard', href: '/super-admin/dashboard' },
  { label: 'Tenants', href: '/super-admin/tenants' },
  { label: 'Settings', href: '/super-admin/settings' },
];

const metrics = [
  { label: 'Total Tenants', value: '12', icon: Zap, change: '+2 this month' },
  { label: 'Platform Users', value: '1,248', icon: Users, change: '+145 new' },
  { label: 'System Health', value: '99.9%', icon: Activity, change: 'All systems up' },
  { label: 'MRR Growth', value: '₹20.4L', icon: TrendingUp, change: '↗ 23% vs last month' },
];

export default function SuperAdminDashboardPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Platform Dashboard</h1>
          <p className="text-muted-foreground">System overview and platform analytics</p>
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

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'API Server', status: 'Operational', uptime: '100%' },
                { name: 'Database', status: 'Operational', uptime: '99.99%' },
                { name: 'Cache Layer', status: 'Operational', uptime: '100%' },
                { name: 'Email Service', status: 'Operational', uptime: '99.9%' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <p className="text-sm font-medium">{item.name}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Uptime: {item.uptime}</span>
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function SuperAdminTenantsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tenants</h1>
          <p className="text-muted-foreground">Manage all platform tenants and their configurations</p>
        </div>
        <TenantsTable />
      </div>
    </PortalLayout>
  );
}

export function SuperAdminSettingsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and configurations</p>
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
