import React from 'react';
import { CheckCircle2, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  const [activeTab, setActiveTab] = React.useState<'personal' | 'employment' | 'security' | 'notifications' | 'documents'>('personal');

  // Mock profile data - replace with API call
  const mockProfile = {
    id: '1',
    email: 'alice@digiayudh.com',
    firstName: 'Alice',
    lastName: 'Johnson',
    phone: '+91 9876543210',
    role: 'employee',
    department: 'Engineering',
    designation: 'Senior Developer',
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  };

  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account, employment details, and preferences</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <nav className="space-y-1 rounded-lg border border-border bg-card p-4">
              {[
                { id: 'personal', label: 'Personal Info', icon: '👤' },
                { id: 'employment', label: 'Employment', icon: '💼' },
                { id: 'security', label: 'Security', icon: '🔒' },
                { id: 'notifications', label: 'Notifications', icon: '🔔' },
                { id: 'documents', label: 'Documents', icon: '📄' },
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

            {activeTab === 'employment' && (
              <Card>
                <CardHeader>
                  <CardTitle>Employment Information</CardTitle>
                  <CardDescription>Your employment details and assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Department</label>
                      <input
                        type="text"
                        defaultValue={mockProfile.department}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-input bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Contact admin to change</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Designation</label>
                      <input
                        type="text"
                        defaultValue={mockProfile.designation}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-input bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Contact admin to change</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Skills</label>
                      <div className="space-y-2">
                        {['React', 'TypeScript', 'Node.js', 'PostgreSQL'].map((skill) => (
                          <div key={skill} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                            <span className="text-sm">{skill}</span>
                            <button className="text-xs text-red-600 hover:text-red-700">Remove</button>
                          </div>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Add new skill..."
                        className="w-full mt-2 px-4 py-2 rounded-lg border border-input bg-background"
                      />
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
                      { label: 'Task Assignments', desc: 'When new tasks are assigned' },
                      { label: 'Team Mentions', desc: 'When team members mention you' },
                      { label: 'Project Updates', desc: 'Updates about your projects' },
                      { label: 'System Alerts', desc: 'Important system alerts' },
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

            {activeTab === 'documents' && (
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <CardDescription>Upload and manage your documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Passport', uploadedDate: 'Jan 15, 2024', verified: true },
                      { type: 'Pan Card', uploadedDate: 'Jan 15, 2024', verified: true },
                      { type: 'Aadhar', uploadedDate: 'Jan 10, 2024', verified: false },
                    ].map((doc) => (
                      <div key={doc.type} className="flex items-center justify-between p-3 rounded-lg border border-border">
                        <div>
                          <p className="text-sm font-medium">{doc.type}</p>
                          <p className="text-xs text-muted-foreground">Uploaded {doc.uploadedDate}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${doc.verified ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                            {doc.verified ? 'Verified' : 'Pending'}
                          </span>
                          <button className="text-xs text-red-600 hover:text-red-700">Delete</button>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 border-t pt-4">
                      <button className="w-full px-4 py-2 rounded-lg border border-dashed border-input bg-muted hover:bg-muted/80 text-sm font-medium">
                        + Upload Document
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
