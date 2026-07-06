import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { UpdatePasswordFormData } from '@/lib/validations/profile.schema';
import { updatePasswordSchema } from '@/lib/validations/profile.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface SecuritySettingsFormProps {
  onChangePassword: (data: UpdatePasswordFormData) => Promise<void>;
  onEnable2FA?: (method: 'sms' | 'email' | 'authenticator') => Promise<void>;
  twoFactorEnabled?: boolean;
}

export function SecuritySettingsForm({
  onChangePassword,
  onEnable2FA,
  twoFactorEnabled = false,
}: SecuritySettingsFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const newPassword = watch('newPassword');

  const handleSavePassword = async (data: UpdatePasswordFormData) => {
    setIsSaving(true);
    try {
      await onChangePassword(data);
      setSuccessMessage('Password changed successfully');
      reset();
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          {successMessage && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700">
              <CheckCircle2 className="size-5" />
              <p className="text-sm">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(handleSavePassword)} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPasswords ? 'text' : 'password'}
                  disabled={isSaving}
                  {...register('currentPassword')}
                  className={errors.currentPassword ? 'border-red-500 pr-10' : 'pr-10'}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPasswords ? (
                    <EyeOff className="size-4 text-muted-foreground" />
                  ) : (
                    <Eye className="size-4 text-muted-foreground" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.currentPassword.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                New Password
              </label>
              <Input
                id="newPassword"
                type={showPasswords ? 'text' : 'password'}
                disabled={isSaving}
                {...register('newPassword')}
                className={errors.newPassword ? 'border-red-500' : ''}
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.newPassword.message}</p>
              )}
              {newPassword && newPassword.length >= 8 && (
                <p className="mt-2 text-sm text-green-600">Password strength: Strong</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type={showPasswords ? 'text' : 'password'}
                disabled={isSaving}
                {...register('confirmPassword')}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>Secure your account with an additional verification step</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <span className="text-sm font-semibold">2FA</span>
                </div>
                <div>
                  <p className="font-medium">
                    {twoFactorEnabled ? 'Two-Factor Authentication Enabled' : 'Enable Two-Factor Auth'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {twoFactorEnabled ? 'Your account is protected' : 'Add an extra layer of security'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {twoFactorEnabled && (
                  <CheckCircle2 className="size-5 text-green-600" />
                )}
                <Button
                  onClick={() => onEnable2FA?.('authenticator')}
                  disabled={isSaving || !onEnable2FA}
                >
                  {twoFactorEnabled ? 'Manage' : 'Enable'}
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 text-blue-700">
              <div className="flex gap-3">
                <AlertCircle className="size-5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Recommendation</p>
                  <p>
                    We strongly recommend enabling two-factor authentication to keep your account
                    secure. Use an authenticator app for better security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>Manage your active login sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { device: 'Chrome on Windows', location: 'New Delhi, India', lastActive: 'Just now' },
              { device: 'Safari on iPhone', location: 'New Delhi, India', lastActive: '2 hours ago' },
              { device: 'Firefox on Ubuntu', location: 'Bangalore, India', lastActive: '1 day ago' },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="text-sm font-medium">{session.device}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.location} · Last active {session.lastActive}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                  Sign out
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
