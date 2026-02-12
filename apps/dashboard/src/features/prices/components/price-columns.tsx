import { ColumnDef } from '@tanstack/react-table';
import { PriceTableActions } from './price-table-actions';
import type { Price } from '../prices';

export const priceColumns: ColumnDef<Price>[] = [
  {
    accessorKey: 'label',
    header: 'Libellé',
    filterFn: 'includesString',
  },
  {
    accessorKey: 'number',
    header: 'Nombre',
  },
  {
    accessorKey: 'price',
    header: 'Prix',
  },
  {
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue('info') || '—'}</span>
    ),
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: PriceTableActions,
  },
];
