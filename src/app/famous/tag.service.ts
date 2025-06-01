import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Tag {
  id?: string;
  user_id: string;
  famous_id: string;
  comentario?: string;
  foto_url?: string;
  created_at?: string;
  lat?: number;
  lng?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = `${environment.apiUrl}/tags`;

  constructor(private http: HttpClient) {}

  // Crear una nueva etiqueta (tag)
  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

  // Obtener todas las etiquetas
  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  // Obtener etiquetas de un personaje famoso específico
  getByFamousId(famousId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/famoso/${famousId}`);
  }

  // Obtener etiquetas de un usuario específico
  getByUserId(userId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  // Eliminar una etiqueta
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
