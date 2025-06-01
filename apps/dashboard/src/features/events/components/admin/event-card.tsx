import {
  statusColor,
  StatusKey,
  statusText,
  TEventModel
} from '@/features/events/types/events.type.ts';
import { reformatForUrl } from '@/lib/utils.ts';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';
import dayjs from 'dayjs';

export const EventCard = ({ event }: { event: TEventModel }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const formattedTitle = reformatForUrl(event.title);
    navigate(APP_ROUTES.admin.events.path + '/' + formattedTitle);
  };

  return (
    <div
      className="flex cursor-pointer flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow-lg"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div
          className={`h-2 w-2 rounded-full ${statusColor[event.type as StatusKey] || 'bg-gray-400'}`}
        ></div>
        <div className="ml-2 text-sm text-slate-600">
          {statusText[event.type as StatusKey] || 'Évènement'}
        </div>
      </div>
      <div className="mt-2 text-lg font-semibold">{event.title}</div>
      {event.subtitle && (
        <div className="font-medium text-slate-500">{event.subtitle}</div>
      )}
      <div className="mt-4 text-sm text-slate-500">
        Date de début : {dayjs(event.startDate).format('DD/MM/YYYY')}
      </div>
      <div className="mt-1 text-sm text-slate-500">
        Date de fin : {dayjs(event.endDate).format('DD/MM/YYYY')}
      </div>
    </div>
  );
};
