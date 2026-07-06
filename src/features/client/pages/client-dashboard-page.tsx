import { BarChart3, FolderKanban, LifeBuoy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortalLayout } from '@/layouts/portal-layout';
import { ProjectsList } from '@/features/client/components/projects-list';
import { SupportTicketsTable } from '@/features/client/components/support-tickets-table';

const clientNav = [
  { label: 'Dashboard', href: '/client/dashboard' },
  { label: 'Projects', href: '/client/projects' },
  { label: 'Support', href: '/client/support' },
  { label: 'Profile', href: '/client/profile' },
];

const metrics = [
  { label: 'Active Projects', value: '3', icon: FolderKanban, change: '+1 this month' },
  { label: 'Open Tickets', value: '2', icon: LifeBuoy, change: '1 resolved today' },
  { label: 'Total Spent', value: '₹2.45L', icon: TrendingUp, change: 'Payment status: Current' },
  { label: 'Completion Rate', value: '94%', icon: BarChart3, change: '↗ 6% vs last month' },
];

export default function ClientDashboardPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your projects and activity</p>
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
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Project milestone completed', project: 'Luméra Store', time: '2h ago' },
                { action: 'New invoice generated', project: 'ScaleOS Dashboard', time: '1d ago' },
                { action: 'Support ticket resolved', project: 'Viora Health App', time: '2d ago' },
              ].map((item) => (
                <div
                  key={item.action}
                  className="flex items-center justify-between rounded-xl border border-border p-4"
                >
                  <div>
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.project}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function ClientProjectsPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Your active and completed projects</p>
        </div>
        <ProjectsList />
      </div>
    </PortalLayout>
  );
}

export function ClientSupportPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Support</h1>
          <p className="text-muted-foreground">Submit and track support requests</p>
        </div>
        <SupportTicketsTable />
      </div>
    </PortalLayout>
  );
}

export function ClientProfilePage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
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
