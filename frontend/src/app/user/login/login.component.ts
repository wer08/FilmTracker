import { Component } from '@angular/core';
import { AuthService, LoginData } from '../auth.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData: LoginData = { username: '', password: '' };
  token$: Observable<string> | null =null;
  user$: Observable<string> | null = null;

  constructor(private authService: AuthService) {}

  login() {
    this.user$ = this.authService.login(this.loginData).pipe(
      map(response => this.authService.extractUser(response)),
      tap(user => console.log(user)),
      tap(user => this.authService.saveUser(user)),
    )
    this.token$ = this.authService.login(this.loginData).pipe(
      map(response => this.authService.extractToken(response)),
      tap(token => this.authService.saveToken(token))
    )
  }
}
