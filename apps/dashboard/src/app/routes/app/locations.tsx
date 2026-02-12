import { lazy } from 'react';

const Locations = lazy(() =>
  import('@/features/locations/locations').then((m) => ({
    default: m.Locations,
  }))
);

export function LocationsPage() {
  return <Locations />;
}
