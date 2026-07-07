import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Designation {
  id: string;
  title: string;
  department: string;
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager' | 'Head';
  salary_range: string;
  employees: number;
  status: 'active' | 'inactive';
}

const mockDesignations: Designation[] = [
  { id: '1', title: 'Junior Developer', department: 'Engineering', level: 'Junior', salary_range: '₹4-6L', employees: 3, status: 'active' },
  { id: '2', title: 'Senior Developer', department: 'Engineering', level: 'Senior', salary_range: '₹10-15L', employees: 4, status: 'active' },
  { id: '3', title: 'Tech Lead', department: 'Engineering', level: 'Lead', salary_range: '₹15-20L', employees: 2, status: 'active' },
  { id: '4', title: 'UX Designer', department: 'Design', level: 'Mid', salary_range: '₹6-9L', employees: 3, status: 'active' },
  { id: '5', title: 'Product Manager', department: 'Product', level: 'Manager', salary_range: '₹12-18L', employees: 2, status: 'active' },
];

export function DesignationsTable() {
  const [designations, setDesignations] = useState<Designation[]>(mockDesignations);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(
    () => designations.filter(d => d.title.toLowerCase().includes(search.toLowerCase()) || d.department.toLowerCase().includes(search.toLowerCase())),
    [designations, search]
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this designation?')) setDesignations(designations.filter(d => d.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Designations</CardTitle>
          <Button icon={<Plus className="size-4" />} onClick={() => setShowAddModal(true)}>Add Designation</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search designations..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Level</th>
                  <th className="text-left py-3 px-4 font-medium">Salary Range</th>
                  <th className="text-left py-3 px-4 font-medium">Employees</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{d.title}</td>
                    <td className="py-3 px-4">{d.department}</td>
                    <td className="py-3 px-4"><Badge>{d.level}</Badge></td>
                    <td className="py-3 px-4">{d.salary_range}</td>
                    <td className="py-3 px-4">{d.employees}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
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
        <Modal isOpen={showAddModal} title="Add Designation" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-2">Title</label><Input placeholder="Job title" /></div>
            <div><label className="block text-sm font-medium mb-2">Department</label><Input placeholder="Department" /></div>
            <div><label className="block text-sm font-medium mb-2">Level</label><Input placeholder="Level" /></div>
            <div><label className="block text-sm font-medium mb-2">Salary Range</label><Input placeholder="₹" /></div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>Add</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
