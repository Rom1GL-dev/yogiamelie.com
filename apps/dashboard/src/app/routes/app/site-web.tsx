import { lazy } from 'react';

const SiteWeb = lazy(() =>
  import('@/features/site-web/site-web').then((m) => ({
    default: m.SiteWeb,
  }))
);

export function SiteWebPage() {
  return <SiteWeb />;
}
