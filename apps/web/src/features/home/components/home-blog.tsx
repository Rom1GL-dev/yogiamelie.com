'use client';
import SectionLayout from '@/components/ux/section-layout';
import BlogCard from '@/components/ux/blog-card';
import { useListBlogs } from '@/features/blog/usecases/list-blogs/use-list-blog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function HomeBlog() {
  const { data: blogs } = useListBlogs();

  const publishedBlogs = (blogs ?? [])
    .filter((b) => b.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (publishedBlogs.length === 0) return null;

  return (
    <SectionLayout title="Blog" background="#fff5e6">
      <div data-aos="fade-up" data-aos-delay="350">
        <Carousel opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent className="-ml-4">
            {publishedBlogs.map((blog) => (
              <CarouselItem key={blog.id} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <BlogCard blog={blog} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 lg:-left-12" />
          <CarouselNext className="-right-4 lg:-right-12" />
        </Carousel>
      </div>
    </SectionLayout>
  );
}
