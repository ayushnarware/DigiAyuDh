'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Archive } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EnterpriseTable, type Column, type TableAction } from '@/components/tables/enterprise-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Company } from '@/types/entities.types';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyCreateSchema, type CompanyCreateFormData } from '@/lib/validations/entities.schema';

const superAdminNav = [
  { label: 'Dashboard', href: '/super-admin/dashboard' },
  { label: 'Companies', href: '/super-admin/companies' },
  { label: 'Admins', href: '/super-admin/admins' },
  { label: 'Employees', href: '/super-admin/employees' },
  { label: 'Settings', href: '/super-admin/settings' },
];

// Mock data
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Tech Solutions Ltd',
    legalName: 'Tech Solutions Private Limited',
    description: 'Leading software solutions provider',
    logo: '',
    website: 'https://techsolutions.com',
    email: 'info@techsolutions.com',
    phone: '+91-9123456789',
    registrationNumber: 'CIN:U72100DL2020PTC356789',
    gstNumber: '27AABCT1234B1Z5',
    panNumber: 'AAACT1234B',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    address: '123 Tech Park, IT Hub',
    zipCode: '110001',
    industry: 'Software Development',
    employeeCount: 150,
    foundedYear: 2020,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
];

interface CompanyFormProps {
  company?: Company;
  onSubmit: (data: CompanyCreateFormData) => void;
  isLoading?: boolean;
}

function CompanyForm({ company, onSubmit, isLoading }: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyCreateFormData>({
    resolver: zodResolver(companyCreateSchema) as any,
    defaultValues: company ? {
      name: company.name,
      legalName: company.legalName,
      email: company.email,
      phone: company.phone,
      website: company.website,
      registrationNumber: company.registrationNumber,
      gstNumber: company.gstNumber || '',
      panNumber: company.panNumber || '',
      country: company.country,
      state: company.state,
      city: company.city,
      address: company.address,
      zipCode: company.zipCode,
      industry: company.industry,
      currency: company.currency as any,
      timezone: company.timezone,
    } : undefined,
  });

  const handleFormSubmit: SubmitHandler<CompanyCreateFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Company Name *</label>
          <Input
            {...register('name')}
            placeholder="Enter company name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Legal Name *</label>
          <Input
            {...register('legalName')}
            placeholder="Enter legal company name"
            className={errors.legalName ? 'border-red-500' : ''}
          />
          {errors.legalName && <p className="text-xs text-red-500 mt-1">{errors.legalName.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          placeholder="Company description"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input
            {...register('email')}
            type="email"
            placeholder="info@company.com"
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
          <Input
            {...register('website')}
            type="url"
            placeholder="https://company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Industry *</label>
          <Input
            {...register('industry')}
            placeholder="Software Development"
            className={errors.industry ? 'border-red-500' : ''}
          />
          {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Registration Number *</label>
          <Input
            {...register('registrationNumber')}
            placeholder="CIN:U72100DL2020PTC356789"
            className={errors.registrationNumber ? 'border-red-500' : ''}
          />
          {errors.registrationNumber && <p className="text-xs text-red-500 mt-1">{errors.registrationNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">GST Number</label>
          <Input
            {...register('gstNumber')}
            placeholder="27AABCT1234B1Z5"
          />
          {errors.gstNumber && <p className="text-xs text-red-500 mt-1">{errors.gstNumber.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">PAN Number</label>
          <Input
            {...register('panNumber')}
            placeholder="AAACT1234B"
          />
          {errors.panNumber && <p className="text-xs text-red-500 mt-1">{errors.panNumber.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Currency</label>
          <select
            {...register('currency')}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="AED">AED</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Country *</label>
          <Input
            {...register('country')}
            placeholder="India"
            className={errors.country ? 'border-red-500' : ''}
          />
          {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">State *</label>
          <Input
            {...register('state')}
            placeholder="Delhi"
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City *</label>
          <Input
            {...register('city')}
            placeholder="New Delhi"
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code *</label>
          <Input
            {...register('zipCode')}
            placeholder="110001"
            className={errors.zipCode ? 'border-red-500' : ''}
          />
          {errors.zipCode && <p className="text-xs text-red-500 mt-1">{errors.zipCode.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Address *</label>
        <textarea
          {...register('address')}
          placeholder="Company address"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          rows={2}
        />
        {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? 'Saving...' : company ? 'Update Company' : 'Create Company'}
        </Button>
      </div>
    </form>
  );
}

export default function CompanyManagementPage() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>();

  const handleAddCompany = async (data: CompanyCreateFormData) => {
    setIsLoading(true);
    try {
      // API call will be made here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newCompany: Company = {
        id: String(companies.length + 1),
        name: data.name,
        legalName: data.legalName,
        description: data.description || '',
        logo: '',
        website: data.website || '',
        email: data.email,
        phone: data.phone,
        registrationNumber: data.registrationNumber,
        gstNumber: data.gstNumber || '',
        panNumber: data.panNumber || '',
        currency: data.currency as 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED',
        timezone: 'Asia/Kolkata',
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        zipCode: data.zipCode,
        industry: data.industry,
        employeeCount: 0,
        foundedYear: new Date().getFullYear(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      setCompanies([...companies, newCompany]);
      setIsOpen(false);
      // Show success toast
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<Company>[] = [
    { key: 'name', label: 'Company Name', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'industry', label: 'Industry', sortable: true },
    { key: 'gstNumber', label: 'GST Number', sortable: true },
    {
      key: 'isActive',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const actions: TableAction<Company>[] = [
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (company) => {
        setSelectedCompany(company);
        setIsOpen(true);
      },
    },
    {
      label: 'Archive',
      icon: <Archive className="size-4" />,
      onClick: async (company) => {
        // Archive API call
        setCompanies(companies.map((c) => c.id === company.id ? { ...c, isActive: false } : c));
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: async (company) => {
        // Delete API call
        setCompanies(companies.filter((c) => c.id !== company.id));
      },
    },
  ];

  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Company Management</h1>
            <p className="text-muted-foreground">Create and manage organizations</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                Add Company
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedCompany ? 'Edit Company' : 'Create New Company'}</DialogTitle>
              </DialogHeader>
              <CompanyForm
                company={selectedCompany}
                onSubmit={handleAddCompany}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <EnterpriseTable
          columns={columns}
          data={companies}
          actions={actions}
          pageSize={10}
          showSearch
          showExport
          showImport
          isSelectable
        />
      </div>
    </PortalLayout>
  );
}
