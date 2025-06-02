import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

const FAVORITES_KEY = 'favorite_sites';
const ROUTE_KEY = 'custom_route';

@Injectable({
  providedIn: 'root',
})


export class LocalDataService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  // FAVORITOS
  async getFavorites(): Promise<string[]> {
    return (await this._storage?.get(FAVORITES_KEY)) || [];
  }

  async toggleFavorite(siteId: string): Promise<void> {
    const favs = await this.getFavorites();
    const index = favs.indexOf(siteId);
    if (index > -1) {
      favs.splice(index, 1);
    } else {
      favs.push(siteId);
    }
    await this._storage?.set(FAVORITES_KEY, favs);
  }

  async isFavorite(siteId: string): Promise<boolean> {
    const favs = await this.getFavorites();
    return favs.includes(siteId);
  }

  // RUTA PERSONALIZADA
  async setRoute(siteIds: string[]): Promise<void> {
    await this._storage?.set(ROUTE_KEY, siteIds);
  }

  async getRoute(): Promise<string[]> {
    return (await this._storage?.get(ROUTE_KEY)) || [];
  }

  async clearRoute(): Promise<void> {
    await this._storage?.remove(ROUTE_KEY);
  }
}
