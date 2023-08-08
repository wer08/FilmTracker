import { Component } from '@angular/core';
import { AuthService, RegisterData } from '../auth.service';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterData = { firstName: '', lastName: '', username: '', email: '', password: '' };
  token$: Observable<string> | null =null;

  constructor(private authService: AuthService) {}

  register() {
    this.token$ = this.authService.register(this.registerData)
  }
}
