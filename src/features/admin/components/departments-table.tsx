import { Plus, Search, Edit2, Trash2, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Department {
  id: string;
  name: string;
  code: string;
  head: string;
  employees: number;
  budget: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    code: 'ENG',
    head: 'Rahul Singh',
    employees: 12,
    budget: '₹50,00,000',
    status: 'active',
    createdDate: 'Jan 1, 2023',
  },
  {
    id: '2',
    name: 'Design',
    code: 'DES',
    head: 'Ananya Gupta',
    employees: 5,
    budget: '₹15,00,000',
    status: 'active',
    createdDate: 'Jan 5, 2023',
  },
  {
    id: '3',
    name: 'Sales',
    code: 'SAL',
    head: 'Priya Mehta',
    employees: 8,
    budget: '₹30,00,000',
    status: 'active',
    createdDate: 'Jan 10, 2023',
  },
  {
    id: '4',
    name: 'Human Resources',
    code: 'HR',
    head: 'Neha Kapoor',
    employees: 4,
    budget: '₹12,00,000',
    status: 'active',
    createdDate: 'Jan 15, 2023',
  },
  {
    id: '5',
    name: 'Finance',
    code: 'FIN',
    head: 'Vikas Verma',
    employees: 6,
    budget: '₹20,00,000',
    status: 'active',
    createdDate: 'Jan 20, 2023',
  },
];

export function DepartmentsTable() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredDepts = useMemo(() => {
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(search.toLowerCase()) ||
        dept.code.toLowerCase().includes(search.toLowerCase()) ||
        dept.head.toLowerCase().includes(search.toLowerCase()),
    );
  }, [departments, search]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter((d) => d.id !== id));
    }
  };

  const handleAddDept = (formData: Partial<Department>) => {
    const newDept: Department = {
      id: Date.now().toString(),
      name: formData.name || '',
      code: formData.code || '',
      head: formData.head || '',
      employees: formData.employees || 0,
      budget: formData.budget || '',
      status: 'active',
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    setDepartments([...departments, newDept]);
    setShowAddModal(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Departments</CardTitle>
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add Department
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search departments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Code</th>
                  <th className="text-left py-3 px-4 font-medium">Head</th>
                  <th className="text-left py-3 px-4 font-medium">Employees</th>
                  <th className="text-left py-3 px-4 font-medium">Budget</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDepts.map((dept) => (
                  <tr key={dept.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">{dept.code}</td>
                    <td className="py-3 px-4">{dept.head}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {dept.employees}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{dept.budget}</td>
                    <td className="py-3 px-4">
                      <Badge variant="default">{dept.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={<Edit2 className="w-4 h-4" />}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={<Trash2 className="w-4 h-4 text-red-500" />}
                          onClick={() => handleDelete(dept.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDepts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No departments found</p>
            </div>
          )}
        </div>
      </CardContent>

      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          title="Add New Department"
          onClose={() => setShowAddModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Department Name</label>
              <Input placeholder="Enter department name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Department Code</label>
              <Input placeholder="E.g., ENG, SAL, HR" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Department Head</label>
              <Input placeholder="Select department head" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Budget</label>
              <Input placeholder="₹" />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleAddDept({ name: 'New Department' })}>
                Add Department
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
