import { BarChart3, FolderKanban, LifeBuoy, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PortalLayout } from '@/layouts/portal-layout';

const clientNav = [
  { label: 'Dashboard', href: '/client/dashboard' },
  { label: 'Projects', href: '/client/projects' },
  { label: 'Support', href: '/client/support' },
  { label: 'Profile', href: '/client/profile' },
];

const metrics = [
  { label: 'Active Projects', value: '3', icon: FolderKanban, change: '+1 this month' },
  { label: 'Open Tickets', value: '2', icon: LifeBuoy, change: '1 resolved today' },
  { label: 'Team Members', value: '8', icon: Users, change: 'Across 2 projects' },
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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
      <PlaceholderPage title="Projects" description="Your active and completed projects" />
    </PortalLayout>
  );
}

export function ClientSupportPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <PlaceholderPage title="Support" description="Submit and track support requests" />
    </PortalLayout>
  );
}

export function ClientProfilePage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <PlaceholderPage title="Profile" description="Manage your account settings" />
    </PortalLayout>
  );
}

function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 p-12 text-center">
      <Settings className="mb-4 size-12 text-muted-foreground/50" />
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{description}</p>
      <p className="mt-4 text-sm text-purple-400">Ready for Spring Boot API integration</p>
    </div>
  );
}
