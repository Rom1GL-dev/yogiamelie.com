import { lazy } from 'react';

const Faqs = lazy(() =>
  import('@/features/faqs/faqs').then((m) => ({
    default: m.Faqs,
  }))
);

export function FaqsPage() {
  return <Faqs />;
}
