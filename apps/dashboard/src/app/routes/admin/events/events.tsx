import { observer } from 'mobx-react-lite';
import { EventFilter } from '@/features/events/components/admin/event-filter.tsx';
import { EventCard } from '@/features/events/components/admin/event-card.tsx';
import LayoutAdmin from '@/components/layout/admin/layout-admin.tsx';
import { IconButton } from '@mui/material';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';
import { EventOption } from '@/features/events/components/admin/event-option.tsx';
import { APP_ROUTES } from '@/config/routes.config.ts';
import { Link } from 'react-router-dom';
import { useStores } from '@/providers/stores-provider.tsx';
import { clsx } from 'clsx';

export const EventsRoute = observer(() => {
  const [showOptions, setShowOptions] = useState(false);
  const { eventStore } = useStores();

  return (
    <LayoutAdmin
      title="Évènements"
      description={'Liste des évènements organisés selon leurs périodes.'}
      breadcrumbs={[
        {
          name: 'Évènements',
          href: APP_ROUTES.admin.events.getHref(),
          current: true
        }
      ]}
      button={
        <Link
          to={APP_ROUTES.admin.eventNew.getHref()}
          className={
            'cursor-pointer rounded-md border border-2 border-dashed border-slate-600 p-1 text-center text-sm text-slate-600 hover:border-slate-400 hover:bg-slate-200 md:p-2 md:text-left md:text-base'
          }
        >
          Nouvel Évènement
        </Link>
      }
    >
      <div className="mb-6 flex items-center justify-between">
        <EventFilter
          selectedType={eventStore.selectedType}
          eventTypes={eventStore.eventTypes}
          onSelect={eventStore.setSelectedType.bind(eventStore)}
        />
        <IconButton
          size={'small'}
          onClick={() => setShowOptions((prev) => !prev)}
        >
          {showOptions ? <FaChevronUp /> : <FaChevronDown />}
        </IconButton>
      </div>
      <EventOption open={showOptions} />
      <div
        className={clsx('grid grid-cols-1 gap-2 md:gap-5', {
          'lg:grid-cols-2 xl:grid-cols-3': eventStore.filteredEvents.length > 0
        })}
      >
        {eventStore.filteredEvents.length > 0 ? (
          eventStore.filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className={'mt-5 text-center'}>Aucun évènement trouvé.</div>
        )}
      </div>
    </LayoutAdmin>
  );
});
