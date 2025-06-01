import LayoutApp from '@/components/layout/app/layout-app.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { observer } from 'mobx-react-lite';
import EventCard from '@/features/events/components/app/event-card.tsx';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { EVENT_TYPE } from '@/features/events/types/events.type.ts';

export const JoinMe = observer(() => {
  const { eventStore } = useStores();

  if (eventStore.events.length === 0) return null;

  return (
    <LayoutApp title={'Rejoins-moi !'} background={'#d5ddcb'}>
      {
        <div className="relative" data-aos="fade-up" data-aos-delay="350">
          <button
            className="swiper-button-prev1 absolute top-1/2 -left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
            aria-label="Précédent"
            style={{ left: '-40px' }}
          ></button>

          <button
            className="swiper-button-next1 absolute top-1/2 -right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
            aria-label="Suivant"
            style={{ right: '-40px' }}
          ></button>

          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next1',
              prevEl: '.swiper-button-prev1'
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
            {eventStore.filteredEvents
              .filter(
                (event) =>
                  event.type === EVENT_TYPE.FUTURE ||
                  event.type === EVENT_TYPE.ON_GOING
              )
              .map((event) => (
                <SwiperSlide key={event.id}>
                  <div
                    className="md:p-4 lg:p-6"
                    data-aos="fade-up"
                    data-aos-delay="350"
                  >
                    <EventCard event={event} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      }
    </LayoutApp>
  );
});
