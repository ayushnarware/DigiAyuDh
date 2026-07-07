import { Plus, Search, Edit2, Trash2, Calendar, Users } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';

interface Meeting {
  id: string;
  title: string;
  organizer: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  room: string;
}

const mockMeetings: Meeting[] = [
  { id: '1', title: 'Q1 Planning', organizer: 'Rahul Singh', date: 'Mar 15, 2024', time: '10:00 AM', duration: '2h', attendees: 8, status: 'scheduled', room: 'Conference Room A' },
  { id: '2', title: 'Sprint Review', organizer: 'Ananya Gupta', date: 'Mar 14, 2024', time: '3:00 PM', duration: '1h', attendees: 5, status: 'completed', room: 'Virtual' },
  { id: '3', title: 'Design Sync', organizer: 'Priya Mehta', date: 'Mar 16, 2024', time: '2:00 PM', duration: '1h', attendees: 4, status: 'scheduled', room: 'Design Studio' },
  { id: '4', title: 'Stakeholder Update', organizer: 'Vikas Verma', date: 'Mar 13, 2024', time: '11:00 AM', duration: '1.5h', attendees: 12, status: 'completed', room: 'Board Room' },
];

export function MeetingsTable() {
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = useMemo(
    () => meetings.filter(m => m.title.toLowerCase().includes(search.toLowerCase()) || m.organizer.toLowerCase().includes(search.toLowerCase())),
    [meetings, search]
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this meeting?')) setMeetings(meetings.filter(m => m.id !== id));
  };

  const getStatusColor = (status: string) => {
    return status === 'scheduled' ? 'default' : status === 'completed' ? 'secondary' : 'destructive';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Meetings</CardTitle>
          <Button icon={<Plus className="size-4" />} onClick={() => setShowAddModal(true)}>Schedule Meeting</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input placeholder="Search meetings..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium">Organizer</th>
                  <th className="text-left py-3 px-4 font-medium">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium">Room</th>
                  <th className="text-left py-3 px-4 font-medium">Attendees</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{m.title}</td>
                    <td className="py-3 px-4">{m.organizer}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>{m.date} at {m.time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{m.room}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {m.attendees}
                      </div>
                    </td>
                    <td className="py-3 px-4"><Badge variant={getStatusColor(m.status) as any}>{m.status}</Badge></td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-end">
                        <Button variant="ghost" size="icon" icon={<Edit2 className="w-4 h-4" />} />
                        <Button variant="ghost" size="icon" icon={<Trash2 className="w-4 h-4 text-red-500" />} onClick={() => handleDelete(m.id)} />
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
        <Modal isOpen={showAddModal} title="Schedule Meeting" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium mb-2">Meeting Title</label><Input placeholder="Enter meeting title" /></div>
            <div><label className="block text-sm font-medium mb-2">Date</label><Input type="date" /></div>
            <div><label className="block text-sm font-medium mb-2">Time</label><Input type="time" /></div>
            <div><label className="block text-sm font-medium mb-2">Room/Location</label><Input placeholder="Conference Room or Virtual" /></div>
            <div><label className="block text-sm font-medium mb-2">Attendees</label><Input placeholder="Select attendees" /></div>
            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={() => setShowAddModal(false)}>Schedule</Button>
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
}
