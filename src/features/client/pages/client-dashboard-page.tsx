import React from 'react';
import { BarChart3, FolderKanban, LifeBuoy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PortalLayout } from '@/layouts/portal-layout';
import { ProjectsList } from '@/features/client/components/projects-list';
import { SupportTicketsTable } from '@/features/client/components/support-tickets-table';

const clientNav = [
  { label: 'Dashboard', href: '/client/dashboard' },
  { label: 'Projects', href: '/client/projects' },
  { label: 'Invoices', href: '/client/invoices' },
  { label: 'Contracts', href: '/client/contracts' },
  { label: 'Payments', href: '/client/payments' },
  { label: 'Team', href: '/client/team' },
  { label: 'Documents', href: '/client/documents' },
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
  const [activeTab, setActiveTab] = React.useState<'personal' | 'company' | 'security' | 'notifications' | 'preferences'>('personal');

  // Mock profile data - replace with API call
  const mockProfile = {
    id: '1',
    email: 'john@company.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+91 9876543210',
    role: 'client',
    company: 'Acme Corp',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };

  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account, security, and preferences</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <nav className="space-y-1 rounded-lg border border-border bg-card p-4">
              {[
                { id: 'personal', label: 'Personal Info', icon: '👤' },
                { id: 'company', label: 'Company Info', icon: '🏢' },
                { id: 'security', label: 'Security', icon: '🔒' },
                { id: 'notifications', label: 'Notifications', icon: '🔔' },
                { id: 'preferences', label: 'Preferences', icon: '⚙️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-purple-50 text-purple-600 border-l-2 border-purple-600'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'personal' && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your basic details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue={mockProfile.firstName}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue={mockProfile.lastName}
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={mockProfile.email}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={mockProfile.phone}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'company' && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Update your company details and billing information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company Name</label>
                      <input
                        type="text"
                        defaultValue={mockProfile.company}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium mb-2">GST Number</label>
                        <input
                          type="text"
                          placeholder="27AABCT0045Q1Z5"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">PAN Number</label>
                        <input
                          type="text"
                          placeholder="AAAPA1234A"
                          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      />
                    </div>
                    <div className="rounded-lg bg-blue-50 p-4 text-blue-700 text-sm">
                      Two-Factor Authentication is available. Enable it for enhanced security.
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                        Update Password
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'Email Notifications', desc: 'Receive updates via email' },
                      { label: 'Project Updates', desc: 'Updates about your projects' },
                      { label: 'Support Tickets', desc: 'When support tickets are updated' },
                      { label: 'Invoices', desc: 'Invoice and payment notifications' },
                      { label: 'Marketing', desc: 'Marketing emails and promotions' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <p className="text-sm font-medium">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    ))}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'preferences' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance & Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Theme</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                        <option>Light</option>
                        <option>Dark</option>
                        <option>Auto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Language</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Spanish</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time Zone</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                        <option>IST (UTC+5:30)</option>
                        <option>EST (UTC-5:00)</option>
                        <option>GMT (UTC+0:00)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Currency</label>
                      <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

export function ClientInvoicesPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">View and download your invoices</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Invoices list with download and payment status</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function ClientContractsPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Contracts</h1>
          <p className="text-muted-foreground">Review and manage your contracts</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Contracts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Contracts list with status and download</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function ClientPaymentsPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Manage your payments and billing</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Outstanding Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹0</p>
              <p className="text-xs text-muted-foreground">All paid up</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹2.45L</p>
              <p className="text-xs text-muted-foreground">YTD</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Last Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Mar 1</p>
              <p className="text-xs text-muted-foreground">Successfully paid</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Payment history table</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function ClientTeamPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Account Team</h1>
          <p className="text-muted-foreground">Your dedicated account team</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'John Smith', role: 'Account Manager', email: 'john@digiayudh.com' },
                { name: 'Sarah Johnson', role: 'Project Manager', email: 'sarah@digiayudh.com' },
                { name: 'Mike Williams', role: 'Technical Lead', email: 'mike@digiayudh.com' },
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">Message</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function ClientDocumentsPage() {
  return (
    <PortalLayout navItems={clientNav} portalName="Client Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Access your project and contract documents</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Documents list with download and preview</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
