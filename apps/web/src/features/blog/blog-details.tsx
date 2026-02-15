'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Blog } from '@/features/blog/usecases/list-blogs/blog';
import { appConfig } from '@/config/app.config';

interface Props {
  blog: Blog;
}

export default function BlogDetails({ blog }: Props) {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Top bar */}
      <div className="border-b border-[#353F34]/10 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center px-6 py-4">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-[#353F34]/70 transition-colors hover:text-[#353F34]"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            Retour
          </Link>
        </div>
      </div>

      {/* Hero section with warm brown background */}
      <div className="grain bg-[#3E2F25] px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-3xl">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10">
            <Image
              src={`${appConfig.apiUrl}/v1/images/blogs/${blog.image}`}
              alt={blog.title}
              className="w-full object-cover"
              width={1400}
              height={700}
              priority
            />
          </div>

          {/* Title */}
          <h1 className="mt-8 font-[Mistrully] text-3xl text-[#f0e6d8] md:mt-10 md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>
          {blog.subtitle && (
            <p className="mt-3 text-base font-light text-[#f0e6d8]/70 italic md:text-lg">
              {blog.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <article
          className="html-content max-w-none break-words text-base leading-[1.8] text-[#2d3640] md:text-[17px] [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#353F34] [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#353F34] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-1 [&_a]:text-[#c08562] [&_a]:underline [&_a]:underline-offset-2 [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-6 [&_img]:shadow-md [&_img]:h-auto"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />
      </div>
    </div>
  );
}
