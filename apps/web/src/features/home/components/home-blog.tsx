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
          <CarouselContent className="-ml-6">
            {publishedBlogs.map((blog) => (
              <CarouselItem key={blog.id} className="pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <BlogCard blog={blog} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="static bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80" />
            <CarouselNext className="static bg-white/60 backdrop-blur-sm rounded-full hover:bg-white/80" />
          </div>
        </Carousel>
      </div>
    </SectionLayout>
  );
}
