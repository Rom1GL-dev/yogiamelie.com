import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import { Blog } from './blog';

const BASE_URL = '/v1/blogs';

export const useListBlogs = () => {
  return useQuery<Blog[], Error>({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetcher.get<{ blogs: Blog[] }>(BASE_URL);
      return res.blogs;
    }
  });
};
