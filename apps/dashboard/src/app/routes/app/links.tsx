import { lazy } from 'react';

const Links = lazy(() =>
  import('@/features/links/links').then((m) => ({
    default: m.Links,
  }))
);

export function LinksPage() {
  return <Links />;
}
