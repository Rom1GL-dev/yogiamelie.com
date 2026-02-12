import { lazy } from 'react';

const Prices = lazy(() =>
  import('@/features/prices/prices').then((m) => ({
    default: m.Prices,
  }))
);

export function PricesPage() {
  return <Prices />;
}
