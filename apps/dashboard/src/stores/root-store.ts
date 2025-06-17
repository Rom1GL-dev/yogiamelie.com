import { AuthStore } from './auth-store';
import { EventStore } from '@/stores/events-store.ts';
import { UserStore } from '@/stores/users-store.ts';
import { BlogStore } from '@/stores/blogs-store.tsx';
import { LinksStore } from '@/stores/links-store.tsx';
import { SiteWebStore } from '@/stores/site-web-store.ts';
import { LocationStore } from '@/stores/location-store.ts';
import { PricesStore } from '@/stores/prices-store.ts';

export class RootStore {
  authStore: AuthStore;
  eventStore: EventStore;
  userStore: UserStore;
  blogStore: BlogStore;
  linkStore: LinksStore;
  siteWebStore: SiteWebStore;
  locationStore: LocationStore;
  priceStore: PricesStore;
  constructor() {
    this.authStore = new AuthStore();
    this.eventStore = new EventStore();
    this.userStore = new UserStore();
    this.blogStore = new BlogStore();
    this.linkStore = new LinksStore();
    this.siteWebStore = new SiteWebStore();
    this.locationStore = new LocationStore();
    this.priceStore = new PricesStore();
  }
}
