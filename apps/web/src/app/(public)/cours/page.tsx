import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { Cours } from '@/features/cours/cours';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: 'Cours de Yoga collectifs et individuels',
  description: 'Découvrez les cours de yoga proposés par Kesharini Yoga en Belgique. Hatha yoga, vinyasa, yoga doux. Tarifs, lieux, horaires et inscriptions.',
  openGraph: {
    title: 'Cours de Yoga | Kesharini Yoga',
    description: 'Cours de yoga collectifs et individuels en Belgique. Hatha yoga, vinyasa, yoga doux. Tarifs et inscriptions.',
    url: 'https://keshariniyoga.com/cours',
  },
};

async function prefetchSiteWeb(queryClient: any, section: string) {
  await queryClient.prefetchQuery({
    queryKey: ['site-web', section],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/site-web/${section}`);
      const data = await res.json();
      return data.details ?? {};
    },
  });
}

export default async function CoursPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['prices'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/prices`);
        const data = await res.json();
        return data.prices ?? [];
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['locations'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/location`);
        const data = await res.json();
        return data.locations ?? [];
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['faqs'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/faqs`);
        const data = await res.json();
        return data.faqs ?? [];
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['links'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/links`);
        const data = await res.json();
        return data.links?.[0] ?? { youtube: '', instagram: '', tiktok: '', facebook: '' };
      },
    }),
    prefetchSiteWeb(queryClient, 'coursPresentation'),
    prefetchSiteWeb(queryClient, 'coursBienvenue'),
    prefetchSiteWeb(queryClient, 'coursFaq'),
    prefetchSiteWeb(queryClient, 'tarifsCours'),
    prefetchSiteWeb(queryClient, 'coursMateriel'),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Cours />
    </HydrationBoundary>
  );
}
