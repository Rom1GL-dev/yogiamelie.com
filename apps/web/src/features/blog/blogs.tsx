'use client';
import SectionLayout from '@/components/ux/section-layout';
import BlogCard from '@/components/ux/blog-card';
import { useListBlogs } from '@/features/blog/usecases/list-blogs/use-list-blog';
import GoBackNavbar from '@/components/ux/go-back-navbar';
import { Calendar } from 'lucide-react';

export const Blogs = () => {
  const { data: blogs } = useListBlogs();

  const publishedBlogs = (blogs ?? [])
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="min-h-screen bg-[#fff5e6]">
      <GoBackNavbar />
      <div className="pt-16 p-10 px-9 md:px-20 lg:px-32">
        <h1
          className="mb-10 font-[Mistrully] text-4xl xl:text-5xl"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          Blog
        </h1>

        {publishedBlogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#a9b394]">
              <Calendar className="h-12 w-12 text-white" />
            </div>
            <p className="mb-2 text-xl font-semibold text-gray-700">
              Aucun blog disponible pour le moment
            </p>
            <p className="text-gray-500">
              Revenez bientôt pour découvrir nos nouveaux articles
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publishedBlogs.map((blog, index) => (
              <div
                key={blog.id}
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
