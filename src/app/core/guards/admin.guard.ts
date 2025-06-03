import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.auth.getUserData(); // Usa getUserData()
    if (user && user.role === 'ADMIN') {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}