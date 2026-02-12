import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { EventTableActions } from './event-table-actions';
import type { Event } from '../events';

function isPastEvent(startDate: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(startDate) < today;
}

export const eventColumns: ColumnDef<Event>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
    filterFn: 'includesString',
  },
  {
    id: 'status',
    header: 'Statut',
    accessorFn: (row) => (isPastEvent(row.startDate) ? 'past' : 'upcoming'),
    cell: ({ row }) => {
      const isPast = row.getValue('status') === 'past';
      return (
        <Badge variant={isPast ? 'warning' : 'success'}>
          {isPast ? 'Passé' : 'À venir'}
        </Badge>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      return row.getValue(columnId) === filterValue;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Début',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.getValue('startDate')).toLocaleDateString('fr-FR')} {row.original.startHour}
      </span>
    ),
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return month === filterValue;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Fin',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.getValue('endDate')).toLocaleDateString('fr-FR')} {row.original.endHour}
      </span>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Lieu',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue('location') || '—'}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: EventTableActions,
  },
];
