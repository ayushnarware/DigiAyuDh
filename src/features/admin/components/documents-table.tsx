import { Plus, Search, Download, Edit2, Trash2, FileText, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
  category: 'Contract' | 'Agreement' | 'Policy' | 'Report' | 'Other';
  status: 'draft' | 'approved' | 'archived';
  fileSize: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Employee Handbook 2024', type: 'PDF', uploadedBy: 'Neha Kapoor', uploadedDate: 'Mar 1, 2024', category: 'Policy', status: 'approved', fileSize: '2.4 MB' },
  { id: '2', name: 'Service Agreement - Acme Corp', type: 'DOCX', uploadedBy: 'Rahul Singh', uploadedDate: 'Mar 5, 2024', category: 'Agreement', status: 'approved', fileSize: '1.8 MB' },
  { id: '3', name: 'Q1 Financial Report', type: 'XLSX', uploadedBy: 'Vikas Verma', uploadedDate: 'Mar 10, 2024', category: 'Report', status: 'draft', fileSize: '0.9 MB' },
  { id: '4', name: 'NDA Template', type: 'PDF', uploadedBy: 'Priya Mehta', uploadedDate: 'Feb 28, 2024', category: 'Contract', status: 'approved', fileSize: '1.2 MB' },
  { id: '5', name: 'Privacy Policy', type: 'PDF', uploadedBy: 'Ananya Gupta', uploadedDate: 'Mar 3, 2024', category: 'Policy', status: 'approved', fileSize: '0.8 MB' },
];

export function DocumentsTable() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(
    () => documents.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.uploadedBy.toLowerCase().includes(search.toLowerCase())),
    [documents, search]
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this document?')) setDocuments(documents.filter(d => d.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'approved' ? 'default' : status === 'draft' ? 'secondary' : 'outline';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Documents</CardTitle>
          <Button icon={<Plus className="size-4" />} onClick={() => setShowAddModal(true)}>Upload Document</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Uploaded By</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Size</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{d.name}</p>
                          <p className="text-xs text-muted-foreground">{d.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4"><Badge variant="outline">{d.category}</Badge></td>
                    <td className="py-3 px-4">{d.uploadedBy}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {d.uploadedDate}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{d.fileSize}</td>
                    <td className="py-3 px-4"><Badge variant={getStatusColor(d.status) as any}>{d.status}</Badge></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" icon={<Download className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Edit2 className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Trash2 className="w-4 h-4 text-red-500" />} onClick={() => handleDelete(d.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
      {showAddModal && (
        <Modal isOpen={showAddModal} title="Upload Document" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-2">Document Name</label><Input placeholder="Enter document name" /></div>
            <div><label className="block text-sm font-medium mb-2">Category</label><Input placeholder="Select category" /></div>
            <div><label className="block text-sm font-medium mb-2">File</label><Input type="file" /></div>
            <div><label className="block text-sm font-medium mb-2">Description</label><Input placeholder="Optional description" /></div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>Upload</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
