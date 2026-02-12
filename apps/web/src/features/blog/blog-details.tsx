'use client';
import React from 'react';
import Image from 'next/image';
import GoBackNavbar from '@/components/ux/go-back-navbar';
import { Blog } from '@/features/blog/usecases/list-blogs/blog';
import { appConfig } from '@/config/app.config';

interface Props {
  blog: Blog;
}

export default function BlogDetails({ blog }: Props) {
  return (
    <div className="min-h-screen bg-[#d5ddcb]">
      <GoBackNavbar />

      <div className="relative">
        <Image
          src={`${appConfig.apiUrl}/v1/images/blogs/${blog.image}`}
          alt={blog.title}
          className="h-[50vh] w-full rounded-b-[20%] object-cover"
          width={1400}
          height={700}
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-10">
          <div className="rounded-xl bg-[rgba(255,245,230,0.5)] px-8 py-4 backdrop-blur-sm">
            <h1 className="text-center font-[Mistrully] text-3xl md:text-4xl lg:text-5xl text-[#353F34]">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="px-9 py-10 md:px-20 lg:px-32">
        {blog.subtitle && (
          <p className="mb-6 text-center text-lg text-[#58684E] italic">
            {blog.subtitle}
          </p>
        )}
        <div
          className="html-content max-w-none [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#58684E] [&_h2]:mb-4 [&_h2]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#58684E] [&_h3]:mb-3 [&_h3]:mt-6 [&_p]:mb-3 [&_p]:leading-relaxed [&_p]:text-[#353F34] [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_a]:text-[#58684E] [&_a]:underline [&_img]:rounded-lg [&_img]:my-4"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
}
