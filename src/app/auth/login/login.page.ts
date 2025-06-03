import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: async (response: any) => {
          if (response && response.token) {
            await this.authService.setToken(response.token);
            const userData = {
              id: response.user.id,
              email: response.user.email,
              nombre: response.user.nombre,
              role: response.user.role || 'USER',
            };
            await this.authService.setUserData(userData);
            console.log('Login successful', userData);
            // Redirige según el rol
            if (userData.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          }
        },
        error: (error) => {
          console.error('Login failed', error);
        }
      });
    }
  }
}