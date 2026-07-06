'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Lock } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EnterpriseTable, type Column, type TableAction } from '@/components/tables/enterprise-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Admin } from '@/types/entities.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminCreateSchema, type AdminCreateFormData } from '@/lib/validations/entities.schema';

const superAdminNav = [
  { label: 'Dashboard', href: '/super-admin/dashboard' },
  { label: 'Companies', href: '/super-admin/companies' },
  { label: 'Admins', href: '/super-admin/admins' },
  { label: 'Employees', href: '/super-admin/employees' },
  { label: 'Settings', href: '/super-admin/settings' },
];

// Mock data
const mockAdmins: Admin[] = [
  {
    id: '1',
    userId: 'user1',
    firstName: 'Rajesh',
    lastName: 'Kumar',
    email: 'rajesh@techsolutions.com',
    phone: '+91-9123456789',
    role: 'admin',
    department: 'IT Operations',
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    lastLogin: new Date('2024-06-20 10:30:00'),
    loginAttempts: 0,
    isLocked: false,
  },
  {
    id: '2',
    userId: 'user2',
    firstName: 'Priya',
    lastName: 'Singh',
    email: 'priya@techsolutions.com',
    phone: '+91-9987654321',
    role: 'admin',
    department: 'Finance',
    isActive: true,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-06-15'),
    lastLogin: new Date('2024-06-19 14:15:00'),
    loginAttempts: 0,
    isLocked: false,
  },
];

interface AdminFormProps {
  admin?: Admin;
  onSubmit: (data: AdminCreateFormData) => void;
  isLoading?: boolean;
}

function AdminForm({ admin, onSubmit, isLoading }: AdminFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminCreateFormData>({
    resolver: zodResolver(adminCreateSchema),
    defaultValues: admin ? {
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phone: admin.phone,
      role: admin.role,
      department: admin.department,
    } : undefined,
  });

  const handleFormSubmit = async (data: AdminCreateFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">First Name *</label>
          <Input
            {...register('firstName')}
            placeholder="First name"
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Last Name *</label>
          <Input
            {...register('lastName')}
            placeholder="Last name"
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <Input
          {...register('email')}
          type="email"
          placeholder="admin@company.com"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone *</label>
        <Input
          {...register('phone')}
          placeholder="+91-9123456789"
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Role *</label>
          <select
            {...register('role')}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          >
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Department</label>
          <Input
            {...register('department')}
            placeholder="Department"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? 'Saving...' : admin ? 'Update Admin' : 'Create Admin'}
        </Button>
      </div>
    </form>
  );
}

export default function AdminManagementPage() {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | undefined>();

  const handleAddAdmin = async (data: AdminCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newAdmin: Admin = {
        id: String(admins.length + 1),
        userId: `user${admins.length + 1}`,
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        loginAttempts: 0,
        isLocked: false,
      };
      setAdmins([...admins, newAdmin]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<Admin>[] = [
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (_, admin) => `${admin.firstName} ${admin.lastName}`,
    },
    { key: 'email', label: 'Email', sortable: true, filterable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    {
      key: 'isLocked',
      label: 'Account Status',
      render: (isLocked) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          !isLocked ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {!isLocked ? 'Active' : 'Locked'}
        </span>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (date) => date ? new Date(date).toLocaleDateString() : 'Never',
    },
  ];

  const actions: TableAction<Admin>[] = [
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (admin) => {
        setSelectedAdmin(admin);
        setIsOpen(true);
      },
    },
    {
      label: 'Lock Account',
      icon: <Lock className="size-4" />,
      variant: 'outline',
      onClick: async (admin) => {
        setAdmins(admins.map((a) => a.id === admin.id ? { ...a, isLocked: true } : a));
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: async (admin) => {
        setAdmins(admins.filter((a) => a.id !== admin.id));
      },
    },
  ];

  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Management</h1>
            <p className="text-muted-foreground">Create and manage system administrators</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedAdmin ? 'Edit Admin' : 'Create New Admin'}</DialogTitle>
              </DialogHeader>
              <AdminForm
                admin={selectedAdmin}
                onSubmit={handleAddAdmin}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Admins', value: admins.length },
            { label: 'Active', value: admins.filter((a) => a.isActive).length },
            { label: 'Locked', value: admins.filter((a) => a.isLocked).length },
            { label: 'Last 30 Days', value: admins.filter((a) => new Date(a.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <EnterpriseTable
          columns={columns}
          data={admins}
          actions={actions}
          pageSize={10}
          showSearch
          showExport
          isSelectable
        />
      </div>
    </PortalLayout>
  );
}
