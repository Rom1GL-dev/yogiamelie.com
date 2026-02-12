'use client';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

export type Event = {
  id: string;
  title: string;
  subtitle: string;
  startDate: string;
  startHour: string;
  endDate: string;
  endHour: string;
  description: string;
  image: string;
  linkRegister: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export function useEvents() {
  return useQuery<Event[], Error>({
    queryKey: ['events'],
    queryFn: async () => {
      const res = await fetcher.get<{ events: Event[] }>('/v1/events');
      return res.events ?? [];
    }
  });
}
