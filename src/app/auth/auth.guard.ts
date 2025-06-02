import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const token = await this.authService.getToken();
    
    if (token) {
      return true; // Usuario autenticado, permitir acceso
    } else {
      // Usuario no autenticado, redirigir a login
      this.router.navigate(['/login']);
      return false;
    }
  }
}