'use client';

import { useState } from 'react';
import { Plus, Edit2, Check, X, Calendar, FileText } from 'lucide-react';
import { PortalLayout } from '@/layouts/portal-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnterpriseTable, type Column, type TableAction } from '@/components/tables/enterprise-table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Attendance, Leave, Payroll, Performance } from '@/types/entities.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { SubmitHandler } from 'react-hook-form';
import { leaveCreateSchema, attendanceMarkSchema, type LeaveCreateFormData, type AttendanceMarkFormData } from '@/lib/validations/entities.schema';

const adminNav = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Clients', href: '/admin/clients' },
  { label: 'HRMS', href: '/admin/hrms' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Settings', href: '/admin/settings' },
];

// Mock data
const mockAttendance: Attendance[] = [
  {
    id: '1',
    employee: { id: '1', firstName: 'Amit', lastName: 'Patel' } as any,
    date: new Date('2024-06-20'),
    checkInTime: new Date('2024-06-20 09:00:00'),
    checkOutTime: new Date('2024-06-20 18:30:00'),
    status: 'Present',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockLeaves: Leave[] = [
  {
    id: '1',
    employee: { id: '1', firstName: 'Amit', lastName: 'Patel' } as any,
    leaveType: 'Casual',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-03'),
    noOfDays: 3,
    reason: 'Personal work',
    status: 'Applied',
    attachments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPayroll: Payroll[] = [
  {
    id: '1',
    employee: { id: '1', firstName: 'Amit', lastName: 'Patel' } as any,
    payPeriod: '2024-06',
    salaryStructure: { grossSalary: 140000 } as any,
    grossSalary: 140000,
    deductions: { tax: 15000, pf: 5000 },
    netSalary: 120000,
    status: 'Processed',
    paidDate: new Date('2024-06-30'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface LeaveFormProps {
  onSubmit: (data: LeaveCreateFormData) => void;
  isLoading?: boolean;
}

function LeaveForm({ onSubmit, isLoading }: LeaveFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeaveCreateFormData>({
    resolver: zodResolver(leaveCreateSchema) as any,
  });

  const handleFormSubmit: SubmitHandler<LeaveCreateFormData> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Employee *</label>
        <select
          {...register('employeeId')}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
        >
          <option value="">Select Employee</option>
          <option value="1">Amit Patel</option>
          <option value="2">Priya Singh</option>
        </select>
        {errors.employeeId && <p className="text-xs text-red-500 mt-1">{errors.employeeId.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Leave Type *</label>
        <select
          {...register('leaveType')}
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
        >
          <option value="Casual">Casual</option>
          <option value="Sick">Sick</option>
          <option value="Earned">Earned</option>
          <option value="Maternity">Maternity</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        {errors.leaveType && <p className="text-xs text-red-500 mt-1">{errors.leaveType.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Start Date *</label>
          <Input
            {...register('startDate')}
            type="date"
            className={errors.startDate ? 'border-red-500' : ''}
          />
          {errors.startDate && <p className="text-xs text-red-500 mt-1">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">End Date *</label>
          <Input
            {...register('endDate')}
            type="date"
            className={errors.endDate ? 'border-red-500' : ''}
          />
          {errors.endDate && <p className="text-xs text-red-500 mt-1">{errors.endDate.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Reason *</label>
        <textarea
          {...register('reason')}
          placeholder="Leave reason"
          className="w-full px-4 py-2 rounded-lg border border-input bg-background"
          rows={3}
        />
        {errors.reason && <p className="text-xs text-red-500 mt-1">{errors.reason.message}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button">Cancel</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Apply Leave'}
        </Button>
      </div>
    </form>
  );
}

export default function HRMSPage() {
  const [attendance, setAttendance] = useState<Attendance[]>(mockAttendance);
  const [leaves, setLeaves] = useState<Leave[]>(mockLeaves);
  const [payroll] = useState<Payroll[]>(mockPayroll);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('attendance');
  const [leaveOpen, setLeaveOpen] = useState(false);

  const handleApplyLeave = async (data: LeaveCreateFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newLeave: Leave = {
        id: String(leaves.length + 1),
        employee: { id: data.employeeId, firstName: 'Employee', lastName: 'Name' } as any,
        leaveType: data.leaveType,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        noOfDays: Math.floor((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
        reason: data.reason,
        status: 'Applied',
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setLeaves([...leaves, newLeave]);
      setLeaveOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const attendanceColumns: Column<Attendance>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (_, a) => `${a.employee.firstName} ${a.employee.lastName}`,
    },
    { key: 'date', label: 'Date', render: (d) => new Date(d).toLocaleDateString() },
    { key: 'checkInTime', label: 'Check-In', render: (t) => t ? new Date(t).toLocaleTimeString() : '-' },
    { key: 'checkOutTime', label: 'Check-Out', render: (t) => t ? new Date(t).toLocaleTimeString() : '-' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Present' ? 'bg-green-100 text-green-700' :
          status === 'Absent' ? 'bg-red-100 text-red-700' :
          'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      ),
    },
  ];

  const leaveColumns: Column<Leave>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (_, l) => `${l.employee.firstName} ${l.employee.lastName}`,
    },
    { key: 'leaveType', label: 'Type', sortable: true },
    { key: 'startDate', label: 'From', render: (d) => new Date(d).toLocaleDateString() },
    { key: 'endDate', label: 'To', render: (d) => new Date(d).toLocaleDateString() },
    { key: 'noOfDays', label: 'Days' },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Approved' ? 'bg-green-100 text-green-700' :
          status === 'Rejected' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {status}
        </span>
      ),
    },
  ];

  const payrollColumns: Column<Payroll>[] = [
    {
      key: 'employee',
      label: 'Employee',
      render: (_, p) => `${p.employee.firstName} ${p.employee.lastName}`,
    },
    { key: 'payPeriod', label: 'Period', sortable: true },
    { key: 'grossSalary', label: 'Gross', render: (g) => `₹${(g / 100000).toFixed(1)}L` },
    { key: 'netSalary', label: 'Net', render: (n) => `₹${(n / 100000).toFixed(1)}L` },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
        }`}>
          {status}
        </span>
      ),
    },
  ];

  const leaveActions: TableAction<Leave>[] = [
    {
      label: 'Approve',
      icon: <Check className="size-4" />,
      onClick: (leave) => {
        setLeaves(leaves.map((l) => l.id === leave.id ? { ...l, status: 'Approved' } : l));
      },
    },
    {
      label: 'Reject',
      icon: <X className="size-4" />,
      variant: 'destructive',
      onClick: (leave) => {
        setLeaves(leaves.map((l) => l.id === leave.id ? { ...l, status: 'Rejected' } : l));
      },
    },
  ];

  return (
    <PortalLayout navItems={adminNav} portalName="Admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">HRMS Management</h1>
          <p className="text-muted-foreground">Manage attendance, leaves, payroll, and performance</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Present Today', value: attendance.filter((a) => a.status === 'Present').length },
            { label: 'Absent Today', value: attendance.filter((a) => a.status === 'Absent').length },
            { label: 'Pending Leaves', value: leaves.filter((l) => l.status === 'Applied').length },
            { label: 'Processed Payroll', value: payroll.filter((p) => p.status === 'Processed').length },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="attendance" className="gap-2">
              <Calendar className="size-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="leaves" className="gap-2">
              <FileText className="size-4" />
              Leaves
            </TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4">
            <EnterpriseTable
              columns={attendanceColumns}
              data={attendance}
              pageSize={10}
              showSearch
              showExport
            />
          </TabsContent>

          <TabsContent value="leaves" className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="size-4" />
                    Apply Leave
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Apply For Leave</DialogTitle>
                  </DialogHeader>
                  <LeaveForm onSubmit={handleApplyLeave} isLoading={isLoading} />
                </DialogContent>
              </Dialog>
            </div>

            <EnterpriseTable
              columns={leaveColumns}
              data={leaves}
              actions={leaveActions}
              pageSize={10}
              showSearch
              showExport
            />
          </TabsContent>

          <TabsContent value="payroll" className="space-y-4">
            <EnterpriseTable
              columns={payrollColumns}
              data={payroll}
              pageSize={10}
              showSearch
              showExport
            />
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No performance reviews yet. Create a new review to get started.</p>
                  <Button className="mt-4" variant="outline">Create Review</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PortalLayout>
  );
}
