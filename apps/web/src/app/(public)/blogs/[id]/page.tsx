import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/lib/get-query-client';
import BlogDetails from '@/features/blog/blog-details';
import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${API_URL}/v1/blogs`);
  const data = await res.json();
  const blogs = data.blogs ?? [];
  const blog = blogs.find((b: any) => id === b.id || id.endsWith(b.id));

  return {
    title: blog?.title || 'Blog',
    description: blog?.subtitle || 'Article du blog Kesharini Yoga sur la pratique du yoga et le bien-être.',
    openGraph: {
      title: blog ? `${blog.title} | Kesharini Yoga` : 'Blog | Kesharini Yoga',
      description: blog?.subtitle || 'Article du blog Kesharini Yoga.',
      type: 'article',
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();

  const blogs = await queryClient.fetchQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/v1/blogs`);
      const data = await res.json();
      return data.blogs ?? [];
    },
  });

  const blog = blogs.find((b: any) => id === b.id || id.endsWith(b.id));

  if (!blog) {
    redirect('/blogs');
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetails blog={blog} />
    </HydrationBoundary>
  );
}
