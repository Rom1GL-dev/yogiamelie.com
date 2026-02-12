import Title from '@/components/ux/title';
import { LoadingCard } from '@/features/blog/components/loading-card';
import React from 'react';

export function LoadingBlogs() {
  return (
    <div className="p-10">
      <Title title="Blogs" />
      <div
        className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    </div>
  );
}
