import { Blog } from '@/features/blog/usecases/list-blogs/blog';

export const getBlogType = (blogs: Blog[]) => [
  {
    key: 'all',
    label: 'Tous',
    count: blogs ? blogs.length : 0
  },
  {
    key: 'published',
    label: 'Publié',
    count: blogs ? blogs.filter((b) => b.published).length : 0
  },
  {
    key: 'unpublished',
    label: 'Non publié',
    count: blogs ? blogs.filter((b) => !b.published).length : 0
  }
];
