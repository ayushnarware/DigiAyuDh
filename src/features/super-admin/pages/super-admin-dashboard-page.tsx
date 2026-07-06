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
          <h1 className="text-2xl font-bold">Platform Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings and configurations</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Platform Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Platform Name</label>
                <input
                  type="text"
                  defaultValue="DigiAyuDh Enterprise Platform"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Platform URL</label>
                <input
                  type="url"
                  defaultValue="https://digiayudh.com"
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
                <label className="block text-sm font-medium mb-2">Support Phone</label>
                <input
                  type="tel"
                  defaultValue="+91-XXXXXXXXXX"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>License & Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <p className="text-sm font-medium text-purple-900">License Status: Active</p>
                <p className="text-xs text-purple-700 mt-1">Valid until: December 31, 2024</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Tenants</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Users Per Tenant</label>
                <input
                  type="number"
                  defaultValue="500"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Session Timeout (minutes)</label>
                <input
                  type="number"
                  defaultValue="30"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password Expiry (days)</label>
                <input
                  type="number"
                  defaultValue="90"
                  className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium">Require 2FA for Admins</p>
                  <p className="text-xs text-muted-foreground">Enforce two-factor authentication</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium">Enable Audit Logging</p>
                  <p className="text-xs text-muted-foreground">Log all admin activities</p>
                </div>
                <input type="checkbox" defaultChecked className="w-5 h-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Flags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'AI Integration', enabled: true },
                { name: 'Multi-Language Support', enabled: true },
                { name: 'Advanced Analytics', enabled: false },
                { name: 'Custom Branding', enabled: true },
                { name: 'API Access', enabled: true },
              ].map((flag) => (
                <div key={flag.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <p className="text-sm font-medium">{flag.name}</p>
                  <input type="checkbox" defaultChecked={flag.enabled} className="w-5 h-5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                <p className="text-sm font-medium text-green-900">Last Backup: Today at 02:30 AM</p>
                <p className="text-xs text-green-700 mt-1">Status: Successful</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                  Schedule Backup
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                  Restore Backup
                </button>
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
