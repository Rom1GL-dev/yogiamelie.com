import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { Home } from '@/features/home/home';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: 'Kesharini Yoga - Professeur de Yoga',
  description:
    "Kesharini Yoga, professeur de yoga certifiée. Accompagnement personnalisé pour une pratique du yoga adaptée, bien-être corporel, souplesse et sérénité intérieure.",
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
      queryKey: ['site-web', 'principalePresentation'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/site-web/principalePresentation`);
        const data = await res.json();
        return data.details ?? {};
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['site-web', 'principaleBienvenue'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/site-web/principaleBienvenue`);
        const data = await res.json();
        return data.details ?? {};
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ['site-web', 'principaleNewsletter'],
      queryFn: async () => {
        const res = await fetch(`${API_URL}/v1/site-web/principaleNewsletter`);
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
