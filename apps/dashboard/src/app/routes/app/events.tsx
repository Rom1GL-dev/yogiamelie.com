import { lazy } from 'react';

const Events = lazy(() =>
  import('@/features/events/events').then((m) => ({
    default: m.Events,
  }))
);

export function EventsPage() {
  return <Events />;
}
