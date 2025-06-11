import LayoutApp from '@/components/layout/app/layout-app.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { observer } from 'mobx-react-lite';
import BlogCard from '@/features/blogs/components/app/blog-card.tsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Blog = observer(() => {
  const { blogStore } = useStores();

  if (blogStore.blogs.length === 0) return null;

  return (
    <LayoutApp title={'Blog'} background={'#fff5e6'}>
      <div className="relative" data-aos="fade-up" data-aos-delay="350">
        <button
          className="swiper-button-prev-blog absolute top-1/2 -left-6 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
          aria-label="Précédent"
          style={{ left: '-40px' }}
        >
          <ChevronLeft />
        </button>

        <button
          className="swiper-button-next-blog absolute top-1/2 -right-6 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
          aria-label="Suivant"
          style={{ right: '-40px' }}
        >
          <ChevronRight />
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.swiper-button-next-blog',
            prevEl: '.swiper-button-prev-blog'
          }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1100: { slidesPerView: 3 }
          }}
        >
          {[...blogStore.blogs].reverse().map((blog) => {
            if (!blog.published) return null;
            return (
              <SwiperSlide key={blog.id}>
                <div
                  className="md:p-4 lg:p-6"
                  data-aos="fade-up"
                  data-aos-delay="350"
                >
                  <BlogCard blog={blog} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </LayoutApp>
  );
});
