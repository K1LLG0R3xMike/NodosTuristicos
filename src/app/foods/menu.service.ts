import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface MenuEntry {
  id?: string;
  site_id: string;
  dish_id: string;
  valor_plato: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteInfo {
  site: {
    name: string;
    type: string;
    lat: number;
    lng: number;
    qr_code: string;
    id: string;
  };
  precio: number;
}

export interface DishInfo {
  name: string;
  description: string;
  id: string;
}

export interface DishSitesResponse {
  dish: DishInfo;
  sites: SiteInfo[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/menus`;

  constructor(private http: HttpClient) {}

  // Métodos existentes...
  getAll(): Observable<MenuEntry[]> {
    return this.http.get<MenuEntry[]>(this.apiUrl);
  }

  getById(id: string): Observable<MenuEntry> {
    return this.http.get<MenuEntry>(`${this.apiUrl}/${id}`);
  }

  create(data: MenuEntry): Observable<MenuEntry> {
    return this.http.post<MenuEntry>(this.apiUrl, data);
  }

  update(id: string, data: Partial<MenuEntry>): Observable<MenuEntry> {
    return this.http.put<MenuEntry>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getBySite(siteId: string): Observable<MenuEntry[]> {
    return this.http.get<MenuEntry[]>(`${this.apiUrl}/sitio/${siteId}`);
  }

  // Método actualizado
  getByDish(dishId: string): Observable<DishSitesResponse> {
    return this.http.get<DishSitesResponse>(`${this.apiUrl}/plato/${dishId}`);
  }
}