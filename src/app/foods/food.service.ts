import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Dish {
  id?: string;
  city_id: string;
  name: string;
  descripcion?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = `${environment.apiUrl}/platos`;

  constructor(private http: HttpClient) {}

  // Obtener todos los platos
  getAll(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.apiUrl);
  }

  // Obtener plato por ID
  getById(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/${id}`);
  }

  // Crear plato (solo admin)
  create(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.apiUrl, dish);
  }

  // Actualizar plato
  update(id: string, data: Partial<Dish>): Observable<Dish> {
    return this.http.put<Dish>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar plato
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener platos por ciudad
  getByCity(cityId: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/ciudad/${cityId}`);
  }
}
