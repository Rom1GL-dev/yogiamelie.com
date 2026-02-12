import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { BlogTableActions } from './blog-table-actions';
import type { Blog } from '../blogs';

export const blogColumns: ColumnDef<Blog>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'subtitle',
    header: 'Sous-titre',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.getValue('subtitle') || '—'}
      </span>
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
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {new Date(row.getValue('createdAt')).toLocaleDateString('fr-FR')}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: BlogTableActions,
  },
];
