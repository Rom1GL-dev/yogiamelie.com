'use client';
import Link from 'next/link';
import { appConfig } from '@/config/app.config';
import type { Event } from '@/hooks/use-events';

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

function slugify(title: string, id: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `${slug}-${id}`;
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`/evenements/${slugify(event.title, event.id)}`}
      className="group relative mb-7 block h-[380px] w-full cursor-pointer overflow-hidden rounded-3xl card-hover"
    >
      <img
        src={`${appConfig.apiUrl}/v1/images/events/${event.image}`}
        title={event.title}
        alt={event.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#353F34]/90 via-[#353F34]/50 to-[#353F34]/10" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white drop-shadow-md">
        <p className="text-xs font-semibold uppercase tracking-widest [text-shadow:_0_1px_3px_rgb(0_0_0_/_60%)]">
          {formatDate(event.startDate, event.startHour, event.endDate, event.endHour)}
        </p>
        <p className="text-sm font-semibold [text-shadow:_0_1px_3px_rgb(0_0_0_/_60%)]">{event.location}</p>
        <p className="mt-2 font-[Mistrully] text-3xl [text-shadow:_0_2px_6px_rgb(0_0_0_/_50%)]">{event.title}</p>
        <p className="mt-1 font-light tracking-[0.06em] [text-shadow:_0_1px_3px_rgb(0_0_0_/_60%)]">{event.subtitle}</p>
      </div>
    </Link>
  );
}
