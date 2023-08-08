import { Component } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private readonly authService: AuthService) { }
  isLoggedIn$ = this.authService.isLoggedIn$()
  
  logout() {
    this.authService.logout()
  }
}
