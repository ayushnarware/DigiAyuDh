'use client';

import { useState, type ReactNode } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface DialogProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  onClose: () => void;
  onSubmit?: () => Promise<void>;
  isLoading?: boolean;
  isDangerous?: boolean;
  submitButtonText?: string;
}

export function Dialog({
  isOpen,
  title,
  description,
  children,
  onClose,
  onSubmit,
  isLoading = false,
  isDangerous = false,
  submitButtonText = 'Save',
}: DialogProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
              </div>
              <Button variant="ghost" size="icon" icon={<X className="size-4" />} onClick={onClose} />
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {children}

            <div className="flex gap-2 justify-end pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {onSubmit && (
                <Button
                  variant={isDangerous ? 'danger' : 'primary'}
                  onClick={onSubmit}
                  isLoading={isLoading}
                >
                  {submitButtonText}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

interface CreateDialogProps<T> {
  isOpen: boolean;
  title: string;
  fields: Array<{
    name: keyof T;
    label: string;
    type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'select';
    required?: boolean;
    placeholder?: string;
    options?: Array<{ label: string; value: string }>;
  }>;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void>;
  defaultValues?: Partial<T>;
}

export function CreateDialog<T extends Record<string, any>>({
  isOpen,
  title,
  fields,
  onClose,
  onSubmit,
  defaultValues = {},
}: CreateDialogProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(formData as T);
      setFormData(defaultValues);
      onClose();
    } catch (error: any) {
      console.error('[v0] Create error:', error);
      setErrors({ submit: error.message || 'Failed to create' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Create"
    >
      <div className="space-y-4">
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        {fields.map(field => (
          <div key={String(field.name)}>
            <label className="block text-sm font-medium mb-2">{field.label}</label>
            {field.type === 'select' ? (
              <select
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                required={field.required}
              >
                <option value="">Select {field.label}</option>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <Input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                required={field.required}
                error={errors[String(field.name)]}
              />
            )}
          </div>
        ))}
      </div>
    </Dialog>
  );
}

interface EditDialogProps<T> extends Omit<CreateDialogProps<T>, 'title'> {
  title?: string;
}

export function EditDialog<T extends Record<string, any>>({
  isOpen,
  title = 'Edit Item',
  fields,
  onClose,
  onSubmit,
  defaultValues = {},
}: EditDialogProps<T>) {
  const [formData, setFormData] = useState<Partial<T>>(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit(formData as T);
      onClose();
    } catch (error: any) {
      console.error('[v0] Edit error:', error);
      setErrors({ submit: error.message || 'Failed to update' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      submitButtonText="Save Changes"
    >
      <div className="space-y-4">
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            {errors.submit}
          </div>
        )}

        {fields.map(field => (
          <div key={String(field.name)}>
            <label className="block text-sm font-medium mb-2">{field.label}</label>
            {field.type === 'select' ? (
              <select
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <Input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={(formData[field.name] as string) || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                error={errors[String(field.name)]}
              />
            )}
          </div>
        ))}
      </div>
    </Dialog>
  );
}

interface DeleteDialogProps {
  isOpen: boolean;
  itemName: string;
  itemType?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteConfirmDialog({
  isOpen,
  itemName,
  itemType = 'item',
  onClose,
  onConfirm,
}: DeleteDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('[v0] Delete error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Delete Confirmation"
      description={`Are you sure you want to delete this ${itemType}?`}
      onClose={onClose}
      isDangerous
      submitButtonText="Delete"
      onSubmit={handleConfirm}
      isLoading={isLoading}
    >
      <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-900">This action cannot be undone</p>
            <p className="text-sm text-red-700 mt-1">
              Deleting <span className="font-semibold">{itemName}</span> will permanently remove it from the system.
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
