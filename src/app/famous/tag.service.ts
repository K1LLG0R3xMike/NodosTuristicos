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

  // Método modificado para soportar subida de archivos
  create(tag: Tag, imageFile?: File | Blob): Observable<Tag> {
    // Si no hay imagen, usar el método HTTP regular
    if (!imageFile) {
      return this.http.post<Tag>(this.apiUrl, tag);
    }
    
    // Si hay imagen, usar FormData
    const formData = new FormData();
    
    // Añadir todos los campos del tag
    (Object.keys(tag) as (keyof Tag)[]).forEach(key => {
      if (tag[key] !== undefined && tag[key] !== null) {
        formData.append(key as string, tag[key]!.toString());
      }
    });
    
    // Añadir la imagen con nombre 'foto' (debe coincidir con el backend)
    formData.append('foto', imageFile, 'tag-photo.jpg');
    
    return this.http.post<Tag>(this.apiUrl, formData);
  }

  // Los otros métodos quedan igual
  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  getByFamousId(famousId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/famoso/${famousId}`);
  }

  getByUserId(userId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}