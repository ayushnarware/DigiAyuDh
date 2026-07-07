import { Download, Upload, Eye, Trash2, Plus, Clock, FileText, Shield, Clock3 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Document {
  id: string;
  name: string;
  category: string;
  uploadedDate: string;
  expiryDate?: string;
  status: 'approved' | 'pending' | 'expired';
  size: string;
  url: string;
}

const documentCategories = [
  { id: 'offer', label: 'Offer Letter', icon: FileText },
  { id: 'appointment', label: 'Appointment Letter', icon: FileText },
  { id: 'joining', label: 'Joining Letter', icon: FileText },
  { id: 'promotion', label: 'Promotion Letter', icon: FileText },
  { id: 'experience', label: 'Experience Letter', icon: FileText },
  { id: 'salary', label: 'Salary Revision Letter', icon: FileText },
  { id: 'relieving', label: 'Relieving Letter', icon: FileText },
  { id: 'training', label: 'Training Certificates', icon: Shield },
  { id: 'performance', label: 'Performance Reviews', icon: Clock3 },
  { id: 'assets', label: 'Assets', icon: FileText },
  { id: 'government', label: 'Government Documents', icon: Shield },
  { id: 'bank', label: 'Bank Documents', icon: FileText },
];

const mockDocuments: Document[] = [
  { id: '1', name: 'Offer Letter - 2023', category: 'offer', uploadedDate: 'Jan 15, 2023', status: 'approved', size: '0.8 MB', url: '#' },
  { id: '2', name: 'Appointment Letter', category: 'appointment', uploadedDate: 'Jan 20, 2023', status: 'approved', size: '0.9 MB', url: '#' },
  { id: '3', name: 'Aadhar Card Copy', category: 'government', uploadedDate: 'Jan 25, 2023', expiryDate: 'Jan 25, 2043', status: 'approved', size: '1.2 MB', url: '#' },
  { id: '4', name: 'Pan Card Copy', category: 'government', uploadedDate: 'Jan 25, 2023', status: 'approved', size: '0.7 MB', url: '#' },
  { id: '5', name: 'Bank Account Details', category: 'bank', uploadedDate: 'Feb 1, 2023', status: 'pending', size: '0.5 MB', url: '#' },
  { id: '6', name: 'AWS Certification', category: 'training', uploadedDate: 'Mar 10, 2024', expiryDate: 'Mar 10, 2026', status: 'approved', size: '2.1 MB', url: '#' },
];

export function EmployeeDocumentsRepository() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);

  const filteredDocs = selectedCategory
    ? documents.filter(d => d.category === selectedCategory)
    : documents;

  const getStatusColor = (status: string) => {
    return status === 'approved' ? 'default' : status === 'pending' ? 'secondary' : 'destructive';
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this document?')) {
      setDocuments(documents.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Document Categories</CardTitle>
            <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowUploadModal(true)}>
              Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {documentCategories.map(cat => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedCategory === cat.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <cat.icon className="w-5 h-5 mb-2 text-muted-foreground" />
                <p className="text-sm font-medium">{cat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedCategory
              ? documentCategories.find(c => c.id === selectedCategory)?.label
              : 'All Documents'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No documents in this category</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center gap-4 flex-1">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{doc.name}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{doc.uploadedDate}</span>
                        {doc.expiryDate && (
                          <>
                            <span>•</span>
                            <span>Expires: {doc.expiryDate}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(doc.status) as any}>{doc.status}</Badge>
                    <Button variant="ghost" size="icon" icon={<Eye className="w-4 h-4" />} />
                    <Button variant="ghost" size="icon" icon={<Download className="w-4 h-4" />} />
                    <Button
                      variant="ghost"
                      size="icon"
                      icon={<Trash2 className="w-4 h-4 text-red-500" />}
                      onClick={() => handleDelete(doc.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {showUploadModal && (
        <Modal
          isOpen={showUploadModal}
          title="Upload Document"
          onClose={() => setShowUploadModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Document Category</label>
              <select className="w-full px-4 py-2 rounded-lg border border-input bg-background">
                <option>Select category...</option>
                {documentCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Document Name</label>
              <input
                type="text"
                placeholder="Enter document name"
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload File</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium">Drag and drop or click to upload</p>
                <p className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Expiry Date (Optional)</label>
              <input type="date" className="w-full px-4 py-2 rounded-lg border border-input bg-background" />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowUploadModal(false)}>
                Upload
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
