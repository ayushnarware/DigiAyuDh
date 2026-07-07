'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type ProjectFormStep = 'basic' | 'team' | 'details' | 'schedule' | 'review';

interface ProjectFormData {
  // Basic Information
  projectName: string;
  projectCode: string;
  description: string;
  category: string;
  
  // Team Assignment
  projectManager: string;
  teamMembers: string[];
  client: string;
  
  // Project Details
  budget: string;
  currency: string;
  status: string;
  priority: string;
  
  // Schedule
  startDate: string;
  endDate: string;
  estimatedHours: string;
}

const initialFormData: ProjectFormData = {
  projectName: '',
  projectCode: '',
  description: '',
  category: '',
  projectManager: '',
  teamMembers: [],
  client: '',
  budget: '',
  currency: 'INR',
  status: 'PLANNING',
  priority: 'MEDIUM',
  startDate: '',
  endDate: '',
  estimatedHours: '',
};

const categories = [
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile App' },
  { id: 'design', label: 'Design' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'maintenance', label: 'Maintenance' },
];

const teamMembersList = [
  { id: 'emp1', name: 'John Doe' },
  { id: 'emp2', name: 'Jane Smith' },
  { id: 'emp3', name: 'Mike Johnson' },
  { id: 'emp4', name: 'Sarah Williams' },
];

export function ProjectAddForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<ProjectFormStep>('basic');
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProjectFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleTeamMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.includes(memberId)
        ? prev.teamMembers.filter(m => m !== memberId)
        : [...prev.teamMembers, memberId]
    }));
  };

  const handleStepChange = (newStep: ProjectFormStep) => {
    setStep(newStep);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Project Data:', formData);
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps: { id: ProjectFormStep; label: string }[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'team', label: 'Team Setup' },
    { id: 'details', label: 'Details' },
    { id: 'schedule', label: 'Schedule' },
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
          {step === 'basic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name *</label>
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  placeholder="E-Commerce Platform Redesign"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Project Code *</label>
                  <input
                    type="text"
                    value={formData.projectCode}
                    onChange={(e) => handleInputChange('projectCode', e.target.value)}
                    placeholder="PROJ-001"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Project description and objectives..."
                  rows={4}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </div>
          )}

          {step === 'team' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Manager *</label>
                <select
                  value={formData.projectManager}
                  onChange={(e) => handleInputChange('projectManager', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="">Select Project Manager</option>
                  {teamMembersList.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Client *</label>
                <select
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="">Select Client</option>
                  <option value="client1">Acme Corporation</option>
                  <option value="client2">TechCorp Inc</option>
                  <option value="client3">Innovation Labs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Team Members</label>
                <div className="space-y-2">
                  {teamMembersList.map(member => (
                    <label key={member.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.teamMembers.includes(member.id)}
                        onChange={() => toggleTeamMember(member.id)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium text-sm">{member.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="500000"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Currency</label>
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="PLANNING">Planning</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PAUSED">Paused</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 'schedule' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date *</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Estimated Hours</label>
                <input
                  type="number"
                  value={formData.estimatedHours}
                  onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                  placeholder="500"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Project Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> {formData.projectName}</div>
                  <div><span className="text-muted-foreground">Code:</span> {formData.projectCode}</div>
                  <div><span className="text-muted-foreground">Category:</span> {formData.category}</div>
                  <div><span className="text-muted-foreground">Status:</span> {formData.status}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Team & Client</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Manager:</span> {formData.projectManager}</div>
                  <div><span className="text-muted-foreground">Client:</span> {formData.client}</div>
                  <div><span className="text-muted-foreground">Team Members:</span> {formData.teamMembers.length} selected</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Budget & Schedule</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Budget:</span> {formData.currency} {formData.budget}</div>
                  <div><span className="text-muted-foreground">Duration:</span> {formData.startDate} to {formData.endDate}</div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-900 dark:text-purple-200">
                  Review all information above. Click <strong>Create Project</strong> to proceed.
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
          disabled={step === 'basic'}
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
            {isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        )}
      </div>
    </div>
  );
}
