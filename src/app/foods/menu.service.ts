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

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}/menus`;

  constructor(private http: HttpClient) {}

  // Obtener todos los registros del menú
  getAll(): Observable<MenuEntry[]> {
    return this.http.get<MenuEntry[]>(this.apiUrl);
  }

  // Obtener menú por ID
  getById(id: string): Observable<MenuEntry> {
    return this.http.get<MenuEntry>(`${this.apiUrl}/${id}`);
  }

  // Crear una entrada en el menú (solo admin)
  create(data: MenuEntry): Observable<MenuEntry> {
    return this.http.post<MenuEntry>(this.apiUrl, data);
  }

  // Actualizar el precio del plato en ese sitio
  update(id: string, data: Partial<MenuEntry>): Observable<MenuEntry> {
    return this.http.put<MenuEntry>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar una entrada de menú
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener todos los platos ofrecidos en un sitio
  getBySite(siteId: string): Observable<MenuEntry[]> {
    return this.http.get<MenuEntry[]>(`${this.apiUrl}/sitio/${siteId}`);
  }

  // Obtener todos los sitios que ofrecen un plato específico
  getByDish(dishId: string): Observable<MenuEntry[]> {
    return this.http.get<MenuEntry[]>(`${this.apiUrl}/plato/${dishId}`);
  }
}
