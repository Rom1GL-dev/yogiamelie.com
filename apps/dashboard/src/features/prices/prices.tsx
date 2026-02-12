import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table/data-table';
import PriceProvider from './context/price-provider';
import { priceColumns } from './components/price-columns';
import { PriceListingToolbar } from './components/price-listing-toolbar';
import { PriceDialogs } from './components/price-dialogs';

export type Price = {
  id: string;
  label: string;
  number: string;
  extra: string | null;
  price: string;
  info: string | null;
  createdAt: string;
};

export function Prices() {
  const [prices, setPrices] = useState<Price[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      const res = await api.get('/v1/prices');
      setPrices(res.data.prices ?? []);
    } catch {
      toast.error('Erreur lors du chargement des tarifs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
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
        <h1 className="text-2xl font-bold text-[#667467]">Tarifs</h1>
        <p className="text-muted-foreground">Gérez vos tarifications.</p>
      </div>

      <PriceProvider>
        <DataTable
          columns={priceColumns}
          data={prices}
          Toolbar={PriceListingToolbar}
        />
        <PriceDialogs onSuccess={fetchPrices} />
      </PriceProvider>
    </div>
  );
}
