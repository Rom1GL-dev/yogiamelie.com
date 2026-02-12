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
      className="mb-7 block h-full w-full cursor-pointer overflow-hidden rounded-3xl bg-[#a9b394] text-white transition-all duration-300 hover:scale-[1.01]"
    >
      <img
        src={`${appConfig.apiUrl}/v1/images/events/${event.image}`}
        title={event.title}
        alt={event.title}
        className="h-1/2 w-full rounded-3xl object-cover"
      />
      <div className="flex flex-1 flex-col items-center justify-between p-3 text-center">
        <div>
          <p className="text-md font-semibold">
            {formatDate(event.startDate, event.startHour, event.endDate, event.endHour)}
          </p>
          <p className="text-md font-semibold">{event.location}</p>
        </div>
        <div className="mt-3 flex flex-col items-center">
          <p className="font-[Mistrully] text-3xl">{event.title}</p>
          <p className="mt-2 font-light tracking-[0.06em]">{event.subtitle}</p>
        </div>
      </div>
    </Link>
  );
}
