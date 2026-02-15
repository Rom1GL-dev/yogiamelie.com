import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import { Blogs } from '@/features/blog/blogs';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const metadata: Metadata = {
  title: 'Blog Yoga - Articles et conseils',
  description:
    'Articles et conseils en yoga par Amélie Vetcour. Découvrez des astuces pour une pratique épanouissante, le bien-être et un mode de vie sain.',
  openGraph: {
    title: 'Blog Yoga | Kesharini Yoga',
    description: 'Articles et conseils en yoga par Amélie Vetcour. Astuces pour une pratique épanouissante et un mode de vie sain.',
    url: 'https://keshariniyoga.com/blogs',
  },
};

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/blogs`);
      const data = await res.json();
      return data.blogs ?? [];
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Blogs />
    </HydrationBoundary>
  );
}
