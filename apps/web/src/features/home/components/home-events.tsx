'use client';
import SectionLayout from '@/components/ux/section-layout';
import EventCard from '@/components/ux/event-card';
import { useEvents } from '@/hooks/use-events';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

export default function HomeEvents() {
  const { data: events } = useEvents();

  const futureEvents = (events ?? [])
    .filter((e) => new Date(e.startDate) >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  if (futureEvents.length === 0) return null;

  return (
    <SectionLayout title="Rejoins-moi !" background="#d5ddcb">
      <div data-aos="fade-up" data-aos-delay="350">
        <Carousel opts={{ align: 'start', loop: false }} className="w-full">
          <CarouselContent className="-ml-6">
            {futureEvents.map((event) => (
              <CarouselItem key={event.id} className="pl-6 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <EventCard event={event} />
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
