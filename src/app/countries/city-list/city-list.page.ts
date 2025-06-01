import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.page.html',
  styleUrls: ['./city-list.page.scss'],
})
export class CityListPage implements OnInit {

  private api = `${environment.apiUrl}/ciudades`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.api);
  }

  getById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  ngOnInit() {
     this.getAll().subscribe({
    next: (response) => {
      console.log('Ciudades:', response);
    },
    error: (error) => {
      console.error('Error al obtener ciudades:', error);
    }
  });
  }

}
