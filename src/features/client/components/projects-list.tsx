import { ArrowUpRight, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'planning' | 'in-progress' | 'completed';
  progress: number;
  team: number;
  deadline: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Luméra Store Redesign',
    description: 'Complete redesign of e-commerce platform with new UI/UX',
    type: 'Web App',
    status: 'in-progress',
    progress: 75,
    team: 4,
    deadline: 'Mar 30, 2024',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android applications',
    type: 'Mobile',
    status: 'in-progress',
    progress: 60,
    team: 3,
    deadline: 'Apr 15, 2024',
  },
  {
    id: '3',
    name: 'Dashboard Analytics',
    description: 'Real-time analytics and reporting dashboard',
    type: 'Web App',
    status: 'planning',
    progress: 15,
    team: 2,
    deadline: 'May 20, 2024',
  },
];

export function ProjectsList() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>Active and upcoming development projects</CardDescription>
          </div>
          <Button variant="brand" size="sm" className="gap-2">
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {mockProjects.map((project) => (
            <div key={project.id} className="rounded-xl border border-border bg-card p-5 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/5 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{project.type}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">Progress</span>
                    <span className="text-xs font-medium">{project.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-600 to-purple-600"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Deadline: {project.deadline}</span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    {project.team} members
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={
                    project.status === 'completed'
                      ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                      : project.status === 'in-progress'
                        ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                        : 'bg-purple-500/10 text-purple-700 dark:text-purple-400'
                  }
                >
                  {project.status.replace('-', ' ')}
                </Badge>
                <Button variant="ghost" size="sm" className="gap-1">
                  View <ArrowUpRight className="size-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
