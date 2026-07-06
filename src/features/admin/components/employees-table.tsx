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

interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Developer' | 'Designer' | 'Manager' | 'QA' | 'Architect';
  department: string;
  status: 'active' | 'inactive' | 'on-leave';
  joinDate: string;
  projects: number;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Priya Mehta',
    email: 'priya@digiayudh.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'active',
    joinDate: 'Jan 10, 2023',
    projects: 3,
  },
  {
    id: '2',
    name: 'Rahul Singh',
    email: 'rahul@digiayudh.com',
    role: 'Developer',
    department: 'Engineering',
    status: 'active',
    joinDate: 'Mar 15, 2023',
    projects: 2,
  },
  {
    id: '3',
    name: 'Ananya Gupta',
    email: 'ananya@digiayudh.com',
    role: 'Designer',
    department: 'Design',
    status: 'active',
    joinDate: 'Feb 20, 2023',
    projects: 4,
  },
  {
    id: '4',
    name: 'Vikas Verma',
    email: 'vikas@digiayudh.com',
    role: 'Manager',
    department: 'Management',
    status: 'active',
    joinDate: 'Dec 5, 2022',
    projects: 5,
  },
  {
    id: '5',
    name: 'Neha Kapoor',
    email: 'neha@digiayudh.com',
    role: 'QA',
    department: 'Quality Assurance',
    status: 'on-leave',
    joinDate: 'Apr 1, 2023',
    projects: 2,
  },
  {
    id: '6',
    name: 'Arjun Desai',
    email: 'arjun@digiayudh.com',
    role: 'Architect',
    department: 'Engineering',
    status: 'active',
    joinDate: 'Jun 15, 2022',
    projects: 8,
  },
];

export function EmployeesTable() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Developer' | 'Designer' | 'Manager' | 'QA' | 'Architect'>(
    'all',
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'on-leave'>(
    'all',
  );

  const filteredEmployees = useMemo(() => {
    return mockEmployees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === 'all' || emp.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'on-leave':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'inactive':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return '';
    }
  };

  const getRoleColor = (role: Employee['role']) => {
    switch (role) {
      case 'Developer':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'Designer':
        return 'bg-pink-500/10 text-pink-700 dark:text-pink-400';
      case 'Manager':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'QA':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'Architect':
        return 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Manage team members and their assignments</CardDescription>
          </div>
          <Button variant="brand" size="sm" className="gap-2">
            <Plus className="size-4" />
            Add Employee
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email or department..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={(v: any) => setRoleFilter(v)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="QA">QA</SelectItem>
              <SelectItem value="Architect">Architect</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Employee
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Department
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Projects
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
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="border-b border-border/50 hover:bg-accent/50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={getRoleColor(emp.role)}>
                      {emp.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">{emp.department}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={getStatusColor(emp.status)}>
                      {emp.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-purple-700 dark:text-purple-400">
                      {emp.projects}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{emp.joinDate}</td>
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

        {filteredEmployees.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No employees found</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <p>
            Showing <span className="font-medium">{filteredEmployees.length}</span> of{' '}
            <span className="font-medium">{mockEmployees.length}</span> employees
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
