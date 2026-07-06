import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NotificationPreferencesFormData } from '@/lib/validations/profile.schema';
import { notificationPreferencesSchema } from '@/lib/validations/profile.schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Mail, MessageSquare, AlertCircle } from 'lucide-react';

interface NotificationPreferencesFormProps {
  preferences: Partial<NotificationPreferencesFormData> | null;
  onSubmit: (data: NotificationPreferencesFormData) => Promise<void>;
  isLoading?: boolean;
}

export function NotificationPreferencesForm({
  preferences,
  onSubmit,
  isLoading,
}: NotificationPreferencesFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { control, handleSubmit, watch } = useForm<NotificationPreferencesFormData>({
    resolver: zodResolver(notificationPreferencesSchema),
    defaultValues: preferences || {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      projectUpdates: true,
      teamMentions: true,
      assignedTasks: true,
      systemAlerts: true,
      marketingEmails: false,
      weeklyDigest: true,
    },
  });

  const emailNotifications = watch('emailNotifications');

  const handleSave = async (data: NotificationPreferencesFormData) => {
    setIsSaving(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            <div className="space-y-4">
              {[
                {
                  field: 'emailNotifications',
                  label: 'Email Notifications',
                  description: 'Receive updates via email',
                  icon: Mail,
                },
                {
                  field: 'pushNotifications',
                  label: 'Push Notifications',
                  description: 'Receive browser notifications',
                  icon: Bell,
                },
                {
                  field: 'smsNotifications',
                  label: 'SMS Notifications',
                  description: 'Receive important alerts via SMS',
                  icon: MessageSquare,
                },
              ].map(({ field, label, description, icon: Icon }) => (
                <label
                  key={field}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{label}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  <Controller
                    name={field as keyof NotificationPreferencesFormData}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <input
                        type="checkbox"
                        checked={value as boolean}
                        onChange={(e) => onChange(e.target.checked)}
                        disabled={isLoading || isSaving}
                        className="h-5 w-5 rounded border-gray-300 text-purple-600 cursor-pointer"
                      />
                    )}
                  />
                </label>
              ))}
            </div>

            <div className="border-t pt-6">
              <h3 className="text-sm font-semibold mb-4">Notification Types</h3>
              <div className="space-y-3">
                {[
                  {
                    field: 'projectUpdates',
                    label: 'Project Updates',
                    description: 'Updates about projects you are involved with',
                  },
                  {
                    field: 'teamMentions',
                    label: 'Team Mentions',
                    description: 'When team members mention you',
                  },
                  {
                    field: 'assignedTasks',
                    label: 'Assigned Tasks',
                    description: 'When new tasks are assigned to you',
                  },
                  {
                    field: 'systemAlerts',
                    label: 'System Alerts',
                    description: 'Important system and security alerts',
                  },
                  {
                    field: 'weeklyDigest',
                    label: 'Weekly Digest',
                    description: 'Summary of your weekly activity',
                  },
                  {
                    field: 'marketingEmails',
                    label: 'Marketing & Promotions',
                    description: 'New features, tips, and special offers',
                  },
                ].map(({ field, label, description }) => (
                  <div key={field} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Controller
                      name={field as keyof NotificationPreferencesFormData}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <input
                          type="checkbox"
                          checked={value as boolean}
                          onChange={(e) => onChange(e.target.checked)}
                          disabled={!emailNotifications || isLoading || isSaving}
                          className="h-5 w-5 rounded border-gray-300 text-purple-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 p-4 text-amber-700 flex gap-3">
              <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">Note</p>
                <p>
                  Most notification preferences depend on email notifications being enabled. Keep email notifications
                  on to receive all types of alerts.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" disabled={isLoading || isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || isSaving}>
                {isSaving ? 'Saving...' : 'Save Preferences'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
