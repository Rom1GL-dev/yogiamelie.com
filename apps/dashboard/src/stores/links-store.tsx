import { makeAutoObservable } from 'mobx';
import { getAllLinks } from '@/features/links/api/get-all-links.ts';
import { TLinkModel } from '@/features/links/types/links.type.ts';

export class LinksStore {
  links: TLinkModel = {};
  loaded = false;

  constructor() {
    makeAutoObservable(this);
    void this.onInit();
  }

  async onInit() {
    const res = await getAllLinks();
    this.links = res.links[0];
    this.loaded = true;
  }
}
