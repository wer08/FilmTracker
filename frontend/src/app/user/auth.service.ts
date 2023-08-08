import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, firstValueFrom, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  

  constructor(private http: HttpClient) {
    this.isLoggedInSubject.next(this.isLoggedIn());
  }

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable().pipe(
      tap(value => console.log('isLoggedIn$ emitted:', value)))
  }

  register(registerData: RegisterData): Observable<any> {
    const url = `${environment.myApiUrl}/auth/signUp`;
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    return this.http.post(url, JSON.stringify(registerData), config).pipe(
      catchError((error) => {
        console.error('Error in registration:', error);
        throw error; // Re-throw the error to propagate it
      })
    );
  }
  extractToken(response: any): string {
    console.log(response)
    if (response && response.data && response.data.token) {
      return response.data.token;
    }
    return "";
  }
  extractUser(response: any): string {
    console.log(response)
    if (response && response.data && response.data.user) {
      return JSON.stringify(response.data.user);
    }
    return "";
  }

  
  
  // Login user and store token in local storage
  login(loginData: LoginData): Observable<any> {
    const url = `${environment.myApiUrl}/auth/login`;
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };
    return this.http.post(url, JSON.stringify(loginData), config).pipe(
      catchError((error) => {
        console.error('Error in login:', error);
        throw error; // Re-throw the error to propagate it
      })
    );
  }

  // Save token to local storage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(this.isLoggedIn());
  }
  saveUser(user: string): void {
    localStorage.setItem(this.userKey, user);
  }
  

  // Get stored token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Clear token from local storage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  clearUser(): void{
    localStorage.removeItem(this.userKey)
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Load user info using the token
  loadUserInfo(): Observable<any> {
    const url = `${environment.myApiUrl}/auth/loadUser`;
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(url, { headers });
  }

  logout(): void {
    this.clearToken();
    this.clearUser();
    this.isLoggedInSubject.next(false); // Update isLoggedInSubject
  }
}


export interface LoginData{
  username: string,
  password: string
}
export interface RegisterData{
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}
export interface User{
  username: string,
  email: string,
  toWatch: any[],
  watched: any[]
}
