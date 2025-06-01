import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Famous {
  id?: string;
  nombre: string;
  categoria: 'ARTISTA' | 'DEPORTISTA' | 'POLITICO' | 'CIENTIFICO' | 'OTRO';
  ciudad_nacimiento_id: string;
  ciudad_fama_id: string;
  biografia?: string;
  avatar_url?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FamousService {
  private apiUrl = `${environment.apiUrl}/famosos`;

  constructor(private http: HttpClient) {}

  // Listar todos los personajes
  getAll(): Observable<Famous[]> {
    return this.http.get<Famous[]>(this.apiUrl);
  }

  // Obtener por ID
  getById(id: string): Observable<Famous> {
    return this.http.get<Famous>(`${this.apiUrl}/${id}`);
  }

  // Crear nuevo personaje
  create(data: Famous): Observable<Famous> {
    return this.http.post<Famous>(this.apiUrl, data);
  }

  // Actualizar
  update(id: string, data: Partial<Famous>): Observable<Famous> {
    return this.http.put<Famous>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
