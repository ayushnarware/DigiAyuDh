import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  projects: number;
  status: 'active' | 'inactive' | 'paused';
  joinDate: string;
  totalSpent: string;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Aarav Sharma',
    email: 'aarav@lumera.com',
    company: 'Luméra Living',
    projects: 3,
    status: 'active',
    joinDate: 'Jan 15, 2024',
    totalSpent: '₹2,45,000',
  },
  {
    id: '2',
    name: 'Priya Desai',
    email: 'priya@viora.com',
    company: 'Viora Health',
    projects: 2,
    status: 'active',
    joinDate: 'Feb 20, 2024',
    totalSpent: '₹1,80,000',
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh@scaleos.com',
    company: 'ScaleOS',
    projects: 5,
    status: 'active',
    joinDate: 'Dec 10, 2023',
    totalSpent: '₹5,60,000',
  },
  {
    id: '4',
    name: 'Neha Singh',
    email: 'neha@startup.com',
    company: 'TechStartup Inc',
    projects: 1,
    status: 'paused',
    joinDate: 'Mar 5, 2024',
    totalSpent: '₹65,000',
  },
  {
    id: '5',
    name: 'Vikram Patel',
    email: 'vikram@enterprise.com',
    company: 'Enterprise Co',
    projects: 8,
    status: 'active',
    joinDate: 'Oct 22, 2023',
    totalSpent: '₹8,90,000',
  },
];

export function ClientsTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'paused'>(
    'all',
  );

  const filteredClients = useMemo(() => {
    return mockClients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.email.toLowerCase().includes(search.toLowerCase()) ||
        client.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30';
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-500/30';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-500/30';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Clients</CardTitle>
            <CardDescription>Manage and track all client accounts and projects</CardDescription>
          </div>
          <Button variant="brand" size="sm" className="gap-2">
            <Plus className="size-4" />
            Add Client
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or company..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Projects
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Total Spent
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Join Date
                </th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-border/50 hover:bg-accent/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{client.company}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-purple-700 dark:text-purple-400">
                      {client.projects}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={`capitalize ${getStatusColor(client.status)}`}>
                      {client.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-medium">{client.totalSpent}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{client.joinDate}</td>
                  <td className="px-4 py-3 text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="size-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredClients.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <p>
            Showing <span className="font-medium">{filteredClients.length}</span> of{' '}
            <span className="font-medium">{mockClients.length}</span> clients
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
