import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

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
