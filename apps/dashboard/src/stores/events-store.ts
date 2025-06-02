import { makeAutoObservable } from 'mobx';
import dayjs from 'dayjs';
import { normalizeString, reformatForUrl } from '@/lib/utils';
import { EVENT_TYPE, TEventModel } from '@/features/events/types/events.type';
import { getAllEvents } from '@/features/events/api/get-all-events';
import { getAllLocation } from '@/features/events/api/get-all-locations.ts';

export class EventStore {
  events: TEventModel[] = [];
  locations: { title: string; id: string }[] = [];
  selectedType: string = localStorage.getItem('eventType') || 'all';
  searchTerm: string = '';
  loaded = false;

  constructor() {
    makeAutoObservable(this);
    void this.onInit();
  }

  get today() {
    return dayjs();
  }

  get processedEvents() {
    return this.events.map((event) => {
      const start = dayjs(event.startDate);
      const end = dayjs(event.endDate);

      let type: EVENT_TYPE = EVENT_TYPE.FUTURE;

      if (end.isBefore(this.today, 'day')) {
        type = EVENT_TYPE.COMPLETED;
      } else if (
        (start.isBefore(this.today, 'day') && end.isAfter(this.today, 'day')) ||
        start.isSame(this.today, 'day') ||
        (start.isBefore(this.today) && end.isSame(this.today))
      ) {
        type = EVENT_TYPE.ON_GOING;
      }

      return { ...event, type };
    });
  }

  get filteredEvents() {
    return this.processedEvents.filter((event) => {
      const isTypeMatch =
        this.selectedType === EVENT_TYPE.ALL ||
        event.type === this.selectedType;
      const isSearchMatch =
        normalizeString(event.title).includes(
          normalizeString(this.searchTerm)
        ) ||
        (event.subtitle &&
          normalizeString(event.subtitle).includes(
            normalizeString(this.searchTerm)
          ));
      return isTypeMatch && isSearchMatch;
    });
  }

  get eventTypes() {
    return [
      {
        key: EVENT_TYPE.ALL,
        label: 'Tous',
        count: this.processedEvents.length
      },
      {
        key: EVENT_TYPE.FUTURE,
        label: 'Futur',
        count: this.processedEvents.filter((e) => e.type === EVENT_TYPE.FUTURE)
          .length
      },
      {
        key: EVENT_TYPE.ON_GOING,
        label: 'En cours',
        count: this.processedEvents.filter(
          (e) => e.type === EVENT_TYPE.ON_GOING
        ).length
      },
      {
        key: EVENT_TYPE.COMPLETED,
        label: 'Terminé',
        count: this.processedEvents.filter(
          (e) => e.type === EVENT_TYPE.COMPLETED
        ).length
      }
    ];
  }

  addEvent(event: TEventModel) {
    this.events.push(event);
  }

  removeEventById(id: string) {
    this.events = this.events.filter((event) => event.id !== id);
  }

  updateEventById(payload: TEventModel) {
    const index = this.events.findIndex((event) => event.id === payload.id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...payload };
    }
  }

  getEventByTitle(title: string) {
    return this.processedEvents.find(
      (event) => reformatForUrl(event.title) === reformatForUrl(title)
    );
  }

  setSelectedType(type: string) {
    this.selectedType = type;
    localStorage.setItem('eventType', type);
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
  }

  addLocation(title: string) {
    this.locations.push({ id: '', title: title });
  }

  removeLocation(title: string) {
    this.locations = this.locations.filter(
      (location) => location.title !== title
    );
  }

  async onInit() {
    const resEvents = await getAllEvents();
    this.events = resEvents.events;

    const resLocation = await getAllLocation();
    this.locations = resLocation.locations;
    this.loaded = true;
  }
}
