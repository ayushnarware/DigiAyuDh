import { MoreHorizontal, Plus, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
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

interface Task {
  id: string;
  title: string;
  project: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'in-review' | 'completed';
  dueDate: string;
  assignee: string;
  progress: number;
}

const mockTasks: Task[] = [
  {
    id: 'TASK-1',
    title: 'Implement payment gateway',
    project: 'Luméra Store',
    priority: 'high',
    status: 'in-progress',
    dueDate: 'Mar 22, 2024',
    assignee: 'Priya Mehta',
    progress: 65,
  },
  {
    id: 'TASK-2',
    title: 'Design mobile UI mockups',
    project: 'Viora Health',
    priority: 'high',
    status: 'in-review',
    dueDate: 'Mar 20, 2024',
    assignee: 'Ananya Gupta',
    progress: 90,
  },
  {
    id: 'TASK-3',
    title: 'Database optimization',
    project: 'ScaleOS',
    priority: 'medium',
    status: 'in-progress',
    dueDate: 'Mar 25, 2024',
    assignee: 'Arjun Desai',
    progress: 45,
  },
  {
    id: 'TASK-4',
    title: 'API documentation',
    project: 'ScaleOS',
    priority: 'low',
    status: 'todo',
    dueDate: 'Mar 30, 2024',
    assignee: 'Priya Mehta',
    progress: 0,
  },
  {
    id: 'TASK-5',
    title: 'Bug fixes and testing',
    project: 'Luméra Store',
    priority: 'medium',
    status: 'completed',
    dueDate: 'Mar 18, 2024',
    assignee: 'Rahul Singh',
    progress: 100,
  },
];

export function TasksTable() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>(
    'all',
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'in-review' | 'completed'>(
    'all',
  );

  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.id.toLowerCase().includes(search.toLowerCase()) ||
        task.project.toLowerCase().includes(search.toLowerCase());

      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [search, priorityFilter, statusFilter]);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="size-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="size-4 text-blue-500" />;
      case 'in-review':
        return <AlertCircle className="size-4 text-purple-500" />;
      default:
        return <Clock className="size-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'in-review':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'todo':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Tasks</CardTitle>
            <CardDescription>Assigned tasks and work items</CardDescription>
          </div>
          <Button variant="brand" size="sm" className="gap-2">
            <Plus className="size-4" />
            New Task
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, ID or project..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={priorityFilter} onValueChange={(v: any) => setPriorityFilter(v)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-accent/50"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="mt-1">{getStatusIcon(task.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="text-xs font-mono font-bold text-purple-400">{task.id}</code>
                    <h4 className="font-medium truncate">{task.title}</h4>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{task.project}</p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="h-2 flex-1 max-w-xs rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-600 to-purple-600"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{task.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4 flex-wrap justify-end">
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
                <Badge variant="outline" className={getStatusColor(task.status)}>
                  {task.status.replace('-', ' ')}
                </Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{task.dueDate}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No tasks found</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <p>
            Showing <span className="font-medium">{filteredTasks.length}</span> of{' '}
            <span className="font-medium">{mockTasks.length}</span> tasks
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
    </Card>
  );
}
