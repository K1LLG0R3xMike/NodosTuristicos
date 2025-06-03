import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {

  private api = `${environment.apiUrl}/sitios`;
  user: AppUser | null = null;

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
   const userData = this.authService.getUserData();
    if (!userData || !userData.id) {
      // Redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de error
      this.router.navigate(['/login']);
      return;
    }
    // Cargar el perfil del usuario
    this.user = {
      id: userData.id,
      email: userData.email,
      nombre: userData.nombre,
      role: userData.role || 'USER',
    };
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
