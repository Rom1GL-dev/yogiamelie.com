import { formatDate, reformatForUrl } from '@/lib/utils.ts';
import { TEventModel } from '@/features/events/types/events.type.ts';
import { useNavigate } from 'react-router-dom';

interface EventProps {
  event: TEventModel;
}

export default function EventCard({ event }: EventProps) {
  const navigate = useNavigate();
  return (
    <div
      key={event.id}
      className={
        'mb-7 h-[300px] w-full cursor-pointer rounded-3xl bg-[#a9b394] text-white transition-all duration-300 hover:scale-101 md:h-[250px] lg:h-[350px]'
      }
      onClick={() => navigate(`/evenement/${reformatForUrl(event.title)}`)}
    >
      <img
        src={`http://localhost:3000/v1/images/events/${event.image}`}
        title={event.title}
        alt={event.title}
        className={'h-1/2 w-full rounded-3xl object-cover'}
      />
      <div className={'flex flex-1 flex-col justify-between p-3'}>
        <div>
          <p className={'text-md font-semibold'}>
            {formatDate(
              event.startDate,
              event.startHour,
              event.endDate,
              event.endHour
            )}
          </p>
          <p className={'text-md font-semibold'}>{event.location}</p>
        </div>
        <div className={'mt-3 flex flex-col items-center'}>
          <p className={'font-[Mistrully] text-3xl'}>{event.title}</p>
          <p className={'mt-2 font-light tracking-[0.06em]'}>
            {event.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
