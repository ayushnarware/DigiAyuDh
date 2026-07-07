'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateDialog, EditDialog, DeleteConfirmDialog } from '@/components/shared/crud-dialogs';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  joinDate: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    phone: '+1-555-0001',
    designation: 'Senior Developer',
    department: 'Engineering',
    joinDate: '2022-01-15',
    salary: 120000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    phone: '+1-555-0002',
    designation: 'Product Manager',
    department: 'Product',
    joinDate: '2021-06-20',
    salary: 110000,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@company.com',
    phone: '+1-555-0003',
    designation: 'UI Designer',
    department: 'Design',
    joinDate: '2023-03-01',
    salary: 95000,
    status: 'active',
  },
];

const departments = [
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Product', value: 'Product' },
  { label: 'Design', value: 'Design' },
  { label: 'Sales', value: 'Sales' },
  { label: 'HR', value: 'HR' },
  { label: 'Finance', value: 'Finance' },
];

const designations = [
  { label: 'Junior Developer', value: 'Junior Developer' },
  { label: 'Senior Developer', value: 'Senior Developer' },
  { label: 'Lead Developer', value: 'Lead Developer' },
  { label: 'Product Manager', value: 'Product Manager' },
  { label: 'UI Designer', value: 'UI Designer' },
  { label: 'Manager', value: 'Manager' },
];

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filtered = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDept = !filterDept || emp.department === filterDept;
    return matchSearch && matchDept;
  });

  const handleCreate = async (data: any) => {
    const newEmployee: Employee = {
      id: `${Date.now()}`,
      ...data,
      status: 'active',
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleEdit = async (data: any) => {
    if (!selectedEmployee) return;
    setEmployees(employees.map(emp =>
      emp.id === selectedEmployee.id ? { ...emp, ...data } : emp
    ));
    setSelectedEmployee(null);
  };

  const handleDelete = async () => {
    if (!selectedEmployee) return;
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    setSelectedEmployee(null);
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Designation', 'Department', 'Status'].join(','),
      ...filtered.map(emp =>
        [emp.name, emp.email, emp.phone, emp.designation, emp.department, emp.status].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Employee Management</h2>
          <p className="text-muted-foreground">Manage all employees and their information</p>
        </div>
        <Button icon={<Plus className="size-4" />} onClick={() => setIsCreateOpen(true)}>
          Add Employee
        </Button>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Search</label>
              <Input
                placeholder="Search by name or email..."
                icon={<Search className="size-4" />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <label className="block text-sm font-medium mb-2">Department</label>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full p-3 rounded-lg border border-input bg-background"
              >
                <option value="">All Departments</option>
                {departments.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <Button variant="outline" icon={<Download className="size-4" />} onClick={handleExport}>
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-sm">Name</th>
                  <th className="text-left p-3 font-medium text-sm">Email</th>
                  <th className="text-left p-3 font-medium text-sm">Designation</th>
                  <th className="text-left p-3 font-medium text-sm">Department</th>
                  <th className="text-left p-3 font-medium text-sm">Status</th>
                  <th className="text-right p-3 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-muted-foreground">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  filtered.map(emp => (
                    <tr key={emp.id} className="border-b border-border hover:bg-muted transition-colors">
                      <td className="p-3">{emp.name}</td>
                      <td className="p-3 text-sm text-muted-foreground">{emp.email}</td>
                      <td className="p-3 text-sm">{emp.designation}</td>
                      <td className="p-3 text-sm">{emp.department}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          emp.status === 'active' ? 'bg-green-100 text-green-800' :
                          emp.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {emp.status.charAt(0).toUpperCase() + emp.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-3 text-right flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={<Edit2 className="size-4" />}
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setIsEditOpen(true);
                          }}
                          title="Edit employee"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={<Trash2 className="size-4 text-red-500" />}
                          onClick={() => {
                            setSelectedEmployee(emp);
                            setIsDeleteOpen(true);
                          }}
                          title="Delete employee"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <CreateDialog<Employee>
        isOpen={isCreateOpen}
        title="Add New Employee"
        fields={[
          { name: 'name', label: 'Full Name', required: true, placeholder: 'Enter full name' },
          { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'name@company.com' },
          { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+1-555-0000' },
          { name: 'designation', label: 'Designation', type: 'select', required: true, options: designations },
          { name: 'department', label: 'Department', type: 'select', required: true, options: departments },
          { name: 'joinDate', label: 'Join Date', type: 'text', required: true, placeholder: '2024-01-01' },
          { name: 'salary', label: 'Salary', type: 'number', required: true, placeholder: '100000' },
        ]}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
      />

      {/* Edit Dialog */}
      {selectedEmployee && (
        <EditDialog<Employee>
          isOpen={isEditOpen}
          title="Edit Employee"
          fields={[
            { name: 'name', label: 'Full Name', required: true, placeholder: 'Enter full name' },
            { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'name@company.com' },
            { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+1-555-0000' },
            { name: 'designation', label: 'Designation', type: 'select', required: true, options: designations },
            { name: 'department', label: 'Department', type: 'select', required: true, options: departments },
            { name: 'salary', label: 'Salary', type: 'number', required: true, placeholder: '100000' },
          ]}
          defaultValues={selectedEmployee}
          onClose={() => {
            setIsEditOpen(false);
            setSelectedEmployee(null);
          }}
          onSubmit={handleEdit}
        />
      )}

      {/* Delete Dialog */}
      {selectedEmployee && (
        <DeleteConfirmDialog
          isOpen={isDeleteOpen}
          itemName={selectedEmployee.name}
          itemType="employee"
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedEmployee(null);
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
