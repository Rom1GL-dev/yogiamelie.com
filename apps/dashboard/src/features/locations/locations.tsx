import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table/data-table';
import LocationProvider from './context/location-provider';
import { locationColumns } from './components/location-columns';
import { LocationListingToolbar } from './components/location-listing-toolbar';
import { LocationDialogs } from './components/location-dialogs';

export type Location = {
  id: string;
  title: string;
  subtitle: string;
  lieu: string | null;
  parking: string | null;
  planning: string | null;
  image: string;
  published: boolean;
  buttonText: string | null;
  buttonLink: string | null;
  createdAt: string;
};

export function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocations = async () => {
    try {
      const res = await api.get('/v1/location');
      setLocations(res.data.locations ?? []);
    } catch {
      toast.error('Erreur lors du chargement des lieux.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
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
        <h1 className="text-2xl font-bold text-[#667467]">Lieux</h1>
        <p className="text-muted-foreground">Gérez vos lieux de pratique.</p>
      </div>

      <LocationProvider>
        <DataTable
          columns={locationColumns}
          data={locations}
          Toolbar={LocationListingToolbar}
        />
        <LocationDialogs onSuccess={fetchLocations} />
      </LocationProvider>
    </div>
  );
}
