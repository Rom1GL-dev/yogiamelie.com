import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { LocationTableActions } from './location-table-actions';
import type { Location } from '../locations';

export const locationColumns: ColumnDef<Location>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'subtitle',
    header: 'Sous-titre',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue('subtitle') || '—'}</span>
    ),
  },
  {
    id: 'status',
    header: 'Statut',
    accessorFn: (row) => (row.published ? 'published' : 'draft'),
    cell: ({ row }) => (
      <Badge variant={row.getValue('status') === 'published' ? 'success' : 'warning'}>
        {row.getValue('status') === 'published' ? 'Publié' : 'Brouillon'}
      </Badge>
    ),
    filterFn: (row, columnId, filterValue) => row.getValue(columnId) === filterValue,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: LocationTableActions,
  },
];
