import { Zap, Users, Activity, TrendingUp, Server, Database, Lock, Zap as Spark, BarChart3, PieChart, CheckCircle2, Clock } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PremiumDashboardHeader } from '@/components/shared/premium-dashboard-header';
import { ModernKPICard } from '@/components/shared/modern-kpi-card';
import { ResponsiveDashboardGrid, ResponsiveChartsGrid, DashboardSection, DashboardContainer } from '@/components/shared/responsive-dashboard-grid';
import { TenantsTable } from '@/features/super-admin/components/tenants-table';

const superAdminNav = [
  { label: 'Dashboard', href: '/super-admin/dashboard' },
  { label: 'Companies', href: '/super-admin/companies' },
  { label: 'Admins', href: '/super-admin/admins' },
  { label: 'Departments', href: '/super-admin/departments' },
  { label: 'Designations', href: '/super-admin/designations' },
  { label: 'Roles', href: '/super-admin/roles' },
  { label: 'Permissions', href: '/super-admin/permissions' },
  { label: 'Finance', href: '/super-admin/finance' },
  { label: 'Reports', href: '/super-admin/reports' },
  { label: 'Audit Logs', href: '/super-admin/audit-logs' },
  { label: 'Backup', href: '/super-admin/backup' },
  { label: 'Settings', href: '/super-admin/settings' },
];

export default function SuperAdminDashboardPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <PremiumDashboardHeader
        title="Platform Control Center"
        subtitle="Real-time platform monitoring and management"
        companyName="DigiAyuDh Enterprise"
        showClock={true}
      />

      <DashboardContainer>
        {/* Executive Overview */}
        <DashboardSection
          title="Platform Overview"
          subtitle="Key metrics and platform health"
        >
          <ResponsiveDashboardGrid>
            <ModernKPICard
              title="Active Tenants"
              value="12"
              change={16.7}
              changeLabel="2 new this month"
              icon={Zap}
              color="blue"
              trend="up"
              miniChart={true}
              onClick={() => console.log('Navigate to companies')}
            />
            <ModernKPICard
              title="Platform Users"
              value="1,248"
              change={13}
              changeLabel="145 new users"
              icon={Users}
              color="purple"
              trend="up"
              miniChart={true}
            />
            <ModernKPICard
              title="System Health"
              value="99.9%"
              change={0.1}
              changeLabel="All systems operational"
              icon={Activity}
              color="green"
              trend="neutral"
              miniChart={true}
            />
            <ModernKPICard
              title="MRR"
              value="₹20.4L"
              change={23}
              changeLabel="Growing strong"
              icon={TrendingUp}
              color="cyan"
              trend="up"
              miniChart={true}
            />
          </ResponsiveDashboardGrid>
        </DashboardSection>

        {/* Charts Section */}
        <DashboardSection title="Analytics" subtitle="Platform performance and growth trends">
          <ResponsiveChartsGrid>
            <Card className="border hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chart ready for chart library integration</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  Tenant Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <PieChart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chart ready for chart library integration</p>
                </div>
              </CardContent>
            </Card>
          </ResponsiveChartsGrid>
        </DashboardSection>

        {/* System Status */}
        <DashboardSection title="System Status" subtitle="Real-time infrastructure monitoring">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { name: 'API Server', status: 'Operational', uptime: '100%', icon: Server, color: 'green' },
              { name: 'Database', status: 'Operational', uptime: '99.99%', icon: Database, color: 'green' },
              { name: 'Cache Layer', status: 'Operational', uptime: '100%', icon: Spark, color: 'green' },
              { name: 'Security', status: 'Secure', uptime: '100%', icon: Lock, color: 'green' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.name} className="border hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={`w-4 h-4 text-${item.color}-600`} />
                          <p className="text-sm font-medium truncate">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Uptime: {item.uptime}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                        <span className="text-xs font-medium text-muted-foreground">{item.status}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DashboardSection>

        {/* Quick Actions */}
        <DashboardSection title="Quick Actions" subtitle="Frequently used operations">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Add Tenant', icon: Zap, color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
              { label: 'View Reports', icon: BarChart3, color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
              { label: 'Manage Admins', icon: Users, color: 'bg-green-50 hover:bg-green-100 border-green-200' },
              { label: 'System Status', icon: Activity, color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200' },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="outline"
                  className={`h-24 flex flex-col items-center justify-center gap-2 ${action.color} transition-all`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium text-center">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </DashboardSection>

        {/* Recent Activity */}
        <DashboardSection title="Recent Activity" subtitle="Latest platform events">
          <Card className="border">
            <CardContent className="p-0">
              <div className="space-y-1 divide-y divide-border">
                {[
                  { time: '2 hours ago', action: 'New tenant registered', company: 'Acme Corp', icon: CheckCircle2, color: 'text-green-600' },
                  { time: '4 hours ago', action: 'API rate limit increased', company: 'System', icon: Spark, color: 'text-blue-600' },
                  { time: '1 day ago', action: 'Security update applied', company: 'System', icon: Lock, color: 'text-purple-600' },
                  { time: '2 days ago', action: 'Database backup completed', company: 'System', icon: Database, color: 'text-cyan-600' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-4 hover:bg-muted/50 transition-colors flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Icon className={`w-5 h-5 flex-shrink-0 ${item.color}`} />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.action}</p>
                          <p className="text-xs text-muted-foreground">{item.company}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground flex-shrink-0 whitespace-nowrap">{item.time}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </DashboardSection>

        {/* Tenants Table */}
        <DashboardSection title="Tenant Management" subtitle="Manage all platform tenants">
          <TenantsTable />
        </DashboardSection>
      </DashboardContainer>
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

// Companies Management
export function SuperAdminCompaniesPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Companies</h1>
            <p className="text-muted-foreground">Manage all registered companies</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Company
          </button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Companies table with CRUD operations</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Admin Management
export function SuperAdminAdminsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admins</h1>
            <p className="text-muted-foreground">Manage admin accounts and permissions</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Admin
          </button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Admins table with role assignments</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Departments Management
export function SuperAdminDepartmentsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Departments</h1>
            <p className="text-muted-foreground">Manage organizational departments</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Department
          </button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Departments table with hierarchy</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Designations Management
export function SuperAdminDesignationsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Designations</h1>
            <p className="text-muted-foreground">Manage job designations and titles</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Designation
          </button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Designations table with levels</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Roles Management
export function SuperAdminRolesPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Roles</h1>
            <p className="text-muted-foreground">Manage system roles and responsibilities</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Role
          </button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Roles table with permissions</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Permissions Management
export function SuperAdminPermissionsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Permissions</h1>
            <p className="text-muted-foreground">Manage granular permissions</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Permission
          </button>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Permissions table with actions</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Finance Management
export function SuperAdminFinancePage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Finance</h1>
          <p className="text-muted-foreground">Financial overview and management</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹45.2L</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹12.5L</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹32.7L</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

// Reports
export function SuperAdminReportsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">System reports and analytics</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Reports dashboard with multiple views</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Audit Logs
export function SuperAdminAuditLogsPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Audit Logs</h1>
          <p className="text-muted-foreground">System audit trail and activity logs</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Audit logs table with filtering</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

// Backup & Restore
export function SuperAdminBackupPage() {
  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Backup & Restore</h1>
          <p className="text-muted-foreground">Manage system backups and recovery</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Backup management interface</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
