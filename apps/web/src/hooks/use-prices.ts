'use client';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';

export type Price = {
  id: string;
  label: string;
  number: string;
  extra: string;
  price: string;
  info: string;
  createdAt: string;
  updatedAt: string;
};

export function usePrices() {
  return useQuery<Price[], Error>({
    queryKey: ['prices'],
    queryFn: async () => {
      const res = await fetcher.get<{ prices: Price[] }>('/v1/prices');
      return res.prices ?? [];
    }
  });
}
