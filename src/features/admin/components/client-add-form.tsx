'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

type ClientFormStep = 'basic' | 'contact' | 'billing' | 'documents' | 'review';

interface ClientFormData {
  // Basic Information
  companyName: string;
  industry: string;
  website: string;
  companySize: string;
  foundedYear: string;
  
  // Contact Information
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  primaryContactDesignation: string;
  secondaryContactName: string;
  secondaryContactEmail: string;
  
  // Billing Information
  billingName: string;
  billingEmail: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  gstin: string;
  panNumber: string;
  
  // Services
  servicesToAdd: string[];
  
  // Account Status
  accountStatus: string;
}

const initialFormData: ClientFormData = {
  companyName: '',
  industry: '',
  website: '',
  companySize: '',
  foundedYear: '',
  primaryContactName: '',
  primaryContactEmail: '',
  primaryContactPhone: '',
  primaryContactDesignation: '',
  secondaryContactName: '',
  secondaryContactEmail: '',
  billingName: '',
  billingEmail: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZipCode: '',
  gstin: '',
  panNumber: '',
  servicesToAdd: [],
  accountStatus: 'ACTIVE',
};

const services = [
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile App Development' },
  { id: 'design', label: 'UI/UX Design' },
  { id: 'consulting', label: 'Consulting' },
  { id: 'support', label: 'Support & Maintenance' },
];

export function ClientAddForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<ClientFormStep>('basic');
  const [formData, setFormData] = useState<ClientFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ClientFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      servicesToAdd: prev.servicesToAdd.includes(serviceId)
        ? prev.servicesToAdd.filter(s => s !== serviceId)
        : [...prev.servicesToAdd, serviceId]
    }));
  };

  const handleStepChange = (newStep: ClientFormStep) => {
    setStep(newStep);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      console.log('Client Data:', formData);
      onClose();
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps: { id: ClientFormStep; label: string }[] = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'contact', label: 'Contact Details' },
    { id: 'billing', label: 'Billing Info' },
    { id: 'documents', label: 'Services' },
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
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Acme Corporation"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Industry *</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Industry</option>
                    <option value="IT">IT & Software</option>
                    <option value="ECOMMERCE">E-Commerce</option>
                    <option value="HEALTHCARE">Healthcare</option>
                    <option value="FINANCE">Finance</option>
                    <option value="RETAIL">Retail</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => handleInputChange('companySize', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  >
                    <option value="">Select Size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Founded Year</label>
                  <input
                    type="number"
                    value={formData.foundedYear}
                    onChange={(e) => handleInputChange('foundedYear', e.target.value)}
                    placeholder="2020"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'contact' && (
            <div className="space-y-4">
              <div className="space-y-3 p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-sm">Primary Contact</h4>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    value={formData.primaryContactName}
                    onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.primaryContactEmail}
                      onChange={(e) => handleInputChange('primaryContactEmail', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.primaryContactPhone}
                      onChange={(e) => handleInputChange('primaryContactPhone', e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Designation</label>
                  <input
                    type="text"
                    value={formData.primaryContactDesignation}
                    onChange={(e) => handleInputChange('primaryContactDesignation', e.target.value)}
                    placeholder="CEO / Founder"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div className="space-y-3 p-4 bg-muted rounded-lg border border-border">
                <h4 className="font-semibold text-sm">Secondary Contact</h4>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.secondaryContactName}
                    onChange={(e) => handleInputChange('secondaryContactName', e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.secondaryContactEmail}
                      onChange={(e) => handleInputChange('secondaryContactEmail', e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 'billing' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Billing Name *</label>
                  <input
                    type="text"
                    value={formData.billingName}
                    onChange={(e) => handleInputChange('billingName', e.target.value)}
                    placeholder="Acme Corporation"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Billing Email *</label>
                  <input
                    type="email"
                    value={formData.billingEmail}
                    onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                    placeholder="billing@example.com"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  type="text"
                  value={formData.billingAddress}
                  onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                  placeholder="123 Main Street"
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={formData.billingCity}
                    onChange={(e) => handleInputChange('billingCity', e.target.value)}
                    placeholder="New York"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <input
                    type="text"
                    value={formData.billingState}
                    onChange={(e) => handleInputChange('billingState', e.target.value)}
                    placeholder="NY"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Zip Code</label>
                  <input
                    type="text"
                    value={formData.billingZipCode}
                    onChange={(e) => handleInputChange('billingZipCode', e.target.value)}
                    placeholder="10001"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">GSTIN</label>
                  <input
                    type="text"
                    value={formData.gstin}
                    onChange={(e) => handleInputChange('gstin', e.target.value)}
                    placeholder="18AABCT1234H1Z0"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">PAN Number</label>
                  <input
                    type="text"
                    value={formData.panNumber}
                    onChange={(e) => handleInputChange('panNumber', e.target.value)}
                    placeholder="ABCDE1234F"
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 'documents' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">Services *</label>
                <div className="space-y-2">
                  {services.map(service => (
                    <label key={service.id} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.servicesToAdd.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium text-sm">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Account Status</label>
                <select
                  value={formData.accountStatus}
                  onChange={(e) => handleInputChange('accountStatus', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Company Information</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> {formData.companyName}</div>
                  <div><span className="text-muted-foreground">Industry:</span> {formData.industry}</div>
                  <div><span className="text-muted-foreground">Size:</span> {formData.companySize}</div>
                  <div><span className="text-muted-foreground">Website:</span> {formData.website}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Primary Contact</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Name:</span> {formData.primaryContactName}</div>
                  <div><span className="text-muted-foreground">Email:</span> {formData.primaryContactEmail}</div>
                  <div><span className="text-muted-foreground">Phone:</span> {formData.primaryContactPhone}</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.servicesToAdd.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return (
                      <span key={serviceId} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                        {service?.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-sm text-purple-900 dark:text-purple-200">
                  Review all information above. Click <strong>Add Client</strong> to proceed.
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
            {isLoading ? 'Adding...' : 'Add Client'}
          </Button>
        )}
      </div>
    </div>
  );
}
