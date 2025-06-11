import { makeAutoObservable } from 'mobx';
import { TLocationModel } from '@/features/locations/types/location.type.ts';
import { reformatForUrl } from '@/lib/utils.ts';
import { getAllLocations } from '@/features/locations/api/get-all-locations.tsx';

export class LocationStore {
  locations: TLocationModel[] = [];
  loaded = false;

  constructor() {
    makeAutoObservable(this);
    void this.onInit();
  }

  getLocationByTitle(title: string) {
    return this.locations.find(
      (user) => reformatForUrl(user.title) === reformatForUrl(title)
    );
  }

  addLocation(location: TLocationModel) {
    this.locations.push(location);
  }

  removeLocationById(id: string) {
    this.locations = this.locations.filter((user) => user.id !== id);
  }

  async onInit() {
    const res = await getAllLocations();
    this.locations = res.locations;
    this.loaded = true;
  }

  updateLocationById(payload: TLocationModel) {
    const index = this.locations.findIndex(
      (location) => location.id === payload.id
    );
    if (index !== -1) {
      this.locations[index] = { ...this.locations[index], ...payload };
    }
  }
}
