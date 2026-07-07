'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type EmployeeFormStep = 'personal' | 'company' | 'salary' | 'banking' | 'emergency' | 'review';

interface EmployeeFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  
  // Contact Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Company Information
  employeeId: string;
  department: string;
  designation: string;
  reportingManager: string;
  dateOfJoining: string;
  employmentStatus: string;
  
  // Salary Structure
  baseSalary: string;
  hra: string;
  da: string;
  otherAllowances: string;
  
  // Bank Details
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
}

const initialFormData: EmployeeFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  gender: '',
  nationality: 'Indian',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  employeeId: '',
  department: '',
  designation: '',
  reportingManager: '',
  dateOfJoining: '',
  employmentStatus: 'ACTIVE',
  baseSalary: '',
  hra: '',
  da: '',
  otherAllowances: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  accountHolderName: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
  emergencyContactRelation: '',
};

export function EmployeeAddForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<EmployeeFormStep>('personal');
  const [formData, setFormData] = useState<EmployeeFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (newStep: EmployeeFormStep) => {
    setStep(newStep);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // API call would go here
      console.log('Employee Data:', formData);
      // await createEmployee(formData);
      onClose();
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps: { id: EmployeeFormStep; label: string }[] = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'company', label: 'Company Info' },
    { id: 'salary', label: 'Salary Structure' },
    { id: 'banking', label: 'Bank Details' },
    { id: 'emergency', label: 'Emergency Contact' },
    { id: 'review', label: 'Review' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => handleStepChange(s.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  step === s.id
                    ? 'bg-purple-600 text-white'
                    : index < currentStepIndex
                    ? 'bg-green-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index < currentStepIndex ? '✓' : index + 1}
              </button>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 ${index < currentStepIndex ? 'bg-green-500' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-sm font-medium text-center text-muted-foreground">
          Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex].label}
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStepIndex].label}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Indian"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="123 Main Street"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="New York"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="NY"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="10001"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'company' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Employee ID *</label>
                  <input
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                    placeholder="EMP001"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department *</label>
                  <select
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="FINANCE">Finance</option>
                    <option value="OPERATIONS">Operations</option>
                    <option value="SALES">Sales</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Designation *</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => handleInputChange('designation', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Designation</option>
                    <option value="MANAGER">Manager</option>
                    <option value="SENIOR_ENGINEER">Senior Engineer</option>
                    <option value="ENGINEER">Engineer</option>
                    <option value="JUNIOR_ENGINEER">Junior Engineer</option>
                    <option value="INTERN">Intern</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reporting Manager</label>
                  <select
                    value={formData.reportingManager}
                    onChange={(e) => handleInputChange('reportingManager', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Manager</option>
                    <option value="mgr001">John Smith</option>
                    <option value="mgr002">Jane Doe</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Joining *</label>
                  <input
                    type="date"
                    value={formData.dateOfJoining}
                    onChange={(e) => handleInputChange('dateOfJoining', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Employment Status</label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="ON_LEAVE">On Leave</option>
                    <option value="TERMINATED">Terminated</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 'salary' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Base Salary (Annual) *</label>
                <input
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) => handleInputChange('baseSalary', e.target.value)}
                  placeholder="600000"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">HRA (%)</label>
                  <input
                    type="number"
                    value={formData.hra}
                    onChange={(e) => handleInputChange('hra', e.target.value)}
                    placeholder="10"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">DA (%)</label>
                  <input
                    type="number"
                    value={formData.da}
                    onChange={(e) => handleInputChange('da', e.target.value)}
                    placeholder="5"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Other Allowances</label>
                  <input
                    type="number"
                    value={formData.otherAllowances}
                    onChange={(e) => handleInputChange('otherAllowances', e.target.value)}
                    placeholder="10000"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Estimated Monthly Salary: ₹
                  {(
                    (parseInt(formData.baseSalary) || 0) / 12 +
                    (((parseInt(formData.baseSalary) || 0) / 12) * (parseInt(formData.hra) || 0)) / 100 +
                    (((parseInt(formData.baseSalary) || 0) / 12) * (parseInt(formData.da) || 0)) / 100 +
                    (parseInt(formData.otherAllowances) || 0) / 12
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          )}

          {step === 'banking' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Bank Name *</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  placeholder="HDFC Bank"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Account Number *</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="1234567890"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">IFSC Code *</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  placeholder="HDFC0000001"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Account Holder Name *</label>
                <input
                  type="text"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange('accountHolderName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </div>
          )}

          {step === 'emergency' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Contact Name *</label>
                <input
                  type="text"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  placeholder="Emergency Contact Name"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Relation *</label>
                <select
                  value={formData.emergencyContactRelation}
                  onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="">Select Relation</option>
                  <option value="SPOUSE">Spouse</option>
                  <option value="PARENT">Parent</option>
                  <option value="SIBLING">Sibling</option>
                  <option value="CHILD">Child</option>
                  <option value="FRIEND">Friend</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}</div>
                  <div><span className="text-muted-foreground">Email:</span> {formData.email}</div>
                  <div><span className="text-muted-foreground">Phone:</span> {formData.phone}</div>
                  <div><span className="text-muted-foreground">DOB:</span> {formData.dateOfBirth}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Company Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Employee ID:</span> {formData.employeeId}</div>
                  <div><span className="text-muted-foreground">Department:</span> {formData.department}</div>
                  <div><span className="text-muted-foreground">Designation:</span> {formData.designation}</div>
                  <div><span className="text-muted-foreground">Joining Date:</span> {formData.dateOfJoining}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Salary Structure</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Base Salary:</span> ₹{formData.baseSalary}</div>
                  <div><span className="text-muted-foreground">HRA:</span> {formData.hra}%</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-900 dark:text-purple-200">
                  Review all information above. Click <strong>Create Employee</strong> to proceed with the onboarding.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          onClick={() => {
            const prevStepIndex = Math.max(0, currentStepIndex - 1);
            setStep(steps[prevStepIndex].id);
          }}
          variant="outline"
          disabled={step === 'personal'}
        >
          Back
        </Button>

        {step !== 'review' ? (
          <Button
            onClick={() => {
              const nextStepIndex = Math.min(steps.length - 1, currentStepIndex + 1);
              setStep(steps[nextStepIndex].id);
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? 'Creating...' : 'Create Employee'}
          </Button>
        )}
      </div>
    </div>
  );
}
