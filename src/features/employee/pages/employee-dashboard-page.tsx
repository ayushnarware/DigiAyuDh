import React from 'react';
import { CheckCircle2, AlertCircle, Clock, TrendingUp, X, Save } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TasksTable } from '@/features/employee/components/tasks-table';

const employeeNav = [
  { label: 'Dashboard', href: '/employee/dashboard' },
  { label: 'Tasks', href: '/employee/tasks' },
  { label: 'Attendance', href: '/employee/attendance' },
  { label: 'Leave', href: '/employee/leave' },
  { label: 'Payroll', href: '/employee/payroll' },
  { label: 'Meetings', href: '/employee/meetings' },
  { label: 'Documents', href: '/employee/documents' },
  { label: 'Performance', href: '/employee/performance' },
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
                        <Input type="text" defaultValue={mockProfile.firstName} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <Input type="text" defaultValue={mockProfile.lastName} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" defaultValue={mockProfile.email} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <Input type="tel" defaultValue={mockProfile.phone} />
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" icon={<X className="size-4" />}>Cancel</Button>
                      <Button icon={<Save className="size-4" />}>Save Changes</Button>
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
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">New Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" icon={<X className="size-4" />}>Cancel</Button>
                      <Button icon={<Save className="size-4" />}>Update Password</Button>
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

export function EmployeeAttendancePage() {
  const attendanceData = [
    { date: 'Mar 28, 2024', status: 'Present', checkIn: '09:00 AM', checkOut: '06:15 PM', hours: '9.25' },
    { date: 'Mar 27, 2024', status: 'Present', checkIn: '08:55 AM', checkOut: '06:20 PM', hours: '9.42' },
    { date: 'Mar 26, 2024', status: 'Present', checkIn: '09:10 AM', checkOut: '06:00 PM', hours: '8.83' },
    { date: 'Mar 25, 2024', status: 'Present', checkIn: '08:50 AM', checkOut: '06:30 PM', hours: '9.67' },
    { date: 'Mar 22, 2024', status: 'Holiday', checkIn: '-', checkOut: '-', hours: '-' },
    { date: 'Mar 21, 2024', status: 'Present', checkIn: '09:05 AM', checkOut: '05:50 PM', hours: '8.75' },
    { date: 'Mar 20, 2024', status: 'Leave', checkIn: '-', checkOut: '-', hours: '-' },
    { date: 'Mar 19, 2024', status: 'Present', checkIn: '09:15 AM', checkOut: '06:10 PM', hours: '8.92' },
  ];

  const stats = [
    { label: 'This Month', value: '18', subtext: 'Present days' },
    { label: 'Working Hours', value: '144.5', subtext: 'Hours' },
    { label: 'Leaves Taken', value: '1', subtext: 'Days' },
    { label: 'Attendance %', value: '90%', subtext: 'This month' },
  ];

  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Attendance</h1>
            <p className="text-muted-foreground">View and track your attendance records</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            Check In
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtext}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Your attendance history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Check In</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Check Out</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2">{record.date}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          record.status === 'Present' ? 'bg-green-50 text-green-700' :
                          record.status === 'Leave' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-50 text-gray-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{record.checkIn}</td>
                      <td className="py-3 px-2 text-muted-foreground">{record.checkOut}</td>
                      <td className="py-3 px-2 text-muted-foreground">{record.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function EmployeeLeavePage() {
  const [showRequestForm, setShowRequestForm] = React.useState(false);

  const leaveBalance = [
    { type: 'Casual Leave', available: 8, used: 2, total: 10, progress: 20 },
    { type: 'Sick Leave', available: 5, used: 0, total: 5, progress: 0 },
    { type: 'Annual Leave', available: 12, used: 8, total: 20, progress: 40 },
    { type: 'Maternity Leave', available: 180, used: 0, total: 180, progress: 0 },
  ];

  const leaveRequests = [
    { id: 1, type: 'Annual Leave', startDate: 'Mar 20, 2024', endDate: 'Mar 22, 2024', days: 3, status: 'Approved', appliedOn: 'Mar 10, 2024' },
    { id: 2, type: 'Sick Leave', startDate: 'Mar 15, 2024', endDate: 'Mar 15, 2024', days: 1, status: 'Approved', appliedOn: 'Mar 15, 2024' },
    { id: 3, type: 'Casual Leave', startDate: 'Apr 5, 2024', endDate: 'Apr 8, 2024', days: 4, status: 'Pending', appliedOn: 'Mar 28, 2024' },
    { id: 4, type: 'Annual Leave', startDate: 'Feb 20, 2024', endDate: 'Feb 23, 2024', days: 4, status: 'Rejected', appliedOn: 'Feb 10, 2024' },
  ];

  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leave Management</h1>
            <p className="text-muted-foreground">Request and manage your leaves</p>
          </div>
          <button onClick={() => setShowRequestForm(!showRequestForm)} className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Request Leave
          </button>
        </div>

        {showRequestForm && (
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle>Request New Leave</CardTitle>
              <CardDescription>Submit your leave request for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Leave Type</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Casual Leave</option>
                      <option>Sick Leave</option>
                      <option>Annual Leave</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Full Day</option>
                      <option>Half Day (First Half)</option>
                      <option>Half Day (Second Half)</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">From Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">To Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reason</label>
                  <textarea placeholder="Enter reason for leave..." className="w-full px-4 py-2 rounded-lg border border-input bg-background" rows={3} />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button onClick={() => setShowRequestForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                    Submit Request
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {leaveBalance.map((leave) => (
            <Card key={leave.type}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{leave.type}</p>
                    <p className="text-xs text-muted-foreground">{leave.available} available / {leave.used} used / {leave.total} total</p>
                  </div>
                  <span className="text-sm font-bold text-purple-600">{leave.available} days</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${leave.progress}%` }} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Leave Requests History</CardTitle>
            <CardDescription>Your leave requests and approval status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Period</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Days</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Applied On</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2">{request.type}</td>
                      <td className="py-3 px-2 text-muted-foreground">{request.startDate} to {request.endDate}</td>
                      <td className="py-3 px-2">{request.days}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          request.status === 'Approved' ? 'bg-green-50 text-green-700' :
                          request.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{request.appliedOn}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function EmployeePayrollPage() {
  const [selectedMonth, setSelectedMonth] = React.useState('March 2024');

  const salaryData = {
    basic: 50000,
    hra: 15000,
    dearness: 5000,
    conveyance: 2500,
    medical: 1000,
    other: 1500,
  };

  const deductions = {
    pf: 1800,
    esi: 750,
    income_tax: 4200,
    professional_tax: 200,
    other: 250,
  };

  const grossSalary = Object.values(salaryData).reduce((a, b) => a + b, 0);
  const totalDeductions = Object.values(deductions).reduce((a, b) => a + b, 0);
  const netSalary = grossSalary - totalDeductions;

  const salaryHistory = [
    { month: 'Mar 2024', gross: '₹75,000', deductions: '₹7,200', net: '₹67,800', status: 'Paid', date: 'Mar 1, 2024' },
    { month: 'Feb 2024', gross: '₹75,000', deductions: '₹7,200', net: '₹67,800', status: 'Paid', date: 'Feb 1, 2024' },
    { month: 'Jan 2024', gross: '₹75,000', deductions: '₹7,200', net: '₹67,800', status: 'Paid', date: 'Jan 1, 2024' },
    { month: 'Dec 2023', gross: '₹75,000', deductions: '₹7,200', net: '₹67,800', status: 'Paid', date: 'Dec 1, 2023' },
  ];

  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Payroll</h1>
          <p className="text-muted-foreground">View salary slips and payroll details</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Monthly Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹75,000</p>
              <p className="text-xs text-muted-foreground">Fixed salary</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">YTD Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">₹2,25,000</p>
              <p className="text-xs text-muted-foreground">2024</p>
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
            <CardTitle>Salary Slip - {selectedMonth}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-end">
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
                <option>Mar 2024</option>
                <option>Feb 2024</option>
                <option>Jan 2024</option>
                <option>Dec 2023</option>
              </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold mb-3 text-purple-600">Earnings</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Basic Salary</span>
                    <span>₹{salaryData.basic.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">HRA</span>
                    <span>₹{salaryData.hra.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Dearness Allowance</span>
                    <span>₹{salaryData.dearness.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conveyance</span>
                    <span>₹{salaryData.conveyance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Medical</span>
                    <span>₹{salaryData.medical.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Other</span>
                    <span>₹{salaryData.other.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
                    <span>Gross Salary</span>
                    <span className="text-purple-600">₹{grossSalary.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3 text-red-600">Deductions</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">PF (12%)</span>
                    <span>₹{deductions.pf.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ESI (0.75%)</span>
                    <span>₹{deductions.esi.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Income Tax</span>
                    <span>₹{deductions.income_tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prof. Tax</span>
                    <span>₹{deductions.professional_tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Other</span>
                    <span>₹{deductions.other.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-2">
                    <span>Total Deductions</span>
                    <span className="text-red-600">₹{totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-semibold">Net Salary</span>
              <span className="text-2xl font-bold text-green-600">₹{netSalary.toLocaleString()}</span>
            </div>

            <div className="flex gap-2 pt-4">
              <button className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                Download PDF
              </button>
              <button className="flex-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                Print
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary History</CardTitle>
            <CardDescription>Previous salary slips and payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Month</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Gross</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Deductions</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Net Salary</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map((slip, idx) => (
                    <tr key={idx} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2">{slip.month}</td>
                      <td className="py-3 px-2">{slip.gross}</td>
                      <td className="py-3 px-2">{slip.deductions}</td>
                      <td className="py-3 px-2 font-semibold">{slip.net}</td>
                      <td className="py-3 px-2">
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                          {slip.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{slip.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function EmployeeMeetingsPage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Your scheduled meetings and calls</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Meetings calendar and list view</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function EmployeeDocumentsPage() {
  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">Your personal and employment documents</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Document Files</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">Documents list with upload and download</p>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}

export function EmployeePerformancePage() {
  const performanceMetrics = [
    { category: 'Technical Skills', rating: 4.5, max: 5 },
    { category: 'Communication', rating: 4.0, max: 5 },
    { category: 'Team Work', rating: 4.3, max: 5 },
    { category: 'Reliability', rating: 4.7, max: 5 },
    { category: 'Problem Solving', rating: 4.2, max: 5 },
    { category: 'Time Management', rating: 4.0, max: 5 },
  ];

  const performanceReviews = [
    {
      id: 1,
      period: 'Jan - Mar 2024',
      reviewer: 'John Smith (Manager)',
      rating: 4.2,
      status: 'Completed',
      date: 'Mar 15, 2024',
      comments: 'Excellent performance with consistent delivery on all projects.',
    },
    {
      id: 2,
      period: 'Oct - Dec 2023',
      reviewer: 'Sarah Johnson (Manager)',
      rating: 4.0,
      status: 'Completed',
      date: 'Dec 20, 2023',
      comments: 'Good technical skills and team collaboration.',
    },
  ];

  const goals = [
    { goal: 'Complete Advanced React certification', status: 'In Progress', dueDate: 'May 31, 2024' },
    { goal: 'Lead 2 team projects', status: 'In Progress', dueDate: 'Jun 30, 2024' },
    { goal: 'Improve code review process', status: 'Completed', dueDate: 'Mar 31, 2024' },
    { goal: 'Mentor 1 junior developer', status: 'In Progress', dueDate: 'Dec 31, 2024' },
  ];

  return (
    <PortalLayout navItems={employeeNav} portalName="Employee Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Performance</h1>
          <p className="text-muted-foreground">Your performance reviews and ratings</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Current Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">4.2/5</p>
              <p className="text-xs text-muted-foreground">Based on latest review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Reviews This Year</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">2</p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Next Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Jun 2024</p>
              <p className="text-xs text-muted-foreground">Scheduled</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Your current performance scores across key areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric) => (
                <div key={metric.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.category}</span>
                    <span className="text-sm font-semibold text-purple-600">{metric.rating}/{metric.max}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${(metric.rating / metric.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Reviews</CardTitle>
            <CardDescription>Your performance review history and feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceReviews.map((review) => (
                <div key={review.id} className="border border-border rounded-lg p-4 hover:bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">{review.period}</p>
                      <p className="text-sm text-muted-foreground">Reviewed by {review.reviewer}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">{review.rating}/5</p>
                      <span className="inline-block mt-1 px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                        {review.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{review.comments}</p>
                  <p className="text-xs text-muted-foreground">Review Date: {review.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Goals</CardTitle>
            <CardDescription>Your current goals and their progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {goals.map((goal, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{goal.goal}</p>
                    <p className="text-xs text-muted-foreground">Due: {goal.dueDate}</p>
                  </div>
                  <span className={`px-3 py-1 rounded text-xs font-medium ${
                    goal.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {goal.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PortalLayout>
  );
}
