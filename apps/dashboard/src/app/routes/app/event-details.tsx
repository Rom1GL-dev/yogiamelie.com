import GoBackBanner from '@/components/app/go-back-banner.tsx';
import { useStores } from '@/providers/stores-provider.tsx';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { formatDate } from '@/lib/utils.ts';
import { apiUrl } from '@/config/content.config.ts';

export default function EventDetailsAppRoute() {
  const { eventStore } = useStores();
  const navigation = useNavigate();
  const { slug } = useParams();

  if (!slug) {
    navigation(APP_ROUTES.app.getHref());
    return null;
  }

  const event = eventStore.getEventByTitle(slug);
  if (!event) {
    navigation(APP_ROUTES.app.getHref());
    return null;
  }

  return (
    <div className={'min-h-screen w-full bg-[#fff5e6]'}>
      <GoBackBanner />
      <div className={'px-4 py-6 md:px-8 lg:px-32'}>
        <h1 className="mb-5 font-[Mistrully] text-4xl font-bold text-black md:text-5xl lg:text-6xl">
          {event?.title}
        </h1>
        <h2 className={'mb-2 text-lg font-bold md:text-xl'}>
          {formatDate(
            event.startDate,
            event.startHour,
            event.endDate,
            event.endHour
          )}
        </h2>
        <div className={'grid grid-cols-1 gap-x-10 md:grid-cols-3'}>
          <div className={'col-span-2'}>
            <h2 className={'mb-5 text-lg font-bold md:text-xl'}>
              {event.location}
            </h2>
            {event.subtitle && (
              <h2 className={'mb-5 text-lg font-bold md:text-xl'}>
                {event.subtitle}
              </h2>
            )}
            <div
              dangerouslySetInnerHTML={{ __html: event.description || '' }}
              className="mb-5 text-base md:text-lg"
            />
            {event.linkRegister && (
              <div className={'flex items-center justify-center'}>
                <Link
                  to={event.linkRegister}
                  className={
                    'mb-10 rounded-lg border bg-[#eed7c1] p-3 px-6 text-base md:mb-0 md:p-4 md:px-10 md:text-lg'
                  }
                >
                  Réserve ta place
                </Link>
              </div>
            )}
          </div>
          <div className={'flex justify-center md:block'}>
            <img
              src={`${apiUrl}/v1/images/events/${event.image}`}
              alt={event.title}
              className="h-auto max-h-[300px] w-full rounded-3xl object-cover md:h-[400px] md:w-[400px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
