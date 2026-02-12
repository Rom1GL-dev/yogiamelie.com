import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { Faq } from './faq';

const BASE_URL = '/v1/faqs';

export const useListFaqs = () => {
  return useQuery<Faq[], Error>({
    queryKey: ['faqs'],
    queryFn: async () => {
      const res = await fetcher.get<{ faqs: Faq[] }>(BASE_URL);
      return res.faqs;
    }
  });
};
