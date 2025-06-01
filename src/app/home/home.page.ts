import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  user: AppUser | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const token = await this.authService.getToken();
    // En este punto podrías llamar a /usuarios/me para obtener los datos del perfil
    // Aquí simulo un usuario si no tienes esa ruta aún:
    this.user = {
      nombre: 'Usuario',
      email: 'demo@email.com',
      role: 'USER'
    };
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}