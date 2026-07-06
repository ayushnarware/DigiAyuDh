import { CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TasksTable } from '@/features/employee/components/tasks-table';

const employeeNav = [
  { label: 'Dashboard', href: '/employee/dashboard' },
  { label: 'Tasks', href: '/employee/tasks' },
  { label: 'Profile', href: '/employee/profile' },
];

const metrics = [
  { label: 'Tasks Today', value: '4', icon: Clock, change: '2 in progress' },
  { label: 'Completed', value: '12', icon: CheckCircle2, change: 'This week' },
  { label: 'Overdue', value: '0', icon: AlertCircle, change: 'On track' },
  { label: 'Productivity', value: '94%', icon: TrendingUp, change: '↗ 5% vs last week' },
];

export default function EmployeeDashboardPage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Your work overview and assignments</p>
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
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { task: 'Payment gateway implementation', date: 'Mar 22, 2024', project: 'Luméra Store' },
                { task: 'Mobile UI mockups review', date: 'Mar 20, 2024', project: 'Viora Health' },
                { task: 'Database optimization', date: 'Mar 25, 2024', project: 'ScaleOS' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border/50 p-3">
                  <div>
                    <p className="text-sm font-medium">{item.task}</p>
                    <p className="text-xs text-muted-foreground">{item.project}</p>
                  </div>
                  <span className="text-xs font-medium text-purple-400">{item.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function EmployeeTasksPage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">View and manage your assigned work items</p>
        </div>
        <TasksTable />
      </div>
    </PortalLayout>
  );
}

export function EmployeeProfilePage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Profile settings coming soon</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
