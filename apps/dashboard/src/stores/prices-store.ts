import { makeAutoObservable } from 'mobx';
import { TPriceModel } from '@/features/prices/types/location.type.ts';
import { getAllPrices } from '@/features/prices/api/get-all-prices.tsx';

export class PricesStore {
  prices: TPriceModel[] = [];
  loaded = false;

  constructor() {
    makeAutoObservable(this);
    void this.onInit();
  }

  getPriceById(id: string) {
    return this.prices.find((price) => price.id === id);
  }

  addPrice(price: TPriceModel) {
    this.prices.push(price);
  }

  removePriceById(id: string) {
    this.prices = this.prices.filter((user) => user.id !== id);
  }

  async onInit() {
    const res = await getAllPrices();
    this.prices = res.prices;
    this.loaded = true;
  }

  updatePriceById(payload: TPriceModel) {
    const index = this.prices.findIndex((price) => price.id === payload.id);
    if (index !== -1) {
      this.prices[index] = { ...this.prices[index], ...payload };
    }
  }
}
