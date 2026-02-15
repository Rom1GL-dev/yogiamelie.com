'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, MapPin, Clock } from 'lucide-react';
import GoBackNavbar from '@/components/ux/go-back-navbar';
import { useEvents, type Event } from '@/hooks/use-events';
import { appConfig } from '@/config/app.config';

function formatDateShort(startDate: string) {
  return new Date(startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatHours(startHour: string, endHour: string) {
  if (!startHour) return null;
  return endHour ? `${startHour} — ${endHour}` : startHour;
}

export const EventDetail = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const { data: events, isLoading } = useEvents();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#667467] border-t-transparent" />
      </div>
    );
  }

  const id = slug?.split('-').pop();
  const event = (events ?? []).find((e: Event) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen w-full bg-[#faf8f5]">
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

  const hours = formatHours(event.startHour, event.endHour);

  return (
    <div className="min-h-screen w-full bg-[#faf8f5]">
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

      {/* Hero section with green background */}
      <div className="grain bg-[#353F34] px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-14">
        <div className="mx-auto max-w-3xl">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-black/30 ring-1 ring-white/10">
            <img
              src={`${appConfig.apiUrl}/v1/images/events/${event.image}`}
              alt={event.title}
              className="w-full object-cover"
            />
          </div>

          {/* Title */}
          <h1 className="mt-8 font-[Mistrully] text-3xl text-[#d5ddcb] md:mt-10 md:text-4xl lg:text-5xl">
            {event.title}
          </h1>
          {event.subtitle && (
            <p className="mt-3 text-base font-light text-[#d5ddcb]/70 italic md:text-lg">
              {event.subtitle}
            </p>
          )}

          {/* Meta pills */}
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#d5ddcb]/90 backdrop-blur-sm">
              <CalendarDays size={14} className="text-[#c08562]" />
              {formatDateShort(event.startDate)}
            </div>
            {hours && (
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#d5ddcb]/90 backdrop-blur-sm">
                <Clock size={14} className="text-[#c08562]" />
                {hours}
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-[#d5ddcb]/90 backdrop-blur-sm">
                <MapPin size={14} className="text-[#c08562]" />
                {event.location}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10 md:py-16">
        <article
          dangerouslySetInnerHTML={{ __html: event.description || '' }}
          className="html-content max-w-none whitespace-pre-line break-words text-base leading-[1.8] text-[#2d3640] md:text-[17px] [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-[#353F34] [&_p]:mb-4 [&_img]:max-w-full [&_img]:rounded-xl [&_img]:my-6 [&_img]:shadow-md [&_img]:h-auto [&_a]:text-[#c08562] [&_a]:underline [&_a]:underline-offset-2"
        />

        {/* CTA */}
        {event.linkRegister && (
          <div className="mt-10 flex justify-center">
            <Link
              href={event.linkRegister}
              className="rounded-full bg-[#353F34] px-10 py-4 text-base font-medium text-white shadow-md transition-all duration-300 hover:bg-[#2a3229] hover:shadow-lg md:text-lg"
            >
              Réserve ta place
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
