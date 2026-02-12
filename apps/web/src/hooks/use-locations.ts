'use client';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

export type Location = {
  id: string;
  title: string;
  subtitle: string;
  lieu: string;
  parking: string;
  planning: string;
  image: string;
  published: boolean;
  buttonText: string;
  buttonLink: string;
  createdAt: string;
  updatedAt: string;
};

export function useLocations() {
  return useQuery<Location[], Error>({
    queryKey: ['locations'],
    queryFn: async () => {
      const res = await fetcher.get<{ locations: Location[] }>('/v1/location');
      return res.locations ?? [];
    }
  });
}
