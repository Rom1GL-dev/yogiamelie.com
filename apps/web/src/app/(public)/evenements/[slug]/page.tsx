import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { EventDetail } from '@/features/events/event-detail';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(`${API_URL}/v1/events`);
  const data = await res.json();
  const events = data.events ?? [];
  const id = slug?.split('-').pop();
  const event = events.find((e: any) => e.id === id);

  return {
    title: event?.title || 'Événement',
    description: event?.subtitle || 'Événement yoga par Kesharini Yoga en Belgique. Ateliers, retraites et stages.',
    openGraph: {
      title: event ? `${event.title} | Kesharini Yoga` : 'Événement | Kesharini Yoga',
      description: event?.subtitle || 'Événement yoga par Kesharini Yoga.',
      type: 'article',
    },
  };
}

export default async function EventDetailPage({ params }: Props) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/events`);
      const data = await res.json();
      return data.events ?? [];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EventDetail />
    </HydrationBoundary>
  );
}
