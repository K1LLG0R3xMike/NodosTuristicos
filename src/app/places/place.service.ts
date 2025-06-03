import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Site {
  _id?: string; // <-- agrega esto
  id?: string;
  city_id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  qr_code: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  private apiUrl = `${environment.apiUrl}/sitios`;

  constructor(private http: HttpClient) {}

  // Obtener todos los sitios
  getAll(): Observable<Site[]> {
    return this.http.get<Site[]>(this.apiUrl);
  }

  // Obtener sitio por ID
  getById(id: string): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo sitio (solo admin)
  create(site: Site): Observable<Site> {
    return this.http.post<Site>(this.apiUrl, site);
  }

  // Actualizar sitio
  update(id: string, site: Partial<Site>): Observable<Site> {
    return this.http.put<Site>(`${this.apiUrl}/${id}`, site);
  }

  // Eliminar sitio
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Buscar sitio por código QR
  getByQrCode(code: string): Observable<Site> {
    return this.http.get<Site>(`${this.apiUrl}/qr/${code}`);
  }
}
