import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { UserTableActions } from './user-table-actions';
import type { User } from '../users';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Nom',
    filterFn: 'includesString',
    cell: ({ row }) => row.getValue('name') || '—',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'role',
    header: 'Rôle',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge
          className={
            role === 'ADMIN'
              ? 'bg-[#667467]/10 text-[#667467] border-[#667467]/20'
              : 'bg-gray-100 text-gray-700 border-gray-200'
          }
        >
          {role === 'ADMIN' ? 'Admin' : 'Utilisateur'}
        </Badge>
      );
    },
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
    cell: UserTableActions,
  },
];
