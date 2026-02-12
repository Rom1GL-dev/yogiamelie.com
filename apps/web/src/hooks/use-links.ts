'use client';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

export type Links = {
  youtube: string;
  instagram: string;
  tiktok: string;
  facebook: string;
};

export function useLinks() {
  return useQuery<Links, Error>({
    queryKey: ['links'],
    queryFn: async () => {
      const res = await fetcher.get<{ links: Links[] }>('/v1/links');
      return res.links?.[0] ?? { youtube: '', instagram: '', tiktok: '', facebook: '' };
    }
  });
}
