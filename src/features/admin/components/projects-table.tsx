import { Plus, Search, Edit2, Trash2, Download, Upload } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { ProjectAddForm } from './project-add-form';

interface Project {
  id: string;
  name: string;
  client: string;
  type: 'Website' | 'Web App' | 'Mobile' | 'ERP' | 'CRM' | 'HRMS';
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  budget: string;
  team: number;
  dueDate: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Luméra Store Redesign',
    client: 'Luméra Living',
    type: 'Web App',
    status: 'in-progress',
    progress: 75,
    budget: '₹2,40,000',
    team: 4,
    dueDate: 'Mar 30, 2024',
  },
  {
    id: '2',
    name: 'Viora Mobile App',
    client: 'Viora Health',
    type: 'Mobile',
    status: 'in-progress',
    progress: 60,
    budget: '₹1,80,000',
    team: 3,
    dueDate: 'Apr 15, 2024',
  },
  {
    id: '3',
    name: 'ScaleOS Analytics',
    client: 'ScaleOS',
    type: 'Web App',
    status: 'planning',
    progress: 15,
    budget: '₹3,20,000',
    team: 5,
    dueDate: 'May 20, 2024',
  },
  {
    id: '4',
    name: 'TechStartup Landing',
    client: 'TechStartup Inc',
    type: 'Website',
    status: 'completed',
    progress: 100,
    budget: '₹65,000',
    team: 2,
    dueDate: 'Feb 28, 2024',
  },
  {
    id: '5',
    name: 'Enterprise ERP System',
    client: 'Enterprise Co',
    type: 'ERP',
    status: 'in-progress',
    progress: 45,
    budget: '₹8,90,000',
    team: 8,
    dueDate: 'Jun 30, 2024',
  },
];

export function ProjectsTable() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'Website' | 'Web App' | 'Mobile' | 'ERP' | 'CRM' | 'HRMS'>(
    'all',
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'planning' | 'in-progress' | 'completed' | 'on-hold'>(
    'all',
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.client.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, typeFilter, statusFilter]);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'planning':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'on-hold':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>Track all active and completed projects</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="gap-2 bg-purple-600 hover:bg-purple-700"
              size="sm"
            >
              <Plus className="size-4" />
              New Project
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="size-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="size-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or client..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={(v: any) => setTypeFilter(v)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="Web App">Web App</SelectItem>
              <SelectItem value="Mobile">Mobile</SelectItem>
              <SelectItem value="ERP">ERP</SelectItem>
              <SelectItem value="CRM">CRM</SelectItem>
              <SelectItem value="HRMS">HRMS</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Project</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Client</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Progress</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Budget</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Team</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-b border-border/50 hover:bg-accent/50">
                  <td className="px-4 py-3">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-xs text-muted-foreground">{project.dueDate}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{project.client}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary">{project.type}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={getStatusColor(project.status)}>
                      {project.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full max-w-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-purple-600"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{project.progress}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-sm">{project.budget}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-purple-700 dark:text-purple-400">
                      {project.team}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                      >
                        <Edit2 className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <p>
            Showing <span className="font-medium">{filteredProjects.length}</span> of{' '}
            <span className="font-medium">{mockProjects.length}</span> projects
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Add Project Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Project"
        size="xl"
      >
        <ProjectAddForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </Card>
  );
}
