import { MoreHorizontal, Plus, Search, MessageSquare } from 'lucide-react';
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

interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  created: string;
  updated: string;
  assignee: string;
  messages: number;
}

const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Payment gateway integration issue',
    description: 'Unable to process transactions through the payment gateway',
    priority: 'high',
    status: 'in-progress',
    created: 'Mar 15, 2024',
    updated: 'Mar 17, 2024',
    assignee: 'Rahul Singh',
    messages: 4,
  },
  {
    id: 'TKT-002',
    title: 'Design updates on homepage',
    description: 'Requested changes to hero section and color scheme',
    priority: 'medium',
    status: 'open',
    created: 'Mar 16, 2024',
    updated: 'Mar 16, 2024',
    assignee: 'Ananya Gupta',
    messages: 2,
  },
  {
    id: 'TKT-003',
    title: 'Database optimization needed',
    description: 'Page loading time is slower than expected',
    priority: 'high',
    status: 'in-progress',
    created: 'Mar 10, 2024',
    updated: 'Mar 17, 2024',
    assignee: 'Arjun Desai',
    messages: 6,
  },
  {
    id: 'TKT-004',
    title: 'API documentation update',
    description: 'Need to update API endpoints documentation',
    priority: 'low',
    status: 'open',
    created: 'Mar 12, 2024',
    updated: 'Mar 12, 2024',
    assignee: 'Priya Mehta',
    messages: 1,
  },
  {
    id: 'TKT-005',
    title: 'Mobile app responsiveness fix',
    description: 'Issues with responsive design on iPad',
    priority: 'medium',
    status: 'resolved',
    created: 'Mar 5, 2024',
    updated: 'Mar 14, 2024',
    assignee: 'Vikas Verma',
    messages: 8,
  },
];

export function SupportTicketsTable() {
  const [search, setSearch] = useState('');
  const [priorityFilter, setpriorityFilter] = useState<'all' | 'low' | 'medium' | 'high' | 'urgent'>(
    'all',
  );
  const [statusFilter, setStatusFilter] = useState<'all' | 'open' | 'in-progress' | 'resolved' | 'closed'>(
    'all',
  );

  const filteredTickets = useMemo(() => {
    return mockTickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(search.toLowerCase()) ||
        ticket.id.toLowerCase().includes(search.toLowerCase());

      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [search, priorityFilter, statusFilter]);

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
      case 'high':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'low':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      default:
        return '';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'open':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-400';
      case 'closed':
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
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Track and manage your support requests</CardDescription>
          </div>
          <Button variant="brand" size="sm" className="gap-2">
            <Plus className="size-4" />
            New Ticket
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title or ticket ID..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={priorityFilter} onValueChange={(v: any) => setpriorityFilter(v)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
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
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:bg-accent/50"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <code className="text-xs font-mono font-bold text-purple-400">{ticket.id}</code>
                  <h4 className="font-medium truncate">{ticket.title}</h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{ticket.description}</p>
                <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span>Assigned to: {ticket.assignee}</span>
                  <span>Updated: {ticket.updated}</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="size-3" />
                    {ticket.messages}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">No tickets found</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <p>
            Showing <span className="font-medium">{filteredTickets.length}</span> of{' '}
            <span className="font-medium">{mockTickets.length}</span> tickets
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
