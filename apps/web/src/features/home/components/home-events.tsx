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
          <CarouselContent className="-ml-4">
            {futureEvents.map((event) => (
              <CarouselItem key={event.id} className="pl-4 basis-[85%] sm:basis-1/2 lg:basis-1/3">
                <EventCard event={event} />
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
