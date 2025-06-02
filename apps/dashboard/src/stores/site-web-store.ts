import { makeAutoObservable, runInAction } from 'mobx';
import { SITE_WEB_TYPE } from '@/features/site-web/site-web.type.ts';
import { getBySection } from '@/features/site-web/api/get-by-section.ts';

export class SiteWebStore {
  details: Record<string, any> = {}; // ✅ chaque section est une clé avec ses données
  loaded = false;

  selectedType: string =
    localStorage.getItem('siteWebParametreType') ||
    SITE_WEB_TYPE.PAGE_PRINCIPAL;

  constructor() {
    makeAutoObservable(this);
    void this.onInit(this.selectedType);
  }

  get siteWebParametreType() {
    return [
      { key: SITE_WEB_TYPE.PAGE_PRINCIPAL, label: 'Page Principale' },
      { key: SITE_WEB_TYPE.PAGE_COURS, label: 'Page Cours' }
    ];
  }

  setSelectedType(type: string) {
    this.selectedType = type;
    localStorage.setItem('siteWebParametreType', type);
    void this.onInit(type);
  }

  async onInit(section: string) {
    runInAction(() => {
      this.loaded = false;
    });

    try {
      const data = await getBySection(section);
      runInAction(() => {
        this.details[section] = data || {};
        this.loaded = true;
      });
    } catch (error) {
      console.error('Erreur lors du chargement des données :', error);
      runInAction(() => {
        this.details[section] = {};
        this.loaded = true;
      });
    }
  }

  getDetailsBySection(section: string) {
    return this.details[section] || {};
  }
}

export const siteWebStore = new SiteWebStore();
