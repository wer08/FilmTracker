import { Component } from '@angular/core';
import { AuthService, RegisterData } from '../auth.service';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterData = { firstName: '', lastName: '', username: '', email: '', password: '' };
  token$: Observable<string> | null =null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.token$ = this.authService.register(this.registerData).pipe(
      tap(() => this.router.navigate(['/login']))
    )
  }
}
