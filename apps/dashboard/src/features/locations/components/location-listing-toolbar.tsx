import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { DataTableFilter } from '@/components/data-table/data-table-filter';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';
import { DataTableSearch } from '@/components/data-table/data-table-search';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, Plus } from 'lucide-react';
import * as React from 'react';
import { useLocation } from '@/features/locations/context/location-provider';

const statusOptions = [
  { label: 'Publié', value: 'published' },
  { label: 'Brouillon', value: 'draft' },
];

interface Props { table: any; }

export function LocationListingToolbar({ table }: Props) {
  const isMobile = useIsMobile();
  const isFiltered = table.getState().columnFilters.length > 0;
  const [openFilters, setOpenFilters] = React.useState(false);
  const { setOpen } = useLocation();

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <DataTableViewOptions table={table} />
          <DataTableSearch table={table} />
          <DataTableFilter title="Statut" options={statusOptions} column="status" table={table} />
          {!isMobile && isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
              Annuler<Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
        {isMobile && (
          <Button variant="outline" size="icon" onClick={() => setOpenFilters((prev) => !prev)}>
            <ChevronDown className={`h-5 w-5 transition-transform ${openFilters ? 'rotate-180' : 'rotate-0'}`} />
          </Button>
        )}
        {!isMobile && (
          <div className="flex flex-1 justify-end">
            <Button onClick={() => setOpen('create')} className="cursor-pointer bg-[#667467] hover:bg-[#667467]/90">
              <Plus className="size-4" />Ajouter
            </Button>
          </div>
        )}
      </div>
      {isMobile && openFilters && (
        <div className="flex w-full flex-col gap-4 rounded-md bg-[#e8ede9] p-4 shadow-sm">
          {isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2">
              Réinitialiser les filtres<Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button onClick={() => setOpen('create')} className="cursor-pointer bg-[#667467] hover:bg-[#667467]/90">
            <Plus className="size-4" />Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}
