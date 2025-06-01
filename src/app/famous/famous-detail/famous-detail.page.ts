import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-famous-detail',
  templateUrl: './famous-detail.page.html',
  styleUrls: ['./famous-detail.page.scss'],
  standalone: false
})
export class FamousDetailPage implements OnInit {

  private api = `${environment.apiUrl}/sitios`;

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
  }

}
