import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { Home } from '@/features/home/home';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: {
    absolute: 'Kesharini Yoga - Amélie Vetcour | Cours de Yoga en Belgique'
  },
  description:
    'Kesharini Yoga par Amélie Vetcour, professeur de yoga certifiée en Belgique. Cours collectifs et individuels, hatha yoga, vinyasa, ateliers, événements et retraites. Retrouvez harmonie du corps et de l\'esprit.',
  openGraph: {
    title: 'Kesharini Yoga - Amélie Vetcour | Cours de Yoga en Belgique',
    description: 'Cours de yoga collectifs et individuels par Amélie Vetcour. Hatha yoga, vinyasa, ateliers et événements en Belgique.',
    url: 'https://keshariniyoga.com',
  },
};

export default async function Page() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['blogs'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/blogs`);
        const data = await res.json();
        return data.blogs ?? [];
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['events'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/events`);
        const data = await res.json();
        return data.events ?? [];
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
    queryClient.prefetchQuery({
      queryKey: ['site-web', 'presentation'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/site-web/presentation`);
        const data = await res.json();
        return data.details ?? {};
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['site-web', 'welcome'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/site-web/welcome`);
        const data = await res.json();
        return data.details ?? {};
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['site-web', 'newsletter'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/site-web/newsletter`);
        const data = await res.json();
        return data.details ?? {};
      },
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Home />
    </HydrationBoundary>
  );
}
