import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table/data-table';
import EventProvider from './context/event-provider';
import { eventColumns } from './components/event-columns';
import { EventListingToolbar } from './components/event-listing-toolbar';
import { EventDialogs } from './components/event-dialogs';

export type Event = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  type: string | null;
  linkRegister: string | null;
  location: string | null;
  createdAt: string;
};

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/v1/events');
      setEvents(res.data.events ?? []);
    } catch {
      toast.error('Erreur lors du chargement des événements.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-8 animate-spin rounded-full border-4 border-[#e8ede9] border-t-[#667467]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#667467]">Événements</h1>
        <p className="text-muted-foreground">Gérez vos événements et ateliers.</p>
      </div>

      <EventProvider>
        <DataTable
          columns={eventColumns}
          data={events}
          Toolbar={EventListingToolbar}
          defaultSort={[{ id: 'startDate', desc: true }]}
        />
        <EventDialogs onSuccess={fetchEvents} />
      </EventProvider>
    </div>
  );
}
