import { FolderKanban, Users, TrendingUp, DollarSign, CheckCircle2, Clock, FileText, Briefcase } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PremiumDashboardHeader } from '@/components/shared/premium-dashboard-header';
import { ModernKPICard } from '@/components/shared/modern-kpi-card';
import { ResponsiveDashboardGrid, ResponsiveChartsGrid, DashboardSection, DashboardContainer } from '@/components/shared/responsive-dashboard-grid';
import { ClientsTable } from '@/features/admin/components/clients-table';
import { ProjectsTable } from '@/features/admin/components/projects-table';
import { EmployeesTable } from '@/features/admin/components/employees-table';
import { TeamsTable } from '@/features/admin/components/teams-table';
import { DepartmentsTable } from '@/features/admin/components/departments-table';
import { DesignationsTable } from '@/features/admin/components/designations-table';
import { MeetingsTable } from '@/features/admin/components/meetings-table';
import { DocumentsTable } from '@/features/admin/components/documents-table';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Employees', href: '/admin/employees' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Teams', href: '/admin/teams' },
  { label: 'Departments', href: '/admin/departments' },
  { label: 'Designations', href: '/admin/designations' },
  { label: 'Meetings', href: '/admin/meetings' },
  { label: 'Documents', href: '/admin/documents' },
  { label: 'Reports', href: '/admin/reports' },
  { label: 'Settings', href: '/admin/settings' },
];

export default function AdminDashboardPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <PremiumDashboardHeader
        title="Company Operations Center"
        subtitle="Real-time business overview and management"
        companyName="Company Name"
        showClock={true}
      />

      <DashboardContainer>
        {/* Key Metrics */}
        <DashboardSection title="Company Overview" subtitle="Key business metrics and performance indicators">
          <ResponsiveDashboardGrid>
            <ModernKPICard
              title="Total Clients"
              value="48"
              change={11.4}
              changeLabel="5 new clients"
              icon={Users}
              color="blue"
              trend="up"
              miniChart={true}
            />
            <ModernKPICard
              title="Active Projects"
              value="24"
              change={20}
              changeLabel="12 in progress"
              icon={FolderKanban}
              color="purple"
              trend="up"
              miniChart={true}
            />
            <ModernKPICard
              title="Team Members"
              value="127"
              change={1.6}
              changeLabel="2 new hires"
              icon={Users}
              color="green"
              trend="up"
              miniChart={true}
            />
            <ModernKPICard
              title="Revenue (MTD)"
              value="₹12.4L"
              change={18}
              changeLabel="Growing steady"
              icon={DollarSign}
              color="cyan"
              trend="up"
              miniChart={true}
            />
          </ResponsiveDashboardGrid>
        </DashboardSection>

        {/* Performance Charts */}
        <DashboardSection title="Performance Metrics" subtitle="Business trends and analytics">
          <ResponsiveChartsGrid>
            <Card className="border hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">Project Timeline</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chart ready for integration</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-base">Client Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Chart ready for integration</p>
                </div>
              </CardContent>
            </Card>
          </ResponsiveChartsGrid>
        </DashboardSection>

        {/* Quick Actions */}
        <DashboardSection title="Quick Actions" subtitle="Frequently used operations">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Add Client', icon: Users, color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
              { label: 'New Project', icon: FolderKanban, color: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
              { label: 'Team Member', icon: Users, color: 'bg-green-50 hover:bg-green-100 border-green-200' },
              { label: 'Schedule Meeting', icon: Clock, color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200' },
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

        {/* Task Status Overview */}
        <DashboardSection title="Task Status" subtitle="Current project and task metrics">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Completed', value: '142', color: 'bg-green-50 border-green-200', icon: CheckCircle2, iconColor: 'text-green-600' },
              { label: 'In Progress', value: '28', color: 'bg-blue-50 border-blue-200', icon: Clock, iconColor: 'text-blue-600' },
              { label: 'Pending', value: '16', color: 'bg-orange-50 border-orange-200', icon: FileText, iconColor: 'text-orange-600' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} className={`border ${item.color}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                        <p className="text-2xl font-bold mt-1">{item.value}</p>
                      </div>
                      <Icon className={`w-8 h-8 ${item.iconColor}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DashboardSection>

        {/* Management Summary */}
        <DashboardSection title="Management Modules" subtitle="Quick access to core operations">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Employees', icon: Users, href: '/admin/employees' },
              { label: 'Projects', icon: FolderKanban, href: '/admin/projects' },
              { label: 'Clients', icon: Briefcase, href: '/admin/clients' },
              { label: 'Teams', icon: Users, href: '/admin/teams' },
            ].map((module) => {
              const Icon = module.icon;
              return (
                <Card key={module.label} className="border hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-muted">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="font-medium">{module.label}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </DashboardSection>
      </DashboardContainer>
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

export function AdminTeamsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="text-muted-foreground">Manage project and functional teams</p>
        </div>
        <TeamsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminDepartmentsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Departments</h1>
          <p className="text-muted-foreground">Manage organizational departments</p>
        </div>
        <DepartmentsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminDesignationsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Designations</h1>
          <p className="text-muted-foreground">Manage job designations and titles</p>
        </div>
        <DesignationsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminMeetingsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage team meetings</p>
        </div>
        <MeetingsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminDocumentsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Manage contracts, agreements, and files</p>
        </div>
        <DocumentsTable />
      </div>
    </PortalLayout>
  );
}

export function AdminReportsPage() {
  return (
    <PortalLayout navItems={adminNav} portalName="Admin Dashboard">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">View comprehensive business analytics and reports</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">127</p>
              <p className="text-xs text-green-600 mt-1">↑ 5 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-blue-600 mt-1">↑ 3 in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹2.4Cr</p>
              <p className="text-xs text-green-600 mt-1">↑ 18% vs last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">82%</p>
              <p className="text-xs text-amber-600 mt-1">↓ 2% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                <p className="font-medium">Employee Reports</p>
                <p className="text-sm text-muted-foreground">Headcount, attendance, performance</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                <p className="font-medium">Project Reports</p>
                <p className="text-sm text-muted-foreground">Status, timeline, budget tracking</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                <p className="font-medium">Financial Reports</p>
                <p className="text-sm text-muted-foreground">Revenue, expenses, profit margin</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                <p className="font-medium">Client Reports</p>
                <p className="text-sm text-muted-foreground">Satisfaction, contracts, invoices</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                <p className="font-medium">HR Reports</p>
                <p className="text-sm text-muted-foreground">Recruitment, payroll, training</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted cursor-pointer">
                <p className="font-medium">Custom Reports</p>
                <p className="text-sm text-muted-foreground">Create your own reports</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Export Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline">Export as PDF</Button>
              <Button variant="outline">Export as Excel</Button>
              <Button variant="outline">Email Report</Button>
              <Button variant="outline">Schedule Report</Button>
            </div>
          </CardContent>
        </Card>
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
            <Button variant="outline">Reset to Defaults</Button>
            <Button variant="primary">Save Settings</Button>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
