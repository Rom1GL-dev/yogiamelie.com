import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { MentionsLegales } from '@/features/mentions-legales/mentions-legales';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: 'Mentions légales - Kesharini Yoga',
  description:
    "Mentions légales du site yogiamelie.com. Informations sur l'éditeur, l'hébergement et la propriété intellectuelle.",
};

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['site-web', 'mentionsLegales'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/site-web/mentionsLegales`);
      const data = await res.json();
      return data.details ?? {};
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MentionsLegales />
    </HydrationBoundary>
  );
}
