'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Users, Building2, Briefcase } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnterpriseTable, type Column, type TableAction } from '@/components/tables/enterprise-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Department, Designation, Team } from '@/types/entities.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { departmentCreateSchema, designationCreateSchema, teamCreateSchema, type DepartmentCreateFormData, type DesignationCreateFormData, type TeamCreateFormData } from '@/lib/validations/entities.schema';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'Operations', href: '/admin/operations' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Settings', href: '/admin/settings' },
];

// Mock data
const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and engineering team',
    company: { id: '1', name: 'Tech Solutions', isActive: true } as any,
    headCount: 25,
    budget: 5000000,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Finance',
    description: 'Financial operations and accounting',
    company: { id: '1', name: 'Tech Solutions', isActive: true } as any,
    headCount: 8,
    budget: 1500000,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
  {
    id: '3',
    name: 'Sales',
    description: 'Business development and sales',
    company: { id: '1', name: 'Tech Solutions', isActive: true } as any,
    headCount: 15,
    budget: 2000000,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
];

const mockDesignations: Designation[] = [
  {
    id: '1',
    name: 'Senior Software Engineer',
    description: 'Senior level software engineer',
    level: 'Senior',
    department: mockDepartments[0],
    salaryRange: { min: 80000, max: 120000 },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Software Engineer',
    description: 'Mid-level software engineer',
    level: 'Senior',
    department: mockDepartments[0],
    salaryRange: { min: 50000, max: 80000 },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
  {
    id: '3',
    name: 'Junior Developer',
    description: 'Entry level developer',
    level: 'Junior',
    department: mockDepartments[0],
    salaryRange: { min: 30000, max: 50000 },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
];

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Backend Team',
    description: 'Backend development team',
    department: mockDepartments[0],
    lead: { id: '1', firstName: 'Amit', lastName: 'Patel' } as any,
    members: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
  {
    id: '2',
    name: 'Frontend Team',
    description: 'Frontend development team',
    department: mockDepartments[0],
    lead: { id: '2', firstName: 'Priya', lastName: 'Singh' } as any,
    members: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-20'),
    isActive: true,
  },
];

// Department Form
interface DepartmentFormProps {
  department?: Department;
  onSubmit: (data: DepartmentCreateFormData) => void;
  isLoading?: boolean;
}

function DepartmentForm({ department, onSubmit, isLoading }: DepartmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepartmentCreateFormData>({
    resolver: zodResolver(departmentCreateSchema) as any,
    defaultValues: department ? {
      name: department.name,
      description: department.description,
      budget: department.budget,
    } : undefined,
  });

  const handleFormSubmit: SubmitHandler<DepartmentCreateFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Department Name *</label>
        <Input
          {...register('name')}
          placeholder="Department name"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          placeholder="Department description"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Budget</label>
        <Input
          {...register('budget')}
          type="number"
          placeholder="Annual budget"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : department ? 'Update Department' : 'Create Department'}
        </Button>
      </div>
    </form>
  );
}

// Designation Form
interface DesignationFormProps {
  designation?: Designation;
  departments: Department[];
  onSubmit: (data: DesignationCreateFormData) => void;
  isLoading?: boolean;
}

function DesignationForm({ designation, departments, onSubmit, isLoading }: DesignationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DesignationCreateFormData>({
    resolver: zodResolver(designationCreateSchema) as any,
    defaultValues: designation ? {
      name: designation.name,
      description: designation.description,
      departmentId: designation.department.id,
      level: designation.level,
      minSalary: designation.salaryRange.min,
      maxSalary: designation.salaryRange.max,
    } : undefined,
  });

  const handleFormSubmit: SubmitHandler<DesignationCreateFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Designation Name *</label>
        <Input
          {...register('name')}
          placeholder="Job title"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          placeholder="Job description"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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

        <div>
          <label className="block text-sm font-medium mb-2">Level *</label>
          <select
            {...register('level')}
            className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          >
            <option value="Entry">Entry</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="Executive">Executive</option>
          </select>
          {errors.level && <p className="text-xs text-red-500 mt-1">{errors.level.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Min Salary *</label>
          <Input
            {...register('minSalary')}
            type="number"
            placeholder="Minimum salary"
            className={errors.minSalary ? 'border-red-500' : ''}
          />
          {errors.minSalary && <p className="text-xs text-red-500 mt-1">{errors.minSalary.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Max Salary *</label>
          <Input
            {...register('maxSalary')}
            type="number"
            placeholder="Maximum salary"
            className={errors.maxSalary ? 'border-red-500' : ''}
          />
          {errors.maxSalary && <p className="text-xs text-red-500 mt-1">{errors.maxSalary.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : designation ? 'Update Designation' : 'Create Designation'}
        </Button>
      </div>
    </form>
  );
}

// Team Form
interface TeamFormProps {
  team?: Team;
  departments: Department[];
  onSubmit: (data: TeamCreateFormData) => void;
  isLoading?: boolean;
}

function TeamForm({ team, departments, onSubmit, isLoading }: TeamFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeamCreateFormData>({
    resolver: zodResolver(teamCreateSchema) as any,
    defaultValues: team ? {
      name: team.name,
      description: team.description,
      departmentId: team.department.id,
      leadId: team.lead.id,
    } : undefined,
  });

  const handleFormSubmit: SubmitHandler<TeamCreateFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Team Name *</label>
        <Input
          {...register('name')}
          placeholder="Team name"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          {...register('description')}
          placeholder="Team description"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          rows={3}
        />
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

      <div>
        <label className="block text-sm font-medium mb-2">Team Lead *</label>
        <select
          {...register('leadId')}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
        >
          <option value="">Select Team Lead</option>
          <option value="1">Amit Patel</option>
          <option value="2">Priya Singh</option>
        </select>
        {errors.leadId && <p className="text-xs text-red-500 mt-1">{errors.leadId.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : team ? 'Update Team' : 'Create Team'}
        </Button>
      </div>
    </form>
  );
}

export default function AdminOperationalPage() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [designations, setDesignations] = useState<Designation[]>(mockDesignations);
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('departments');
  const [deptOpen, setDeptOpen] = useState(false);
  const [designOpen, setDesignOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | undefined>();
  const [selectedDesign, setSelectedDesign] = useState<Designation | undefined>();
  const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();

  const handleAddDepartment = async (data: DepartmentCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newDept: Department = {
        id: String(departments.length + 1),
        name: data.name,
        description: data.description || '',
        company: departments[0]?.company || ({} as any),
        budget: data.budget,
        headCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      setDepartments([...departments, newDept]);
      setDeptOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDesignation = async (data: DesignationCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dept = departments.find((d) => d.id === data.departmentId)!;
      const newDesign: Designation = {
        id: String(designations.length + 1),
        name: data.name,
        description: data.description || '',
        level: data.level as any,
        department: dept,
        salaryRange: { min: data.minSalary, max: data.maxSalary },
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      setDesignations([...designations, newDesign]);
      setDesignOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTeam = async (data: TeamCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const dept = departments.find((d) => d.id === data.departmentId)!;
      const newTeam: Team = {
        id: String(teams.length + 1),
        name: data.name,
        description: data.description || '',
        department: dept,
        lead: { id: data.leadId, firstName: 'Lead', lastName: 'Name' } as any,
        members: data.memberIds ? data.memberIds.map(id => ({ id } as any)) : [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };
      setTeams([...teams, newTeam]);
      setTeamOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deptColumns: Column<Department>[] = [
    { key: 'name', label: 'Department Name', sortable: true, filterable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'headCount', label: 'Employees', sortable: true },
    { key: 'budget', label: 'Budget', render: (b) => `₹${(b / 100000).toFixed(1)}L` },
    {
      key: 'isActive',
      label: 'Status',
      render: (active) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {active ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const designColumns: Column<Designation>[] = [
    { key: 'name', label: 'Designation', sortable: true, filterable: true },
    { key: 'level', label: 'Level', sortable: true },
    {
      key: 'department',
      label: 'Department',
      render: (_, d) => d.department.name,
    },
    {
      key: 'salaryRange',
      label: 'Salary Range',
      render: (_, d) => `₹${(d.salaryRange.min / 100000).toFixed(1)}L - ₹${(d.salaryRange.max / 100000).toFixed(1)}L`,
    },
  ];

  const teamColumns: Column<Team>[] = [
    { key: 'name', label: 'Team Name', sortable: true, filterable: true },
    { key: 'description', label: 'Description', sortable: true },
    {
      key: 'department',
      label: 'Department',
      render: (_, t) => t.department.name,
    },
    {
      key: 'lead',
      label: 'Team Lead',
      render: (_, t) => `${t.lead.firstName} ${t.lead.lastName}`,
    },
  ];

  const deptActions: TableAction<Department>[] = [
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (dept) => {
        setSelectedDept(dept);
        setDeptOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: (dept) => setDepartments(departments.filter((d) => d.id !== dept.id)),
    },
  ];

  const designActions: TableAction<Designation>[] = [
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (des) => {
        setSelectedDesign(des);
        setDesignOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: (des) => setDesignations(designations.filter((d) => d.id !== des.id)),
    },
  ];

  const teamActions: TableAction<Team>[] = [
    {
      label: 'Edit',
      icon: <Edit2 className="size-4" />,
      onClick: (team) => {
        setSelectedTeam(team);
        setTeamOpen(true);
      },
    },
    {
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      variant: 'destructive',
      onClick: (team) => setTeams(teams.filter((t) => t.id !== team.id)),
    },
  ];

  return (
    <PortalLayout navItems={adminNav} portalName="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Organizational Setup</h1>
          <p className="text-muted-foreground">Manage departments, teams, and designations</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="departments" className="gap-2">
              <Building2 className="size-4" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="designations" className="gap-2">
              <Briefcase className="size-4" />
              Designations
            </TabsTrigger>
            <TabsTrigger value="teams" className="gap-2">
              <Users className="size-4" />
              Teams
            </TabsTrigger>
          </TabsList>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="grid gap-4 grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Total Departments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{departments.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Total Employees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">{departments.reduce((sum, d) => sum + d.headCount, 0)}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground">Total Budget</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">₹{(departments.reduce((sum, d) => sum + (d.budget || 0), 0) / 10000000).toFixed(1)}Cr</p>
                  </CardContent>
                </Card>
              </div>

              <Dialog open={deptOpen} onOpenChange={setDeptOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Add Department
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedDept ? 'Edit Department' : 'Create New Department'}</DialogTitle>
                  </DialogHeader>
                  <DepartmentForm
                    department={selectedDept}
                    onSubmit={handleAddDepartment}
                    isLoading={isLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <EnterpriseTable
              columns={deptColumns}
              data={departments}
              actions={deptActions}
              pageSize={10}
              showSearch
              showExport
            />
          </TabsContent>

          {/* Designations Tab */}
          <TabsContent value="designations" className="space-y-4">
            <div className="flex justify-between items-center">
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Total Designations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{designations.length}</p>
                </CardContent>
              </Card>

              <Dialog open={designOpen} onOpenChange={setDesignOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Add Designation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedDesign ? 'Edit Designation' : 'Create New Designation'}</DialogTitle>
                  </DialogHeader>
                  <DesignationForm
                    designation={selectedDesign}
                    departments={departments}
                    onSubmit={handleAddDesignation}
                    isLoading={isLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <EnterpriseTable
              columns={designColumns}
              data={designations}
              actions={designActions}
              pageSize={10}
              showSearch
              showExport
            />
          </TabsContent>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-4">
            <div className="flex justify-between items-center">
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">Total Teams</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{teams.length}</p>
                </CardContent>
              </Card>

              <Dialog open={teamOpen} onOpenChange={setTeamOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Add Team
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{selectedTeam ? 'Edit Team' : 'Create New Team'}</DialogTitle>
                  </DialogHeader>
                  <TeamForm
                    team={selectedTeam}
                    departments={departments}
                    onSubmit={handleAddTeam}
                    isLoading={isLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <EnterpriseTable
              columns={teamColumns}
              data={teams}
              actions={teamActions}
              pageSize={10}
              showSearch
              showExport
            />
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
