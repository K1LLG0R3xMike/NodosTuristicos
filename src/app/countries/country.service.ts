import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Country {
  id?: string;
  name: string;
  iso: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = `${environment.apiUrl}/paises`;

  constructor(private http: HttpClient) {}

  // Obtener todos los países
  getAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl);
  }

  // Obtener país por ID
  getById(id: string): Observable<Country> {
    return this.http.get<Country>(`${this.apiUrl}/${id}`);
  }

  // Crear país
  create(data: Country): Observable<Country> {
    return this.http.post<Country>(this.apiUrl, data);
  }

  // Actualizar país
  update(id: string, data: Partial<Country>): Observable<Country> {
    return this.http.put<Country>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar país
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
