'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GoBackNavbar from '@/components/ux/go-back-navbar';
import { useEvents, type Event } from '@/hooks/use-events';
import { appConfig } from '@/config/app.config';

function formatDate(startDate: string, startHour: string, endDate: string, endHour: string) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  let str = start.toLocaleDateString('fr-FR', options);
  if (startHour) str += ` à ${startHour}`;
  if (end && end.getTime() !== start.getTime()) {
    str += ` - ${end.toLocaleDateString('fr-FR', options)}`;
    if (endHour) str += ` à ${endHour}`;
  } else if (endHour) {
    str += ` - ${endHour}`;
  }
  return str;
}

export const EventDetail = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#667467] border-t-transparent" />
      </div>
    );
  }

  // Extract ID from slug (last segment after last dash)
  const id = slug?.split('-').pop();
  const event = (events ?? []).find((e: Event) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen w-full bg-[#fff5e6]">
        <GoBackNavbar />
        <div className="mt-20 px-4 py-6 text-center md:px-8 lg:px-32">
          <h1 className="text-2xl">Événement introuvable</h1>
          <Link href="/" className="mt-4 inline-block text-[#667467] underline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fff5e6]">
      <GoBackNavbar />
      <div className="mt-16 px-4 py-6 md:px-8 lg:px-32">
        <h1 className="mb-5 font-[Mistrully] text-4xl font-bold text-black md:text-5xl lg:text-6xl">
          {event.title}
        </h1>
        <h2 className="mb-2 text-lg font-bold md:text-xl">
          {formatDate(event.startDate, event.startHour, event.endDate, event.endHour)}
        </h2>
        <div className="grid grid-cols-1 gap-x-10 md:grid-cols-3">
          <div className="col-span-2">
            <h2 className="mb-5 text-lg font-bold md:text-xl">{event.location}</h2>
            {event.subtitle && (
              <h2 className="mb-5 text-lg font-bold md:text-xl">{event.subtitle}</h2>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: event.description || '' }}
              className="html-content mb-5 text-base md:text-lg"
            />
            {event.linkRegister && (
              <div className="flex items-center justify-center">
                <Link
                  href={event.linkRegister}
                  className="mb-10 rounded-lg border bg-[#eed7c1] p-3 px-6 text-base md:mb-0 md:p-4 md:px-10 md:text-lg"
                >
                  Réserve ta place
                </Link>
              </div>
            )}
          </div>
          <div className="flex justify-center md:block">
            <img
              src={`${appConfig.apiUrl}/v1/images/events/${event.image}`}
              alt={event.title}
              className="h-auto max-h-[300px] w-full rounded-3xl object-cover md:h-[400px] md:w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
