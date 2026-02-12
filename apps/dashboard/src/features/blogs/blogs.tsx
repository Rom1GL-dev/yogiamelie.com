import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/lib/api';
import { DataTable } from '@/components/data-table/data-table';
import BlogProvider from './context/blog-provider';
import { blogColumns } from './components/blog-columns';
import { BlogListingToolbar } from './components/blog-listing-toolbar';
import { BlogDialogs } from './components/blog-dialogs';

export type Blog = {
  id: string;
  title: string;
  subtitle: string | null;
  description: string;
  image: string;
  published: boolean;
  createdAt: string;
};

export function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/v1/blogs');
      setBlogs(res.data.blogs ?? []);
    } catch {
      toast.error('Erreur lors du chargement des blogs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-8 animate-spin rounded-full border-4 border-[#e8ede9] border-t-[#667467]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#667467]">Blogs</h1>
        <p className="text-muted-foreground">Gérez vos articles de blog.</p>
      </div>

      <BlogProvider>
        <DataTable
          columns={blogColumns}
          data={blogs}
          Toolbar={BlogListingToolbar}
        />
        <BlogDialogs onSuccess={fetchBlogs} />
      </BlogProvider>
    </div>
  );
}
