import { lazy } from 'react';

const Blogs = lazy(() =>
  import('@/features/blogs/blogs').then((m) => ({
    default: m.Blogs,
  }))
);

export function BlogsPage() {
  return <Blogs />;
}
