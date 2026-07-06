'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, User, DollarSign, FileText, Briefcase } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnterpriseTable, type Column, type TableAction } from '@/components/tables/enterprise-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Employee, Department, Designation } from '@/types/entities.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeCreateSchema, type EmployeeCreateFormData } from '@/lib/validations/entities.schema';

const superAdminNav = [
  { label: 'Dashboard', href: '/super-admin/dashboard' },
  { label: 'Companies', href: '/super-admin/companies' },
  { label: 'Admins', href: '/super-admin/admins' },
  { label: 'Employees', href: '/super-admin/employees' },
  { label: 'Settings', href: '/super-admin/settings' },
];

// Mock Departments
const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development team',
    company: { id: '1', name: 'Tech Solutions', isActive: true } as any,
    headCount: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Finance',
    description: 'Finance and accounting',
    company: { id: '1', name: 'Tech Solutions', isActive: true } as any,
    headCount: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

// Mock Designations
const mockDesignations: Designation[] = [
  {
    id: '1',
    name: 'Senior Software Engineer',
    description: 'Senior level software engineer',
    level: 'Senior',
    department: mockDepartments[0],
    salaryRange: { min: 80000, max: 120000 },
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Software Engineer',
    description: 'Junior level software engineer',
    level: 'Junior',
    department: mockDepartments[0],
    salaryRange: { min: 40000, max: 70000 },
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

// Mock Employees
const mockEmployees: Employee[] = [
  {
    id: '1',
    userId: 'emp1',
    firstName: 'Amit',
    lastName: 'Patel',
    email: 'amit@techsolutions.com',
    phone: '+91-9123456789',
    employeeCode: 'EMP001',
    department: mockDepartments[0],
    designation: mockDesignations[0],
    employmentType: 'Full-Time',
    employmentStatus: 'Active',
    joinDate: new Date('2022-01-15'),
    salaryStructure: {
      id: '1',
      employee: {} as any,
      baseSalary: 100000,
      hra: 30000,
      dearness: 10000,
      grossSalary: 140000,
      netSalary: 120000,
      currency: 'INR',
      effectiveDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    bankDetails: {
      id: '1',
      accountHolderName: 'Amit Patel',
      accountNumber: '123456789012',
      accountType: 'Savings',
      bankName: 'HDFC Bank',
      ifscCode: 'HDFC0000001',
      isPrimary: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    documents: [],
    skills: [
      { id: '1', name: 'Java', proficiency: 'Expert', yearsOfExperience: 8, endorsements: 15 },
      { id: '2', name: 'React', proficiency: 'Advanced', yearsOfExperience: 5, endorsements: 12 },
    ],
    experience: [],
    emergencyContact: {
      id: '1',
      name: 'Priya Patel',
      relationship: 'Spouse',
      phone: '+91-9987654321',
      address: 'Home Address',
    },
    attendance: [],
    leave: [],
    payroll: [],
    performance: [],
    assets: [],
    createdAt: new Date('2022-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
];

interface EmployeeFormProps {
  employee?: Employee;
  departments: Department[];
  designations: Designation[];
  onSubmit: (data: EmployeeCreateFormData) => void;
  isLoading?: boolean;
}

function EmployeeForm({ employee, departments, designations, onSubmit, isLoading }: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeCreateFormData>({
    resolver: zodResolver(employeeCreateSchema),
    defaultValues: employee ? {
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      employeeCode: employee.employeeCode,
      departmentId: employee.department.id,
      designationId: employee.designation.id,
      employmentType: employee.employmentType,
      joinDate: employee.joinDate,
      accountHolderName: employee.bankDetails.accountHolderName,
      accountNumber: employee.bankDetails.accountNumber,
      accountType: employee.bankDetails.accountType,
      bankName: employee.bankDetails.bankName,
      ifscCode: employee.bankDetails.ifscCode,
      emergencyContactName: employee.emergencyContact.name,
      emergencyContactRelationship: employee.emergencyContact.relationship,
      emergencyContactPhone: employee.emergencyContact.phone,
      emergencyContactAddress: employee.emergencyContact.address,
    } : undefined,
  });

  const handleFormSubmit = async (data: EmployeeCreateFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4 flex items-center gap-2"><User className="size-4" /> Personal Information</h3>
        <div className="space-y-4">
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
              placeholder="employee@company.com"
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone *</label>
              <Input
                {...register('phone')}
                placeholder="+91-9123456789"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <Input {...register('dateOfBirth')} type="date" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select {...register('gender')} className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Personal Email</label>
              <Input {...register('personalEmail')} type="email" placeholder="personal@email.com" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Briefcase className="size-4" /> Company Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Employee Code *</label>
              <Input
                {...register('employeeCode')}
                placeholder="EMP001"
                className={errors.employeeCode ? 'border-red-500' : ''}
              />
              {errors.employeeCode && <p className="text-xs text-red-500 mt-1">{errors.employeeCode.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Department *</label>
              <select
                {...register('departmentId')}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
              {errors.departmentId && <p className="text-xs text-red-500 mt-1">{errors.departmentId.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Designation *</label>
              <select
                {...register('designationId')}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="">Select Designation</option>
                {designations.map((desig) => (
                  <option key={desig.id} value={desig.id}>{desig.name}</option>
                ))}
              </select>
              {errors.designationId && <p className="text-xs text-red-500 mt-1">{errors.designationId.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Employment Type *</label>
              <select
                {...register('employmentType')}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Intern">Intern</option>
              </select>
              {errors.employmentType && <p className="text-xs text-red-500 mt-1">{errors.employmentType.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Join Date *</label>
            <Input
              {...register('joinDate')}
              type="date"
              className={errors.joinDate ? 'border-red-500' : ''}
            />
            {errors.joinDate && <p className="text-xs text-red-500 mt-1">{errors.joinDate.message}</p>}
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><DollarSign className="size-4" /> Bank Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Account Holder Name *</label>
            <Input
              {...register('accountHolderName')}
              placeholder="Full name"
              className={errors.accountHolderName ? 'border-red-500' : ''}
            />
            {errors.accountHolderName && <p className="text-xs text-red-500 mt-1">{errors.accountHolderName.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Account Number *</label>
              <Input
                {...register('accountNumber')}
                placeholder="Account number"
                className={errors.accountNumber ? 'border-red-500' : ''}
              />
              {errors.accountNumber && <p className="text-xs text-red-500 mt-1">{errors.accountNumber.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Account Type *</label>
              <select
                {...register('accountType')}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
                <option value="Other">Other</option>
              </select>
              {errors.accountType && <p className="text-xs text-red-500 mt-1">{errors.accountType.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Bank Name *</label>
              <Input
                {...register('bankName')}
                placeholder="Bank name"
                className={errors.bankName ? 'border-red-500' : ''}
              />
              {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">IFSC Code *</label>
              <Input
                {...register('ifscCode')}
                placeholder="HDFC0000001"
                className={errors.ifscCode ? 'border-red-500' : ''}
              />
              {errors.ifscCode && <p className="text-xs text-red-500 mt-1">{errors.ifscCode.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText className="size-4" /> Emergency Contact</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <Input
                {...register('emergencyContactName')}
                placeholder="Emergency contact name"
                className={errors.emergencyContactName ? 'border-red-500' : ''}
              />
              {errors.emergencyContactName && <p className="text-xs text-red-500 mt-1">{errors.emergencyContactName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Relationship *</label>
              <Input
                {...register('emergencyContactRelationship')}
                placeholder="Relationship"
                className={errors.emergencyContactRelationship ? 'border-red-500' : ''}
              />
              {errors.emergencyContactRelationship && <p className="text-xs text-red-500 mt-1">{errors.emergencyContactRelationship.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone *</label>
            <Input
              {...register('emergencyContactPhone')}
              placeholder="+91-9123456789"
              className={errors.emergencyContactPhone ? 'border-red-500' : ''}
            />
            {errors.emergencyContactPhone && <p className="text-xs text-red-500 mt-1">{errors.emergencyContactPhone.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address *</label>
            <textarea
              {...register('emergencyContactAddress')}
              placeholder="Emergency contact address"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              rows={2}
            />
            {errors.emergencyContactAddress && <p className="text-xs text-red-500 mt-1">{errors.emergencyContactAddress.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
}

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();
  const [activeTab, setActiveTab] = useState('list');

  const handleAddEmployee = async (data: EmployeeCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const dept = mockDepartments.find((d) => d.id === data.departmentId)!;
      const desig = mockDesignations.find((d) => d.id === data.designationId)!;
      const newEmployee: Employee = {
        id: String(employees.length + 1),
        userId: `emp${employees.length + 1}`,
        ...data,
        joinDate: new Date(data.joinDate),
        department: dept,
        designation: desig,
        employmentStatus: 'Active',
        salaryStructure: {
          id: String(employees.length + 1),
          employee: {} as any,
          baseSalary: 0,
          grossSalary: 0,
          netSalary: 0,
          currency: 'INR',
          effectiveDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        bankDetails: {
          id: String(employees.length + 1),
          accountHolderName: data.accountHolderName,
          accountNumber: data.accountNumber,
          accountType: data.accountType,
          bankName: data.bankName,
          ifscCode: data.ifscCode,
          isPrimary: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        documents: [],
        skills: [],
        experience: [],
        emergencyContact: {
          id: String(employees.length + 1),
          name: data.emergencyContactName,
          relationship: data.emergencyContactRelationship,
          phone: data.emergencyContactPhone,
          address: data.emergencyContactAddress,
        },
        attendance: [],
        leave: [],
        payroll: [],
        performance: [],
        assets: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      setEmployees([...employees, newEmployee]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const columns: Column<Employee>[] = [
    {
      key: 'firstName',
      label: 'Name',
      sortable: true,
      render: (_, emp) => `${emp.firstName} ${emp.lastName}`,
    },
    { key: 'employeeCode', label: 'Code', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    {
      key: 'designation',
      label: 'Designation',
      sortable: true,
      render: (_, emp) => emp.designation.name,
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (_, emp) => emp.department.name,
    },
    {
      key: 'employmentStatus',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      ),
    },
  ];

  const actions: TableAction<Employee>[] = [
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (emp) => {
        setSelectedEmployee(emp);
        setIsOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: async (emp) => {
        setEmployees(employees.filter((e) => e.id !== emp.id));
      },
    },
  ];

  return (
    <PortalLayout navItems={superAdminNav} portalName="Super Admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Employee Management</h1>
            <p className="text-muted-foreground">Manage employee records and information</p>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="size-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedEmployee ? 'Edit Employee' : 'Create New Employee'}</DialogTitle>
              </DialogHeader>
              <EmployeeForm
                employee={selectedEmployee}
                departments={mockDepartments}
                designations={mockDesignations}
                onSubmit={handleAddEmployee}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Total Employees', value: employees.length },
            { label: 'Active', value: employees.filter((e) => e.isActive).length },
            { label: 'On Leave', value: employees.filter((e) => e.employmentStatus === 'On Leave').length },
            { label: 'This Month', value: employees.filter((e) => new Date(e.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000).length },
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="list">Employees</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="designations">Designations</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <EnterpriseTable
              columns={columns}
              data={employees}
              actions={actions}
              pageSize={10}
              showSearch
              showExport
              isSelectable
            />
          </TabsContent>

          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Departments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDepartments.map((dept) => (
                    <div key={dept.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">{dept.name}</p>
                        <p className="text-xs text-muted-foreground">{dept.description}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{dept.headCount} employees</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="designations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Designations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDesignations.map((desig) => (
                    <div key={desig.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div>
                        <p className="font-medium">{desig.name}</p>
                        <p className="text-xs text-muted-foreground">{desig.level} Level • {desig.department.name}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm">₹{desig.salaryRange.min/1000}L - ₹{desig.salaryRange.max/1000}L</span>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
