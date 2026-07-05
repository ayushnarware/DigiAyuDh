import { PortalLayout } from '@/layouts/portal-layout';

const superAdminNav = [
  { label: 'Dashboard', href: '/super-admin/dashboard' },
  { label: 'Tenants', href: '/super-admin/tenants' },
  { label: 'Settings', href: '/super-admin/settings' },
];

export default function SuperAdminDashboardPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform-wide management and tenant oversight</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Total Tenants', value: '12' },
            { label: 'Platform Users', value: '1,248' },
            { label: 'System Health', value: '99.9%' },
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

export function SuperAdminTenantsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <h1 className="text-2xl font-bold">Tenants</h1>
    </PortalLayout>
  );
}

export function SuperAdminSettingsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <h1 className="text-2xl font-bold">Settings</h1>
    </PortalLayout>
  );
}
