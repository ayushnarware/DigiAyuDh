import React from 'react';
import { TrendingUp, Users, FileText, MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const crmNav = [
  { label: 'Dashboard', href: '/crm/dashboard' },
  { label: 'Leads', href: '/crm/leads' },
  { label: 'Quotations', href: '/crm/quotations' },
  { label: 'Meetings', href: '/crm/meetings' },
  { label: 'Communication', href: '/crm/communication' },
];

const metrics = [
  { label: 'Active Leads', value: '24', icon: Users, change: '+4 this week' },
  { label: 'Conversions', value: '12', icon: TrendingUp, change: 'This month' },
  { label: 'Quotations', value: '8', icon: FileText, change: '₹28.5L total' },
  { label: 'Scheduled Meetings', value: '6', icon: Calendar, change: 'This week' },
];

export default function CRMDashboardPage() {
  return (
    <PortalLayout navItems={crmNav} portalName="CRM Portal">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">Manage leads, quotations, and customer communications</p>
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
            <CardTitle>Recent Lead Activity</CardTitle>
            <CardDescription>Latest leads and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Acme Corporation', status: 'Hot Lead', value: '₹5.2L', date: 'Today' },
                { name: 'Tech Solutions Ltd', status: 'Warm Lead', value: '₹3.8L', date: 'Yesterday' },
                { name: 'Global Industries', status: 'Hot Lead', value: '₹8.5L', date: 'Mar 27' },
                { name: 'Digital Ventures', status: 'Cold Lead', value: '₹2.1L', date: 'Mar 26' },
              ].map((lead, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30">
                  <div>
                    <p className="text-sm font-medium">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{lead.value}</p>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      lead.status === 'Hot Lead' ? 'bg-red-50 text-red-700' :
                      lead.status === 'Warm Lead' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-blue-50 text-blue-700'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { client: 'Acme Corp', time: '10:00 AM', date: 'Today', type: 'Video Call' },
                  { client: 'Tech Solutions', time: '2:30 PM', date: 'Tomorrow', type: 'Office Meeting' },
                  { client: 'Global Industries', time: '11:00 AM', date: 'Mar 29', type: 'Video Call' },
                ].map((meeting, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                    <div>
                      <p className="text-sm font-medium">{meeting.client}</p>
                      <p className="text-xs text-muted-foreground">{meeting.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{meeting.time}</p>
                      <p className="text-xs text-muted-foreground">{meeting.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pipeline Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { stage: 'New Leads', count: 8, value: '₹12L' },
                  { stage: 'In Negotiation', count: 5, value: '₹18.5L' },
                  { stage: 'Ready to Close', count: 3, value: '₹8L' },
                  { stage: 'Closed', count: 12, value: '₹42L' },
                ].map((pipeline, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{pipeline.stage}</p>
                      <p className="text-xs text-muted-foreground">{pipeline.count} leads</p>
                    </div>
                    <span className="text-sm font-semibold text-purple-600">{pipeline.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalLayout>
  );
}

export function CRMLeadsPage() {
  const [showAddForm, setShowAddForm] = React.useState(false);

  const leads = [
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+91 9876543210', source: 'Website', status: 'Hot Lead', value: '₹5.2L', probability: 85, createdDate: 'Mar 15, 2024' },
    { id: 2, name: 'Tech Solutions Ltd', email: 'info@techsol.com', phone: '+91 8765432109', source: 'Referral', status: 'Warm Lead', value: '₹3.8L', probability: 60, createdDate: 'Mar 10, 2024' },
    { id: 3, name: 'Global Industries', email: 'sales@global.com', phone: '+91 7654321098', source: 'LinkedIn', status: 'Hot Lead', value: '₹8.5L', probability: 75, createdDate: 'Mar 8, 2024' },
    { id: 4, name: 'Digital Ventures', email: 'hello@digital.com', phone: '+91 6543210987', source: 'Cold Call', status: 'Cold Lead', value: '₹2.1L', probability: 20, createdDate: 'Mar 5, 2024' },
    { id: 5, name: 'Innovation Hub', email: 'contact@innov.com', phone: '+91 5432109876', source: 'Email Campaign', status: 'Warm Lead', value: '₹4.5L', probability: 55, createdDate: 'Mar 1, 2024' },
  ];

  return (
    <PortalLayout navItems={crmNav} portalName="CRM Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Leads Management</h1>
            <p className="text-muted-foreground">Track and manage all your sales leads</p>
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Add Lead
          </button>
        </div>

        {showAddForm && (
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle>Add New Lead</CardTitle>
              <CardDescription>Create a new sales lead entry</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input type="text" placeholder="Company name" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Person</label>
                    <input type="text" placeholder="Full name" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" placeholder="Email address" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="tel" placeholder="Phone number" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Lead Source</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Website</option>
                      <option>Referral</option>
                      <option>LinkedIn</option>
                      <option>Cold Call</option>
                      <option>Email Campaign</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Lead Status</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Hot Lead</option>
                      <option>Warm Lead</option>
                      <option>Cold Lead</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Estimated Value</label>
                  <input type="text" placeholder="₹0" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                    Add Lead
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
            <CardDescription>Complete list of your sales leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Company</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Source</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Value</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2">
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{lead.phone}</td>
                      <td className="py-3 px-2">{lead.source}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          lead.status === 'Hot Lead' ? 'bg-red-50 text-red-700' :
                          lead.status === 'Warm Lead' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-semibold">{lead.value}</td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full">
                            <div className="h-1.5 bg-purple-600 rounded-full" style={{ width: `${lead.probability}%` }} />
                          </div>
                          <span className="text-xs font-medium">{lead.probability}%</span>
                        </div>
                      </td>
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

export function CRMQuotationsPage() {
  const [showAddForm, setShowAddForm] = React.useState(false);

  const quotations = [
    { id: 1, quoteNo: 'QT-2024-001', client: 'Acme Corporation', amount: '₹5.2L', status: 'Sent', validUntil: 'Apr 5, 2024', createdDate: 'Mar 20, 2024' },
    { id: 2, quoteNo: 'QT-2024-002', client: 'Tech Solutions Ltd', amount: '₹3.8L', status: 'Accepted', validUntil: 'Apr 10, 2024', createdDate: 'Mar 18, 2024' },
    { id: 3, quoteNo: 'QT-2024-003', client: 'Global Industries', amount: '₹8.5L', status: 'Sent', validUntil: 'Apr 8, 2024', createdDate: 'Mar 15, 2024' },
    { id: 4, quoteNo: 'QT-2024-004', client: 'Innovation Hub', amount: '₹4.5L', status: 'Rejected', validUntil: 'Mar 30, 2024', createdDate: 'Mar 10, 2024' },
  ];

  return (
    <PortalLayout navItems={crmNav} portalName="CRM Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quotations</h1>
            <p className="text-muted-foreground">Create and manage sales quotations</p>
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Create Quotation
          </button>
        </div>

        {showAddForm && (
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle>Create New Quotation</CardTitle>
              <CardDescription>Generate a new sales quotation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Lead/Client</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Acme Corporation</option>
                      <option>Tech Solutions Ltd</option>
                      <option>Global Industries</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quote Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Valid Until</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Quotation Amount</label>
                    <input type="text" placeholder="₹0" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea placeholder="Services/products details..." className="w-full px-4 py-2 rounded-lg border border-input bg-background" rows={3} />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                    Create Quotation
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>All Quotations</CardTitle>
            <CardDescription>Your sales quotations and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Quote No.</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Client</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Valid Until</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {quotations.map((quote) => (
                    <tr key={quote.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2 font-medium">{quote.quoteNo}</td>
                      <td className="py-3 px-2">{quote.client}</td>
                      <td className="py-3 px-2 font-semibold">{quote.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          quote.status === 'Accepted' ? 'bg-green-50 text-green-700' :
                          quote.status === 'Sent' ? 'bg-blue-50 text-blue-700' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {quote.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground">{quote.validUntil}</td>
                      <td className="py-3 px-2 text-muted-foreground">{quote.createdDate}</td>
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

export function CRMMeetingsPage() {
  const [showScheduleForm, setShowScheduleForm] = React.useState(false);

  const meetings = [
    { id: 1, title: 'Initial Discussion', client: 'Acme Corporation', date: 'Mar 29, 2024', time: '10:00 AM', type: 'Video Call', attendees: 2, notes: 'Discuss project requirements' },
    { id: 2, title: 'Proposal Presentation', client: 'Tech Solutions Ltd', date: 'Mar 30, 2024', time: '2:30 PM', type: 'Office Meeting', attendees: 3, notes: 'Present proposed solution' },
    { id: 3, title: 'Follow-up Call', client: 'Global Industries', date: 'Apr 2, 2024', time: '11:00 AM', type: 'Video Call', attendees: 2, notes: 'Check on quotation status' },
    { id: 4, title: 'Contract Review', client: 'Innovation Hub', date: 'Apr 5, 2024', time: '3:00 PM', type: 'Video Call', attendees: 2, notes: 'Review contract terms' },
  ];

  return (
    <PortalLayout navItems={crmNav} portalName="CRM Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Meetings</h1>
            <p className="text-muted-foreground">Schedule and manage client meetings</p>
          </div>
          <button onClick={() => setShowScheduleForm(!showScheduleForm)} className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
            + Schedule Meeting
          </button>
        </div>

        {showScheduleForm && (
          <Card className="border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle>Schedule New Meeting</CardTitle>
              <CardDescription>Create a new meeting with a client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meeting Title</label>
                    <input type="text" placeholder="Meeting title" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Client</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Acme Corporation</option>
                      <option>Tech Solutions Ltd</option>
                      <option>Global Industries</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Time</label>
                    <input type="time" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Meeting Type</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Video Call</option>
                      <option>Office Meeting</option>
                      <option>Phone Call</option>
                      <option>Site Visit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Attendees</label>
                    <input type="number" placeholder="Number of attendees" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Notes</label>
                  <textarea placeholder="Meeting agenda and notes..." className="w-full px-4 py-2 rounded-lg border border-input bg-background" rows={3} />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button onClick={() => setShowScheduleForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-700">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Meetings</CardTitle>
            <CardDescription>Your upcoming and past meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="border border-border rounded-lg p-4 hover:bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">{meeting.client}</p>
                      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {meeting.date} at {meeting.time}
                        </span>
                        <span>{meeting.type}</span>
                        <span>{meeting.attendees} attendees</span>
                      </div>
                      <p className="text-sm mt-2 text-muted-foreground">Notes: {meeting.notes}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded text-xs border border-border hover:bg-muted">Edit</button>
                      <button className="px-3 py-1 rounded text-xs border border-border hover:bg-muted">Reschedule</button>
                    </div>
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

export function CRMCommunicationPage() {
  const communications = [
    { id: 1, client: 'Acme Corporation', type: 'Email', subject: 'Quotation sent', date: 'Mar 28, 2024', time: '10:30 AM', status: 'Sent', from: 'sales@digiayudh.com' },
    { id: 2, client: 'Tech Solutions Ltd', type: 'Phone Call', subject: 'Project discussion', date: 'Mar 27, 2024', time: '2:00 PM', status: 'Completed', from: 'John (Account Manager)' },
    { id: 3, client: 'Global Industries', type: 'Email', subject: 'Follow-up on proposal', date: 'Mar 26, 2024', time: '11:15 AM', status: 'Sent', from: 'sales@digiayudh.com' },
    { id: 4, client: 'Digital Ventures', type: 'SMS', subject: 'Meeting reminder', date: 'Mar 25, 2024', time: '9:00 AM', status: 'Sent', from: 'SMS Gateway' },
    { id: 5, client: 'Innovation Hub', type: 'Email', subject: 'Contract ready for signature', date: 'Mar 24, 2024', time: '3:45 PM', status: 'Sent', from: 'sales@digiayudh.com' },
  ];

  return (
    <PortalLayout navItems={crmNav} portalName="CRM Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Communication</h1>
            <p className="text-muted-foreground">Track all client communications and interactions</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted flex items-center gap-2">
              <Mail className="size-4" />
              Send Email
            </button>
            <button className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted flex items-center gap-2">
              <Phone className="size-4" />
              Log Call
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Communications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">487</p>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">42</p>
              <p className="text-xs text-muted-foreground">Emails & calls</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Pending Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">8</p>
              <p className="text-xs text-muted-foreground">Awaiting reply</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Communication History</CardTitle>
            <CardDescription>All your client interactions and communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Client</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Subject</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date & Time</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">From</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {communications.map((comm) => (
                    <tr key={comm.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2 font-medium">{comm.client}</td>
                      <td className="py-3 px-2">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-muted">
                          {comm.type}
                        </span>
                      </td>
                      <td className="py-3 px-2">{comm.subject}</td>
                      <td className="py-3 px-2 text-muted-foreground">{comm.date} {comm.time}</td>
                      <td className="py-3 px-2 text-muted-foreground">{comm.from}</td>
                      <td className="py-3 px-2">
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700">
                          {comm.status}
                        </span>
                      </td>
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
