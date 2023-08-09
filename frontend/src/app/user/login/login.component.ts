import { Component } from '@angular/core';
import { AuthService, LoginData } from '../auth.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginData = { username: '', password: '' };
  user$: Observable<string> | null = null;

  constructor(private authService: AuthService, private readonly router: Router) {}

  login() {
    this.user$ = this.authService.login(this.loginData).pipe(
      tap(response => {
        const user = this.authService.extractUser(response);
        const token = this.authService.extractToken(response);

        this.authService.saveUser(user);
        this.authService.saveToken(token);

        // Navigate to the desired route after the login process
        this.router.navigate(['/']); // Navigation on success
      })
    );
  }
}
