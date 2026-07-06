import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const createClientSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  gst: z.string().regex(/^[0-9A-Z]{15}$/, 'Invalid GST number format'),
  pan: z.string().optional(),
  businessType: z.string().min(2, 'Business type is required'),
  website: z.string().url('Invalid URL').optional(),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().regex(/^\d{5,}$/, 'Valid zip code is required'),
  notes: z.string().optional(),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  designation: z.string().optional(),
});

type CreateClientFormData = z.infer<typeof createClientSchema>;

interface CreateClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateClientForm({ isOpen, onClose, onSuccess }: CreateClientFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<CreateClientFormData>({
    resolver: zodResolver(createClientSchema),
  });

  const onSubmit = async (data: CreateClientFormData) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // API call to create client
      // Replace with actual API endpoint
      console.log('Creating client:', data);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccessMessage('Client created successfully!');
      setTimeout(() => {
        reset();
        onClose();
        onSuccess?.();
      }, 2000);
    } catch (error: any) {
      setErrorMessage(error.message || 'Failed to create client. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to close?'
      );
      if (!confirmed) return;
    }
    reset();
    setErrorMessage('');
    setSuccessMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="sticky top-0 bg-background border-b">
          <CardTitle>Create New Client</CardTitle>
          <CardDescription>Add a new client to the system</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {successMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle2 className="size-5" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-700">
              <AlertCircle className="size-5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Company Information</h3>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                  Company Name *
                </label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  disabled={isSubmitting}
                  {...register('companyName')}
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="gst" className="block text-sm font-medium mb-2">
                    GST Number *
                  </label>
                  <Input
                    id="gst"
                    placeholder="27AABCT0045Q1Z5"
                    disabled={isSubmitting}
                    {...register('gst')}
                    className={errors.gst ? 'border-red-500' : ''}
                  />
                  {errors.gst && (
                    <p className="mt-1 text-sm text-red-500">{errors.gst.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="pan" className="block text-sm font-medium mb-2">
                    PAN Number (Optional)
                  </label>
                  <Input
                    id="pan"
                    placeholder="AAAPA1234A"
                    disabled={isSubmitting}
                    {...register('pan')}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessType" className="block text-sm font-medium mb-2">
                  Business Type *
                </label>
                <Input
                  id="businessType"
                  placeholder="e.g., IT Consulting, Manufacturing"
                  disabled={isSubmitting}
                  {...register('businessType')}
                  className={errors.businessType ? 'border-red-500' : ''}
                />
                {errors.businessType && (
                  <p className="mt-1 text-sm text-red-500">{errors.businessType.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2">
                  Website (Optional)
                </label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://example.com"
                  disabled={isSubmitting}
                  {...register('website')}
                />
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Contact Information</h3>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium mb-2">
                  Contact Person *
                </label>
                <Input
                  id="contactPerson"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                  {...register('contactPerson')}
                  className={errors.contactPerson ? 'border-red-500' : ''}
                />
                {errors.contactPerson && (
                  <p className="mt-1 text-sm text-red-500">{errors.contactPerson.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="designation" className="block text-sm font-medium mb-2">
                  Designation (Optional)
                </label>
                <Input
                  id="designation"
                  placeholder="CEO / Business Manager"
                  disabled={isSubmitting}
                  {...register('designation')}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    disabled={isSubmitting}
                    {...register('email')}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                    {...register('phone')}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <h3 className="text-sm font-semibold">Address</h3>

              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Street Address *
                </label>
                <Input
                  id="address"
                  placeholder="123 Business Street"
                  disabled={isSubmitting}
                  {...register('address')}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    City *
                  </label>
                  <Input
                    id="city"
                    placeholder="Delhi"
                    disabled={isSubmitting}
                    {...register('city')}
                    className={errors.city ? 'border-red-500' : ''}
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-2">
                    State *
                  </label>
                  <Input
                    id="state"
                    placeholder="Delhi"
                    disabled={isSubmitting}
                    {...register('state')}
                    className={errors.state ? 'border-red-500' : ''}
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                    ZIP Code *
                  </label>
                  <Input
                    id="zipCode"
                    placeholder="110001"
                    disabled={isSubmitting}
                    {...register('zipCode')}
                    className={errors.zipCode ? 'border-red-500' : ''}
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t pt-6">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional information about this client..."
                  disabled={isSubmitting}
                  {...register('notes')}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={!isDirty || isSubmitting}
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {isSubmitting ? 'Creating...' : 'Create Client'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
