import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface AppUser {
  id?: string;
  nombre: string;
  email: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  // Obtener perfil del usuario autenticado
  getProfile(): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiUrl}/me`);
  }

  // Obtener todos los usuarios (solo admin)
  getAll(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.apiUrl);
  }

  // Obtener usuario por ID (admin)
  getById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.apiUrl}/${id}`);
  }

  // Eliminar usuario (admin)
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Actualizar perfil (nombre, email)
  updateProfile(data: Partial<AppUser>): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.apiUrl}/me`, data);
  }

  // Verifica si es admin (usando perfil o decodificando token)
  isAdmin(user: AppUser): boolean {
    return user.role === 'ADMIN';
  }
}
