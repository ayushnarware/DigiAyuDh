'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Archive, Eye, FileText, Users, DollarSign } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnterpriseTable, type Column, type TableAction } from '@/components/tables/enterprise-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Client } from '@/types/entities.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { clientCreateSchema, type ClientCreateFormData } from '@/lib/validations/entities.schema';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Employees', href: '/admin/employees' },
  { label: 'Settings', href: '/admin/settings' },
];

// Mock clients data
const mockClients: Client[] = [
  {
    id: '1',
    companyName: 'Acme Corporation',
    displayName: 'Acme Corp',
    email: 'contact@acmecorp.com',
    phone: '+91-9876543210',
    website: 'https://acmecorp.com',
    industry: 'Manufacturing',
    employeeCount: 500,
    annualRevenue: 50000000,
    primaryContact: {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@acmecorp.com',
      phone: '+91-9876543210',
      designation: 'CEO',
      isPrimary: true,
    },
    address: '123 Business Street',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    zipCode: '400001',
    gstNumber: '27AABCT1234B1Z5',
    panNumber: 'AAACT1234B',
    accountStatus: 'Active',
    contracts: [],
    projects: [],
    invoices: [],
    payments: [],
    meetings: [],
    documents: [],
    communications: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
  },
  {
    id: '2',
    companyName: 'Global Solutions Ltd',
    displayName: 'Global Solutions',
    email: 'hello@globalsol.com',
    phone: '+91-9123456789',
    website: 'https://globalsolutions.com',
    industry: 'IT Services',
    employeeCount: 200,
    annualRevenue: 25000000,
    primaryContact: {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@globalsol.com',
      phone: '+91-9123456789',
      designation: 'Director',
      isPrimary: true,
    },
    address: '456 Tech Park',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    zipCode: '560001',
    gstNumber: '29AABCT5678B1Z9',
    panNumber: 'AAACT5678B',
    accountStatus: 'Active',
    contracts: [],
    projects: [],
    invoices: [],
    payments: [],
    meetings: [],
    documents: [],
    communications: [],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-06-15'),
  },
];

interface ClientFormProps {
  client?: Client;
  onSubmit: (data: ClientCreateFormData) => void;
  isLoading?: boolean;
}

function ClientForm({ client, onSubmit, isLoading }: ClientFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ClientCreateFormData>({
    resolver: zodResolver(clientCreateSchema) as any,
    defaultValues: client ? {
      companyName: client.companyName,
      displayName: client.displayName,
      email: client.email,
      phone: client.phone,
      website: client.website || '',
      industry: client.industry,
      employeeCount: client.employeeCount,
      annualRevenue: client.annualRevenue,
      contactFirstName: client.primaryContact.firstName,
      contactLastName: client.primaryContact.lastName,
      contactEmail: client.primaryContact.email,
      contactPhone: client.primaryContact.phone,
      contactDesignation: client.primaryContact.designation,
      address: client.address,
      city: client.city,
      state: client.state,
      country: client.country,
      zipCode: client.zipCode,
      gstNumber: client.gstNumber || '',
      panNumber: client.panNumber || '',
    } : undefined,
  });

  const handleFormSubmit: SubmitHandler<ClientCreateFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Company Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name *</label>
              <Input
                {...register('companyName')}
                placeholder="Company name"
                className={errors.companyName ? 'border-red-500' : ''}
              />
              {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Display Name *</label>
              <Input
                {...register('displayName')}
                placeholder="Display name"
                className={errors.displayName ? 'border-red-500' : ''}
              />
              {errors.displayName && <p className="text-xs text-red-500 mt-1">{errors.displayName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <Input
                {...register('email')}
                type="email"
                placeholder="contact@company.com"
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <Input {...register('website')} type="url" placeholder="https://company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Industry *</label>
              <Input
                {...register('industry')}
                placeholder="Industry"
                className={errors.industry ? 'border-red-500' : ''}
              />
              {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Employee Count</label>
              <Input {...register('employeeCount')} type="number" placeholder="Number of employees" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Annual Revenue</label>
              <Input {...register('annualRevenue')} type="number" placeholder="Annual revenue" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Primary Contact</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name *</label>
              <Input
                {...register('contactFirstName')}
                placeholder="First name"
                className={errors.contactFirstName ? 'border-red-500' : ''}
              />
              {errors.contactFirstName && <p className="text-xs text-red-500 mt-1">{errors.contactFirstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name *</label>
              <Input
                {...register('contactLastName')}
                placeholder="Last name"
                className={errors.contactLastName ? 'border-red-500' : ''}
              />
              {errors.contactLastName && <p className="text-xs text-red-500 mt-1">{errors.contactLastName.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              {...register('contactEmail')}
              type="email"
              placeholder="contact@company.com"
              className={errors.contactEmail ? 'border-red-500' : ''}
            />
            {errors.contactEmail && <p className="text-xs text-red-500 mt-1">{errors.contactEmail.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <Input
                {...register('contactPhone')}
                placeholder="+91-9123456789"
                className={errors.contactPhone ? 'border-red-500' : ''}
              />
              {errors.contactPhone && <p className="text-xs text-red-500 mt-1">{errors.contactPhone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Designation</label>
              <Input {...register('contactDesignation')} placeholder="Job title" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Address Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Address *</label>
            <Input
              {...register('address')}
              placeholder="Street address"
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">City *</label>
              <Input
                {...register('city')}
                placeholder="City"
                className={errors.city ? 'border-red-500' : ''}
              />
              {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">State *</label>
              <Input
                {...register('state')}
                placeholder="State"
                className={errors.state ? 'border-red-500' : ''}
              />
              {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ZIP Code *</label>
              <Input
                {...register('zipCode')}
                placeholder="ZIP code"
                className={errors.zipCode ? 'border-red-500' : ''}
              />
              {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Country *</label>
            <Input
              {...register('country')}
              placeholder="Country"
              className={errors.country ? 'border-red-500' : ''}
            />
            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4">Tax Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">GST Number</label>
            <Input {...register('gstNumber')} placeholder="27AABCT1234B1Z5" />
            {errors.gstNumber && <p className="text-xs text-red-500 mt-1">{errors.gstNumber.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">PAN Number</label>
            <Input {...register('panNumber')} placeholder="AAACT1234B" />
            {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? 'Saving...' : client ? 'Update Client' : 'Create Client'}
        </Button>
      </div>
    </form>
  );
}

export default function ClientManagementPage() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [selectedTab, setSelectedTab] = useState('list');

  const handleAddClient = async (data: ClientCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newClient: Client = {
        id: String(clients.length + 1),
        companyName: data.companyName,
        displayName: data.displayName,
        email: data.email,
        phone: data.phone,
        website: data.website,
        industry: data.industry,
        employeeCount: data.employeeCount,
        annualRevenue: data.annualRevenue,
        primaryContact: {
          id: '1',
          firstName: data.contactFirstName,
          lastName: data.contactLastName,
          email: data.contactEmail,
          phone: data.contactPhone,
          designation: data.contactDesignation,
          isPrimary: true,
        },
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        gstNumber: data.gstNumber || '',
        panNumber: data.panNumber || '',
        accountStatus: 'Active',
        contracts: [],
        projects: [],
        invoices: [],
        payments: [],
        meetings: [],
        documents: [],
        communications: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setClients([...clients, newClient]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<Client>[] = [
    { key: 'companyName', label: 'Company Name', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'industry', label: 'Industry', sortable: true },
    {
      key: 'accountStatus',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Active' ? 'bg-green-100 text-green-700' :
          status === 'Suspended' ? 'bg-red-100 text-red-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      ),
    },
  ];

  const actions: TableAction<Client>[] = [
    {
      label: 'View',
      icon: <Eye className="size-4" />,
      onClick: () => setSelectedTab('details'),
    },
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (client) => {
        setSelectedClient(client);
        setIsOpen(true);
      },
    },
    {
      label: 'Archive',
      icon: <Archive className="size-4" />,
      onClick: async (client) => {
        setClients(clients.map((c) => c.id === client.id ? { ...c, accountStatus: 'Archived' as const } : c));
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: async (client) => {
        setClients(clients.filter((c) => c.id !== client.id));
      },
    },
  ];

  return (
    <PortalLayout navItems={adminNav} portalName="Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Client Management</h1>
            <p className="text-muted-foreground">Create and manage client accounts</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedClient ? 'Edit Client' : 'Create New Client'}</DialogTitle>
              </DialogHeader>
              <ClientForm
                client={selectedClient}
                onSubmit={handleAddClient}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Clients', value: clients.length, icon: Users },
            { label: 'Active', value: clients.filter((c) => c.accountStatus === 'Active').length, icon: DollarSign },
            { label: 'Suspended', value: clients.filter((c) => c.accountStatus === 'Suspended').length, icon: FileText },
            { label: 'Archived', value: clients.filter((c) => c.accountStatus === 'Archived').length, icon: Archive },
          ].map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <IconComponent className="size-4" />
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="list">All Clients</TabsTrigger>
            <TabsTrigger value="contracts">Contracts</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <EnterpriseTable
              columns={columns}
              data={clients}
              actions={actions}
              pageSize={10}
              showSearch
              showExport
              isSelectable
            />
          </TabsContent>

          <TabsContent value="contracts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Contracts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No contracts found. Create a new contract to get started.</p>
                  <Button className="mt-4" variant="outline">Create Contract</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No invoices found. Create a new invoice to get started.</p>
                  <Button className="mt-4" variant="outline">Create Invoice</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            {selectedClient && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedClient.companyName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedClient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedClient.phone}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Primary Contact</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{selectedClient.primaryContact.firstName} {selectedClient.primaryContact.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Designation</p>
                        <p className="font-medium">{selectedClient.primaryContact.designation}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Tax Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">GST Number</p>
                        <p className="font-medium">{selectedClient.gstNumber || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">PAN Number</p>
                        <p className="font-medium">{selectedClient.panNumber || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
