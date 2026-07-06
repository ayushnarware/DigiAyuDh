import { MoreHorizontal, Plus, Search, BarChart3 } from 'lucide-react';
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

interface Tenant {
  id: string;
  name: string;
  domain: string;
  contactEmail: string;
  status: 'active' | 'trial' | 'suspended' | 'inactive';
  plan: 'startup' | 'growth' | 'enterprise';
  users: number;
  createdDate: string;
  revenue: string;
}

const mockTenants: Tenant[] = [
  {
    id: 'tenant_lumera',
    name: 'Luméra Living',
    domain: 'lumera.digiayudh.io',
    contactEmail: 'aarav@lumera.com',
    status: 'active',
    plan: 'enterprise',
    users: 24,
    createdDate: 'Jan 15, 2024',
    revenue: '₹2,45,000',
  },
  {
    id: 'tenant_viora',
    name: 'Viora Health',
    domain: 'viora.digiayudh.io',
    contactEmail: 'priya@viora.com',
    status: 'active',
    plan: 'growth',
    users: 12,
    createdDate: 'Feb 20, 2024',
    revenue: '₹1,80,000',
  },
  {
    id: 'tenant_scaleos',
    name: 'ScaleOS',
    domain: 'scaleos.digiayudh.io',
    contactEmail: 'rajesh@scaleos.com',
    status: 'active',
    plan: 'enterprise',
    users: 45,
    createdDate: 'Dec 10, 2023',
    revenue: '₹5,60,000',
  },
  {
    id: 'tenant_startup',
    name: 'TechStartup Inc',
    domain: 'techstartup.digiayudh.io',
    contactEmail: 'neha@startup.com',
    status: 'trial',
    plan: 'startup',
    users: 5,
    createdDate: 'Mar 5, 2024',
    revenue: '₹0',
  },
  {
    id: 'tenant_enterprise',
    name: 'Enterprise Co',
    domain: 'enterprise.digiayudh.io',
    contactEmail: 'vikram@enterprise.com',
    status: 'active',
    plan: 'enterprise',
    users: 120,
    createdDate: 'Oct 22, 2023',
    revenue: '₹8,90,000',
  },
];

export function TenantsTable() {
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState<'all' | 'startup' | 'growth' | 'enterprise'>(
    'all',
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'trial' | 'suspended' | 'inactive'>(
    'all',
  );

  const filteredTenants = useMemo(() => {
    return mockTenants.filter((tenant) => {
      const matchesSearch =
        tenant.name.toLowerCase().includes(search.toLowerCase()) ||
        tenant.domain.toLowerCase().includes(search.toLowerCase()) ||
        tenant.contactEmail.toLowerCase().includes(search.toLowerCase());

      const matchesPlan = planFilter === 'all' || tenant.plan === planFilter;
      const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [search, planFilter, statusFilter]);

  const getPlanColor = (plan: Tenant['plan']) => {
    switch (plan) {
      case 'enterprise':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'growth':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'startup':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return '';
    }
  };

  const getStatusColor = (status: Tenant['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'trial':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'suspended':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return '';
    }
  };

  const totalRevenue = filteredTenants.reduce((sum, t) => {
    const val = parseInt(t.revenue.replace(/[₹,]/g, ''));
    return sum + val;
  }, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tenants</CardTitle>
            <BarChart3 className="size-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockTenants.length}</p>
            <p className="text-xs text-muted-foreground">{filteredTenants.length} active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <BarChart3 className="size-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{mockTenants.reduce((sum, t) => sum + t.users, 0)}</p>
            <p className="text-xs text-muted-foreground">Across all tenants</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <BarChart3 className="size-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">₹{(totalRevenue / 100000).toFixed(1)}L</p>
            <p className="text-xs text-muted-foreground">Monthly recurring</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Growth</CardTitle>
            <BarChart3 className="size-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">23%</p>
            <p className="text-xs text-muted-foreground">↗ vs last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tenants</CardTitle>
              <CardDescription>Manage all platform tenants and their configurations</CardDescription>
            </div>
            <Button variant="brand" size="sm" className="gap-2">
              <Plus className="size-4" />
              New Tenant
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, domain or email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={planFilter} onValueChange={(v: any) => setPlanFilter(v)}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="startup">Startup</SelectItem>
                <SelectItem value="growth">Growth</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tenant</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Domain</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Plan</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Users</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Revenue</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Created</th>
                  <th className="px-4 py-3 text-center font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className="border-b border-border/50 hover:bg-accent/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium">{tenant.name}</p>
                        <p className="text-xs text-muted-foreground">{tenant.contactEmail}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-purple-400">{tenant.domain}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={getPlanColor(tenant.plan)}>
                        {tenant.plan}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={getStatusColor(tenant.status)}>
                        {tenant.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-purple-700 dark:text-purple-400">
                        {tenant.users}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">{tenant.revenue}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{tenant.createdDate}</td>
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

          {filteredTenants.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No tenants found</p>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
            <p>
              Showing <span className="font-medium">{filteredTenants.length}</span> of{' '}
              <span className="font-medium">{mockTenants.length}</span> tenants
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
    </div>
  );
}
