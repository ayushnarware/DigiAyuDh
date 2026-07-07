import React from 'react';
import { TrendingUp, DollarSign, FileText, CreditCard, AlertCircle } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InvoicesTable } from '@/features/finance/components/invoices-table';

const financeNav = [
  { label: 'Dashboard', href: '/finance/dashboard' },
  { label: 'Invoices', href: '/finance/invoices' },
  { label: 'Payments', href: '/finance/payments' },
  { label: 'Reports', href: '/finance/reports' },
];

const metrics = [
  { label: 'Total Revenue', value: '₹245.8L', icon: TrendingUp, change: '+12% this month' },
  { label: 'Outstanding Invoices', value: '₹52.3L', icon: DollarSign, change: '8 invoices pending' },
  { label: 'Paid Invoices', value: '₹193.5L', icon: FileText, change: '₹28.5L this month' },
  { label: 'Pending Payments', value: '₹18.2L', icon: CreditCard, change: '3 payments due' },
];

export default function FinanceDashboardPage() {
  return (
    <PortalLayout navItems={financeNav} portalName="Finance Portal">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Finance & Billing Dashboard</h1>
          <p className="text-muted-foreground">Monitor invoices, payments, and financial reports</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {m.label}
                </CardTitle>
                <m.icon className="size-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest generated invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'INV-2024-001', client: 'Acme Corporation', amount: '₹5.2L', date: 'Mar 28', status: 'Paid' },
                  { id: 'INV-2024-002', client: 'Tech Solutions Ltd', amount: '₹3.8L', date: 'Mar 25', status: 'Pending' },
                  { id: 'INV-2024-003', client: 'Global Industries', amount: '₹8.5L', date: 'Mar 22', status: 'Overdue' },
                  { id: 'INV-2024-004', client: 'Digital Ventures', amount: '₹2.1L', date: 'Mar 20', status: 'Paid' },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">{invoice.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{invoice.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        invoice.status === 'Paid' ? 'bg-green-50 text-green-700' :
                        invoice.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-red-50 text-red-700'
                      }`}>
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>Upcoming payments and due dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { invoice: 'INV-2024-002', client: 'Tech Solutions Ltd', dueDate: 'Apr 5, 2024', amount: '₹3.8L' },
                  { invoice: 'INV-2024-003', client: 'Global Industries', dueDate: 'Mar 31, 2024', amount: '₹8.5L' },
                  { invoice: 'INV-2024-005', client: 'Innovation Hub', dueDate: 'Apr 15, 2024', amount: '₹4.5L' },
                ].map((payment, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{payment.client}</p>
                      <p className="text-xs text-muted-foreground">{payment.invoice}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{payment.amount}</p>
                      <p className="text-xs text-muted-foreground">{payment.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="size-5 text-red-500" />
              Overdue Invoices
            </CardTitle>
            <CardDescription>Invoices that need immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 'INV-2024-003', client: 'Global Industries', amount: '₹8.5L', dueDate: 'Mar 31, 2024', dayOverdue: 6 },
              ].map((invoice) => (
                <div key={invoice.id} className="border-l-4 border-red-500 pl-3 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{invoice.client}</p>
                      <p className="text-xs text-muted-foreground">{invoice.id} - Due: {invoice.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-red-600">{invoice.amount}</p>
                      <p className="text-xs text-red-500">{invoice.dayOverdue} days overdue</p>
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

export function FinanceInvoicesPage() {
  return (
    <PortalLayout navItems={financeNav} portalName="Finance Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Create and manage client invoices</p>
        </div>
        <InvoicesTable />
      </div>
    </PortalLayout>
  );
}

export function FinancePaymentsPage() {
  const [showAddForm, setShowAddForm] = React.useState(false);

  const payments = [
    { id: 'PAY-2024-001', invoice: 'INV-2024-001', client: 'Acme Corporation', amount: '₹5.2L', date: 'Mar 29, 2024', method: 'Bank Transfer', status: 'Completed' },
    { id: 'PAY-2024-002', invoice: 'INV-2024-002', client: 'Tech Solutions Ltd', amount: '₹3.8L', date: 'Pending', method: 'Cheque', status: 'Pending' },
    { id: 'PAY-2024-003', invoice: 'INV-2024-004', client: 'Digital Ventures', amount: '₹2.1L', date: 'Mar 25, 2024', method: 'Online Payment', status: 'Completed' },
  ];

  return (
    <PortalLayout navItems={financeNav} portalName="Finance Portal">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payments</h1>
            <p className="text-muted-foreground">Track and manage client payments</p>
          </div>
          <button onClick={() => setShowAddForm(!showAddForm)} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">
            + Record Payment
          </button>
        </div>

        {showAddForm && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle>Record New Payment</CardTitle>
              <CardDescription>Log a payment received from a client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Invoice</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>INV-2024-002</option>
                      <option>INV-2024-003</option>
                      <option>INV-2024-005</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Amount</label>
                    <input type="text" placeholder="₹0" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                      <option>Bank Transfer</option>
                      <option>Cheque</option>
                      <option>Online Payment</option>
                      <option>Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Payment Date</label>
                    <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reference/Notes</label>
                  <textarea placeholder="Transaction reference, cheque number, etc..." className="w-full px-4 py-2 rounded-lg border border-input bg-background" rows={3} />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted">
                    Cancel
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">
                    Record Payment
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Payment Tracking</CardTitle>
            <CardDescription>All recorded and pending payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Payment ID</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Invoice</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Client</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Method</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-3 px-2 font-medium">{payment.id}</td>
                      <td className="py-3 px-2">{payment.invoice}</td>
                      <td className="py-3 px-2">{payment.client}</td>
                      <td className="py-3 px-2 font-semibold">{payment.amount}</td>
                      <td className="py-3 px-2">{payment.method}</td>
                      <td className="py-3 px-2 text-muted-foreground">{payment.date}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          payment.status === 'Completed' ? 'bg-green-50 text-green-700' :
                          'bg-yellow-50 text-yellow-700'
                        }`}>
                          {payment.status}
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

export function FinanceReportsPage() {
  return (
    <PortalLayout navItems={financeNav} portalName="Finance Portal">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Financial Reports</h1>
          <p className="text-muted-foreground">View comprehensive financial and billing reports</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Total Invoiced', value: '₹245.8L', change: '+15% YoY' },
            { label: 'Total Collected', value: '₹193.5L', change: '78.8% collection rate' },
            { label: 'Outstanding', value: '₹52.3L', change: '21.2% pending' },
            { label: 'Average Invoice', value: '₹4.2L', change: '12 invoices this month' },
          ].map((stat, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Client</CardTitle>
              <CardDescription>Top clients by invoice amount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { client: 'Global Industries', revenue: '₹18.5L', percentage: 7.5 },
                  { client: 'Acme Corporation', revenue: '₹15.2L', percentage: 6.2 },
                  { client: 'Tech Solutions Ltd', revenue: '₹12.8L', percentage: 5.2 },
                  { client: 'Innovation Hub', revenue: '₹11.5L', percentage: 4.7 },
                  { client: 'Digital Ventures', revenue: '₹9.2L', percentage: 3.7 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.client}</p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${item.percentage * 10}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-semibold ml-2">{item.revenue}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice Status Summary</CardTitle>
              <CardDescription>Overview of invoice statuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { status: 'Paid Invoices', count: 18, amount: '₹193.5L', color: 'bg-green-600' },
                  { status: 'Pending Invoices', count: 8, amount: '₹36.2L', color: 'bg-yellow-600' },
                  { status: 'Overdue Invoices', count: 1, amount: '₹8.5L', color: 'bg-red-600' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <div>
                        <p className="text-sm font-medium">{item.status}</p>
                        <p className="text-xs text-muted-foreground">{item.count} invoices</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{item.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Invoice amounts by month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: 'January', amount: '₹32.5L', invoices: 8 },
                { month: 'February', amount: '₹28.3L', invoices: 7 },
                { month: 'March', amount: '₹45.2L', invoices: 12 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{item.month}</p>
                    <p className="text-xs text-muted-foreground">{item.invoices} invoices</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-8 bg-muted rounded">
                      <div className="w-full h-full flex items-end justify-around px-1">
                        {[0.6, 0.5, 1].map((h, i) => (
                          <div key={i} className="w-1.5 bg-green-600 rounded-t" style={{ height: `${h * 100}%` }} />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm font-semibold w-20 text-right">{item.amount}</span>
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
