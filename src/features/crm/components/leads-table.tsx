import { Plus, Search, Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'qualified' | 'negotiation' | 'closed' | 'lost';
  value: string;
  addedDate: string;
}

const mockLeads: Lead[] = [
  { id: '1', name: 'Rajesh Patel', company: 'Tech Corp India', email: 'rajesh@techcorp.in', phone: '+91-9876543210', source: 'LinkedIn', status: 'qualified', value: '₹25L', addedDate: 'Mar 15, 2024' },
  { id: '2', name: 'Priya Sharma', company: 'Global Solutions', email: 'priya@globalsol.com', phone: '+91-8765432109', source: 'Referral', status: 'negotiation', value: '₹40L', addedDate: 'Mar 10, 2024' },
  { id: '3', name: 'Amit Singh', company: 'Innovation Labs', email: 'amit@innolabs.com', phone: '+91-7654321098', source: 'Website', status: 'new', value: '₹15L', addedDate: 'Mar 20, 2024' },
  { id: '4', name: 'Deepa Gupta', company: 'Digital Enterprises', email: 'deepa@digent.in', phone: '+91-6543210987', source: 'Email Campaign', status: 'closed', value: '₹50L', addedDate: 'Feb 28, 2024' },
  { id: '5', name: 'Vikram Reddy', company: 'Cloud Services Inc', email: 'vikram@cloudserv.in', phone: '+91-5432109876', source: 'Event', status: 'lost', value: '₹20L', addedDate: 'Feb 15, 2024' },
];

export function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(
    () => leads.filter(lead =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
    ),
    [leads, search]
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this lead?')) setLeads(leads.filter(l => l.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'closed' ? 'default' : status === 'negotiation' ? 'secondary' : status === 'new' ? 'outline' : status === 'lost' ? 'destructive' : 'secondary';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Leads</CardTitle>
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>Add Lead</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Company</th>
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Source</th>
                  <th className="text-left py-3 px-4 font-medium">Value</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(lead => (
                  <tr key={lead.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{lead.name}</td>
                    <td className="py-3 px-4">{lead.company}</td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span className="text-xs">{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span className="text-xs">{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><Badge variant="outline">{lead.source}</Badge></td>
                    <td className="py-3 px-4 font-semibold">{lead.value}</td>
                    <td className="py-3 px-4"><Badge variant={getStatusColor(lead.status) as any}>{lead.status}</Badge></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" icon={<Edit2 className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Trash2 className="w-4 h-4 text-red-500" />} onClick={() => handleDelete(lead.id)} />
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
        <Modal isOpen={showAddModal} title="Add New Lead" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-2">Name</label><Input placeholder="Lead name" /></div>
            <div><label className="block text-sm font-medium mb-2">Company</label><Input placeholder="Company name" /></div>
            <div><label className="block text-sm font-medium mb-2">Email</label><Input type="email" placeholder="Email" /></div>
            <div><label className="block text-sm font-medium mb-2">Phone</label><Input placeholder="Phone number" /></div>
            <div><label className="block text-sm font-medium mb-2">Source</label><Input placeholder="Source" /></div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>Add Lead</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
