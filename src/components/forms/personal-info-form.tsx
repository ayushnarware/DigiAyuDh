import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { PersonalInfoFormData } from '@/lib/validations/profile.schema';
import type { UserProfile } from '@/types/profile.types';
import { personalInfoSchema } from '@/lib/validations/profile.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfoFormProps {
  profile: UserProfile | null;
  isLoading?: boolean;
  onSubmit: (data: PersonalInfoFormData) => Promise<void>;
}

export function PersonalInfoForm({ profile, isLoading, onSubmit }: PersonalInfoFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: profile
      ? {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          phone: profile.phone,
          bio: profile.bio,
        }
      : undefined,
  });

  const handleSave = async (data: PersonalInfoFormData) => {
    setIsSaving(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your basic personal details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                First Name
              </label>
              <Input
                id="firstName"
                disabled={isLoading || isSaving}
                {...register('firstName')}
                className={errors.firstName ? 'border-red-500' : ''}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <Input
                id="lastName"
                disabled={isLoading || isSaving}
                {...register('lastName')}
                className={errors.lastName ? 'border-red-500' : ''}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              disabled={isLoading || isSaving}
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2">
              Phone Number (Optional)
            </label>
            <Input id="phone" type="tel" disabled={isLoading || isSaving} {...register('phone')} />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Gender (Optional)
            </label>
            <Select
              onValueChange={(value) =>
                setValue('gender', value as PersonalInfoFormData['gender'])
              }
            >
              <SelectTrigger disabled={isLoading || isSaving}>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio (Optional)
            </label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself..."
              disabled={isLoading || isSaving}
              {...register('bio')}
              rows={4}
            />
            {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button variant="outline" disabled={isLoading || isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
