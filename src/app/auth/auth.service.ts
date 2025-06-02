import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.create();
  }

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.api}/login`, data);
  }

  register(data: any) {
    return this.http.post(`${this.api}/register`, data);
  }

  async setToken(token: string) {
    await this.storage.set('token', token);
  }

  async logout() {
    await this.storage.remove('token');
  }

  async getToken() {
    return await this.storage.get('token');
  }
}
