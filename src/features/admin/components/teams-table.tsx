import { Plus, Search, Edit2, Trash2, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Team {
  id: string;
  name: string;
  description: string;
  members: number;
  lead: string;
  department: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Backend Development',
    description: 'Core backend services and APIs',
    members: 5,
    lead: 'Rahul Singh',
    department: 'Engineering',
    status: 'active',
    createdDate: 'Jan 15, 2023',
  },
  {
    id: '2',
    name: 'Frontend Development',
    description: 'UI and UX implementation',
    members: 4,
    lead: 'Ananya Gupta',
    department: 'Engineering',
    status: 'active',
    createdDate: 'Jan 20, 2023',
  },
  {
    id: '3',
    name: 'DevOps & Infrastructure',
    description: 'Cloud infrastructure and deployment',
    members: 3,
    lead: 'Vikas Verma',
    department: 'Engineering',
    status: 'active',
    createdDate: 'Feb 1, 2023',
  },
  {
    id: '4',
    name: 'Quality Assurance',
    description: 'Testing and quality assurance',
    members: 4,
    lead: 'Neha Kapoor',
    department: 'Quality Assurance',
    status: 'active',
    createdDate: 'Feb 10, 2023',
  },
  {
    id: '5',
    name: 'Product Design',
    description: 'Product and UX design',
    members: 3,
    lead: 'Priya Mehta',
    department: 'Design',
    status: 'active',
    createdDate: 'Mar 5, 2023',
  },
];

export function TeamsTable() {
  const [teams, setTeams] = useState<Team[]>(mockTeams);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTeams = useMemo(() => {
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(search.toLowerCase()) ||
        team.lead.toLowerCase().includes(search.toLowerCase()) ||
        team.department.toLowerCase().includes(search.toLowerCase()),
    );
  }, [teams, search]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this team?')) {
      setTeams(teams.filter((t) => t.id !== id));
    }
  };

  const handleAddTeam = (formData: Partial<Team>) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name: formData.name || '',
      description: formData.description || '',
      members: formData.members || 0,
      lead: formData.lead || '',
      department: formData.department || '',
      status: 'active',
      createdDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };
    setTeams([...teams, newTeam]);
    setShowAddModal(false);
  };



  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Teams Management</CardTitle>
          </div>
          <Button
            icon={<Plus className="size-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add Team
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search teams by name, lead, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Team Name</th>
                  <th className="text-left py-3 px-4 font-medium">Lead</th>
                  <th className="text-left py-3 px-4 font-medium">Department</th>
                  <th className="text-left py-3 px-4 font-medium">Members</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Created</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeams.map((team) => (
                  <tr key={team.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{team.name}</p>
                        <p className="text-xs text-muted-foreground">{team.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{team.lead}</td>
                    <td className="py-3 px-4">{team.department}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {team.members}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={team.status === 'active' ? 'default' : 'secondary'}
                      >
                        {team.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{team.createdDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={<Edit2 className="size-4" />}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          icon={<Trash2 className="w-4 h-4 text-red-500" />}
                          onClick={() => handleDelete(team.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No teams found</p>
            </div>
          )}
        </div>
      </CardContent>

      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          title="Add New Team"
          onClose={() => setShowAddModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Team Name</label>
              <Input placeholder="Enter team name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Input placeholder="Enter team description" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Team Lead</label>
              <Input placeholder="Select team lead" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <Input placeholder="Select department" />
            </div>
            <div className="flex gap-2 justify-end pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => handleAddTeam({ name: 'New Team' })}>
                Add Team
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
