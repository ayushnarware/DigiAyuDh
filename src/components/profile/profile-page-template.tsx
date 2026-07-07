import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Save, X } from 'lucide-react';

interface ProfileSection {
  id: string;
  title: string;
  description?: string;
  fields: ProfileField[];
}

interface ProfileField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'select' | 'textarea';
  value: any;
  options?: { label: string; value: any }[];
  required?: boolean;
  readOnly?: boolean;
}

interface ProfilePageTemplateProps {
  title: string;
  sections: ProfileSection[];
  onSave?: (data: Record<string, any>) => Promise<void>;
}

export function ProfilePageTemplate({
  title,
  sections,
  onSave,
}: ProfilePageTemplateProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaving, setIsSaving] = useState(false);

  const handleSectionEdit = (sectionId: string, fields: ProfileField[]) => {
    setEditingSection(sectionId);
    const data: Record<string, any> = {};
    fields.forEach((field) => {
      data[field.id] = field.value;
    });
    setFormData(data);
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave(formData);
      setEditingSection(null);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>

      {sections.map((section) => (
        <Card key={section.id}>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{section.title}</CardTitle>
              {section.description && <CardDescription>{section.description}</CardDescription>}
            </div>
            {editingSection !== section.id && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSectionEdit(section.id, section.fields)}
              >
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === section.id ? (
              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm font-medium mb-2">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        value={formData[field.id] || field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        disabled={field.readOnly}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.id] || field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        disabled={field.readOnly}
                        className="w-full px-4 py-2 rounded-lg border border-input bg-background min-h-24"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={formData[field.id] || field.value}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        disabled={field.readOnly}
                      />
                    )}
                  </div>
                ))}

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<X className="size-4" />}
                    onClick={() => setEditingSection(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    icon={<Save className="size-4" />}
                    onClick={handleSave}
                    isLoading={isSaving}
                    loadingText="Saving..."
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {section.fields.map((field) => (
                  <div key={field.id}>
                    <p className="text-xs font-medium text-muted-foreground uppercase">{field.label}</p>
                    <p className="text-sm font-medium mt-1">{field.value || '-'}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
