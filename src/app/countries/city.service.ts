import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface City {
  id?: string;
  name: string;
  population: number;
  country_id: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = `${environment.apiUrl}/ciudades`;

  constructor(private http: HttpClient) {}

  // Obtener todas las ciudades
  getAll(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  // Obtener ciudad por ID
  getById(id: string): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/${id}`);
  }

  // Crear ciudad
  create(data: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, data);
  }

  // Actualizar ciudad
  update(id: string, data: Partial<City>): Observable<City> {
    return this.http.put<City>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar ciudad
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
