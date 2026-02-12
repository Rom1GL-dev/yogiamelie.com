import { ColumnDef } from '@tanstack/react-table';
import { FaqTableActions } from './faq-table-actions';
import type { Faq } from '../faqs';

export const faqColumns: ColumnDef<Faq>[] = [
  {
    accessorKey: 'answer',
    header: 'Question',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'response',
    header: 'Réponse',
    cell: ({ row }) => (
      <span className="max-w-[350px] truncate text-muted-foreground">
        {row.getValue('response')}
      </span>
    ),
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
    cell: FaqTableActions,
  },
];
