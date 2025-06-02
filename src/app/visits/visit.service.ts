import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Visit {
  _id?: string;
  user_id: string | {
    id: string;
    nombre: string;
    email: string;
  };
  site_id: string | {
    id: string;
    name: string;
  };
  fecha_visita: string;
  lat: number;
  lng: number;
  foto_url?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  private apiUrl = `${environment.apiUrl}/visitas`;

  constructor(private http: HttpClient) {}

  // Crear una visita
  create(visit: Visit): Observable<Visit> {
    return this.http.post<Visit>(this.apiUrl, visit);
  }

  createWithImage(visit: Visit, image: File): Observable<Visit> {
    const formData = new FormData();

    for (const key in visit) {
      const value = (visit as any)[key];
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    }

    if (image) {
      formData.append('foto', image);
    }

    return this.http.post<Visit>(this.apiUrl, formData);
  }

  // Obtener todas las visitas (admin o historial)
  getAll(): Observable<Visit[]> {
    return this.http.get<Visit[]>(this.apiUrl);
  }

  // Obtener visitas por usuario
  getByUser(userId: string): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  // Obtener visitas por sitio
  getBySite(siteId: string): Observable<Visit[]> {
    return this.http.get<Visit[]>(`${this.apiUrl}/sitio/${siteId}`);
  }

  // Eliminar visita (opcional)
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
