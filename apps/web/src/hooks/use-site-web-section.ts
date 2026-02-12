'use client';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

export function useSiteWebSection(section: string) {
  return useQuery({
    queryKey: ['site-web', section],
    queryFn: async () => {
      const res = await fetcher.get<{ section: string; details: Record<string, string> }>(`/v1/site-web/${section}`);
      return res.details ?? {};
    },
    staleTime: 1000 * 60 * 5
  });
}
