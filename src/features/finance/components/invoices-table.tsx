import { Plus, Search, Download, Eye, Edit2, Trash2, FileText } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: string;
  issuedDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  project: string;
}

const mockInvoices: Invoice[] = [
  { id: '1', invoiceNumber: 'INV-2024-001', client: 'Acme Corporation', amount: '₹5.2L', issuedDate: 'Mar 1, 2024', dueDate: 'Mar 31, 2024', status: 'paid', project: 'Web Portal' },
  { id: '2', invoiceNumber: 'INV-2024-002', client: 'Tech Solutions Ltd', amount: '₹3.8L', issuedDate: 'Mar 5, 2024', dueDate: 'Apr 5, 2024', status: 'pending', project: 'Mobile App' },
  { id: '3', invoiceNumber: 'INV-2024-003', client: 'Global Industries', amount: '₹8.5L', issuedDate: 'Mar 10, 2024', dueDate: 'Mar 31, 2024', status: 'overdue', project: 'ERP System' },
  { id: '4', invoiceNumber: 'INV-2024-004', client: 'Digital Ventures', amount: '₹2.1L', issuedDate: 'Mar 15, 2024', dueDate: 'Apr 15, 2024', status: 'draft', project: 'Dashboard' },
  { id: '5', invoiceNumber: 'INV-2024-005', client: 'Innovation Hub', amount: '₹4.5L', issuedDate: 'Mar 20, 2024', dueDate: 'Apr 20, 2024', status: 'pending', project: 'API Integration' },
];

export function InvoicesTable() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(
    () => invoices.filter(inv =>
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.project.toLowerCase().includes(search.toLowerCase())
    ),
    [invoices, search]
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this invoice?')) setInvoices(invoices.filter(i => i.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'paid' ? 'default' : status === 'pending' ? 'secondary' : status === 'overdue' ? 'destructive' : 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Invoices</CardTitle>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>Create Invoice</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search invoices by number, client, or project..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Invoice</th>
                  <th className="text-left py-3 px-4 font-medium">Client</th>
                  <th className="text-left py-3 px-4 font-medium">Project</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Dates</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{inv.invoiceNumber}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{inv.client}</td>
                    <td className="py-3 px-4 text-muted-foreground">{inv.project}</td>
                    <td className="py-3 px-4 font-semibold">{inv.amount}</td>
                    <td className="py-3 px-4 text-xs">
                      <p>{inv.issuedDate}</p>
                      <p className="text-muted-foreground">Due: {inv.dueDate}</p>
                    </td>
                    <td className="py-3 px-4"><Badge variant={getStatusColor(inv.status) as any}>{inv.status}</Badge></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 justify-end">
                        <Button variant="ghost" size="icon" icon={<Eye className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Download className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Edit2 className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Trash2 className="w-4 h-4 text-red-500" />} onClick={() => handleDelete(inv.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      {showAddModal && (
        <Modal isOpen={showAddModal} title="Create Invoice" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-2">Client</label><Input placeholder="Select client" /></div>
            <div><label className="block text-sm font-medium mb-2">Project</label><Input placeholder="Select project" /></div>
            <div><label className="block text-sm font-medium mb-2">Amount</label><Input placeholder="₹" /></div>
            <div><label className="block text-sm font-medium mb-2">Due Date</label><Input type="date" /></div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>Create</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
