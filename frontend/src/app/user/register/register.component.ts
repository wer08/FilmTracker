
import { AuthService, RegisterData } from '../auth.service';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData: RegisterData = { firstName: '', lastName: '', username: '', email: '', password: '' };
  token$: Observable<string> | null = null;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private readonly formBuilder: FormBuilder, private readonly snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      this.token$ = this.authService.register(this.registerData).pipe(
        tap(() => this.router.navigate(['/login']))
      )
    } else {
      this.snackBar.open('Please enter correct data', 'Close', {
        duration: 5000,
        verticalPosition: 'top' as MatSnackBarVerticalPosition
      })

    }

  }
}
