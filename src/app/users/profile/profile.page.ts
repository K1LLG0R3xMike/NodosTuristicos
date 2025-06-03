import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  private api = `${environment.apiUrl}/sitios`;
  user: { nombre: string; email: string } = { nombre: 'Usuario', email: 'usuario@email.com' };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  getFirstName(): string {
    return this.user?.nombre?.split(' ')[0] || '';
  }

  ngOnInit() {
    // Aquí puedes cargar los datos reales del usuario si tienes un servicio de auth
    // this.user = this.authService.getCurrentUser();
  }

  getAll() {
    return this.http.get(this.api);
  }

  getById(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

}
