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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export const JoinMe = observer(() => {
  const { eventStore } = useStores();
  const [allEvents, setAllEvents] = useState<boolean>(false);
  if (eventStore.events.length === 0) return null;

  return (
    <LayoutApp title={'Rejoins-moi !'} background={'#d5ddcb'}>
      <div className="relative" data-aos="fade-up" data-aos-delay="350">
        {!allEvents && (
          <>
            <button
              className="swiper-button-prev-event absolute top-1/2 -left-6 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
              aria-label="Précédent"
              style={{ left: '-40px' }}
            >
              <ChevronLeft />
            </button>

            <button
              className="swiper-button-next-event absolute top-1/2 -right-6 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-white hover:bg-gray-400"
              aria-label="Suivant"
              style={{ right: '-40px' }}
            >
              <ChevronRight />
            </button>
          </>
        )}

        {allEvents ? (
          <div className={'grid grid-cols-3'}>
            {eventStore.filteredEvents
              .filter(
                (event) =>
                  event.type === EVENT_TYPE.FUTURE ||
                  event.type === EVENT_TYPE.ON_GOING
              )
              .sort(
                (a, b) =>
                  new Date(a.startDate).getTime() -
                  new Date(b.startDate).getTime()
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
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next-event',
              prevEl: '.swiper-button-prev-event'
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
              .sort(
                (a, b) =>
                  new Date(a.startDate).getTime() -
                  new Date(b.startDate).getTime()
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
        )}
        <div className="mt-4 flex justify-center">
          <button
            className="mt-5 cursor-pointer rounded-md border border-black bg-[#eed7c1] px-4 py-2 text-black hover:bg-[#e0c1aa]"
            onClick={() => setAllEvents(!allEvents)}
          >
            {allEvents ? 'Voir moins' : 'Voir plus'}
          </button>
        </div>
      </div>
    </LayoutApp>
  );
});
