'use client';

import { useState } from 'react';
import { Save, X, Upload, Trash2, Eye, Lock, Shield, Bell, Palette, Globe, Link as LinkIcon, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  designation?: string;
  department?: string;
  bio?: string;
  twoFactorEnabled?: boolean;
  lastLogin?: Date;
  activeDevices?: number;
}

interface CompleteProfileProps {
  user: ProfileUser;
  onSave?: (userData: Partial<ProfileUser>) => Promise<void>;
  showSensitiveFields?: boolean;
}

export function CompleteProfile({ user, onSave, showSensitiveFields = true }: CompleteProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (onSave) {
        await onSave(formData);
      }
      setIsEditing(false);
    } catch (error) {
      console.error('[v0] Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-4 items-start">
              <div className="relative">
                <img
                  src={formData.avatar || `https://avatar.vercel.sh/${formData.name}`}
                  alt={formData.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {isEditing && (
                  <label className="absolute inset-0 bg-black/50 rounded-full cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Upload className="w-6 h-6 text-white" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Full Name"
                    />
                    <Input
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Email"
                      type="email"
                    />
                    <Input
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Phone"
                      type="tel"
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold">{formData.name}</h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                    {formData.designation && (
                      <p className="text-sm text-muted-foreground">{formData.designation} • {formData.department}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button variant="outline" icon={<X className="size-4" />} onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button icon={<Save className="size-4" />} onClick={handleSave} isLoading={isSaving}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="personal">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Personal Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <Input value={formData.name.split(' ')[0]} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <Input value={formData.name.split(' ').slice(1).join(' ')} disabled />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full p-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about yourself"
                  rows={4}
                  disabled={!isEditing}
                />
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" /> Social Links
                </h3>
                <Input placeholder="LinkedIn Profile" icon={<LinkIcon className="w-4 h-4" />} disabled={!isEditing} />
                <Input placeholder="GitHub Profile" icon={<LinkIcon className="w-4 h-4" />} disabled={!isEditing} />
                <Input placeholder="Twitter/X Handle" icon={<LinkIcon className="w-4 h-4" />} disabled={!isEditing} />
              </div>

              {/* Emergency Contact */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" /> Emergency Contact
                </h3>
                <Input placeholder="Contact Name" disabled={!isEditing} />
                <Input placeholder="Contact Phone" type="tel" disabled={!isEditing} />
                <Input placeholder="Relationship" disabled={!isEditing} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        {showSensitiveFields && (
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Password & Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-3">
                  <h3 className="font-medium">Change Password</h3>
                  <Input type="password" placeholder="Current Password" />
                  <Input type="password" placeholder="New Password" />
                  <Input type="password" placeholder="Confirm Password" />
                  <Button className="w-full">Update Password</Button>
                </div>

                {/* Two Factor Authentication */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-medium">Two-Factor Authentication</span>
                    </div>
                    <Button variant={formData.twoFactorEnabled ? 'danger' : 'success'}>
                      {formData.twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by requiring a code from your phone.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Active Sessions & Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Chrome on macOS</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA • Last active now</p>
                      </div>
                      <Button variant="danger" size="sm">Sign Out</Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-sm text-muted-foreground">San Francisco, CA • Last active 2 hours ago</p>
                      </div>
                      <Button variant="danger" size="sm">Sign Out</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Login History */}
            <Card>
              <CardHeader>
                <CardTitle>Login History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Successful Login</p>
                      <p className="text-sm text-muted-foreground">Today at 9:30 AM from 192.168.1.1</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Success</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Failed Login</p>
                      <p className="text-sm text-muted-foreground">Yesterday at 2:15 PM from 192.168.1.50</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Failed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <div className="space-y-4">
            <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div className="space-y-3">
                <h3 className="font-medium flex items-center gap-2">
                  <Bell className="w-4 h-4" /> Notifications
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span>Email Notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                    <span>SMS Notifications</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span>Marketing Emails</span>
                  </label>
                </div>
              </div>

              {/* Appearance */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-medium flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Appearance
                </h3>
                <div className="flex gap-3">
                  <button className="w-12 h-12 rounded-lg bg-white border-2 border-border" title="Light" />
                  <button className="w-12 h-12 rounded-lg bg-slate-900 border-2 border-primary" title="Dark" />
                  <button className="w-12 h-12 rounded-lg bg-gradient-to-br from-white to-slate-900 border-2 border-border" title="Auto" />
                </div>
              </div>

              {/* Language & Timezone */}
              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-medium flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Language & Timezone
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select className="w-full p-3 rounded-lg border border-input bg-background">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Timezone</label>
                    <select className="w-full p-3 rounded-lg border border-input bg-background">
                      <option>PST (UTC-8)</option>
                      <option>EST (UTC-5)</option>
                      <option>CST (UTC-6)</option>
                      <option>GMT (UTC+0)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
            </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <div className="space-y-4">
            <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and login history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">Profile Updated</p>
                    <p className="text-sm text-muted-foreground">Changed avatar and bio • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">Password Changed</p>
                    <p className="text-sm text-muted-foreground">Security update • 5 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <div className="flex-1">
                    <p className="font-medium">Two-Factor Authentication Enabled</p>
                    <p className="text-sm text-muted-foreground">Security enhancement • 1 week ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="space-y-4">
            <Card>
            <CardHeader>
              <CardTitle>Documents & Files</CardTitle>
              <CardDescription>Your uploaded documents and files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-4 border border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted">
                  <div className="text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium">Drag files here or click to upload</p>
                    <p className="text-sm text-muted-foreground">Supported: PDF, DOC, DOCX, Images</p>
                  </div>
                </div>

                <div className="space-y-2 mt-6">
                  <h3 className="font-medium">Uploaded Documents</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">Resume.pdf</p>
                        <p className="text-sm text-muted-foreground">2.3 MB • Uploaded 2 weeks ago</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" icon={<Eye className="w-4 h-4" />} title="View" />
                        <Button variant="ghost" size="icon" icon={<Trash2 className="w-4 h-4" />} title="Delete" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
