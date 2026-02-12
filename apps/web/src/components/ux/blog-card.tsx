'use client';
import Link from 'next/link';
import { appConfig } from '@/config/app.config';
import type { Blog } from '@/features/blog/usecases/list-blogs/blog';

function slugify(title: string, id: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${slug}-${id}`;
}

function stripHtml(html: string) {
  const withoutTags = html.replace(/<[^>]+>/g, '');
  const decoded = withoutTags.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return decoded.replace(/\s+/g, ' ').trim();
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${slugify(blog.title, blog.id)}`}
      className="mb-7 flex h-[300px] w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-[#a9b394] text-white transition-all duration-300 hover:scale-[1.01] md:h-[250px] lg:h-[350px]"
    >
      <img
        src={`${appConfig.apiUrl}/v1/images/blogs/${blog.image}`}
        alt={blog.title}
        title={blog.title}
        className="h-1/2 w-full rounded-t-3xl object-cover"
      />
      <div className="flex flex-1 flex-col justify-between px-3 py-2 lg:p-3">
        <div>
          <p className="text-md font-bold">{blog.title}</p>
          <p className="mt-1 font-bold tracking-[0.06em]">{blog.subtitle}</p>
          <p className="mt-3 line-clamp-1 font-light tracking-[0.06em] lg:line-clamp-2">
            {stripHtml(blog.description)}
          </p>
        </div>
        <div className="mt-2 flex justify-end">
          <span className="cursor-pointer rounded-md border border-black bg-[#eed7c1] px-2 py-1 text-black italic">
            Lire plus
          </span>
        </div>
      </div>
    </Link>
  );
}
