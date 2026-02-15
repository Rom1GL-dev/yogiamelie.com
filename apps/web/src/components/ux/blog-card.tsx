'use client';
import Link from 'next/link';
import { appConfig } from '@/config/app.config';
import type { Blog } from '@/features/blog/usecases/list-blogs/blog';

function slugify(title: string, id: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${slug}-${id}`;
}

function stripHtml(html: string) {
  const withSpaces = html.replace(/<[^>]+>/g, ' ');
  const decoded = withSpaces.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return decoded.replace(/\s+/g, ' ').trim();
}

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${slugify(blog.title, blog.id)}`}
      className="group mb-7 flex h-[300px] w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white/80 shadow-sm ring-1 ring-black/5 card-hover md:h-[250px] lg:h-[350px]"
    >
      <div className="relative h-1/2 overflow-hidden">
        <img
          src={`${appConfig.apiUrl}/v1/images/blogs/${blog.image}`}
          alt={blog.title}
          title={blog.title}
          className="h-full w-full rounded-t-3xl object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#353F34]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col justify-between px-3 py-2 lg:p-3">
        <div>
          <p className="text-md font-bold text-[#353F34]">{blog.title}</p>
          <p className="mt-1 font-bold tracking-[0.06em] text-[#58684E]">{blog.subtitle}</p>
          <p className="mt-3 line-clamp-1 font-light tracking-[0.06em] text-[#353F34]/70 lg:line-clamp-2">
            {stripHtml(blog.description)}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-end gap-1">
          <span className="cursor-pointer text-[#c08562] italic">
            Lire plus
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-4 w-4 text-[#c08562] transition-transform duration-300 group-hover:translate-x-1"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
