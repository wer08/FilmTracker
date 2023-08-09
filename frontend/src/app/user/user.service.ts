import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getMoviesWatched() {
    const id = JSON.parse(localStorage.getItem('user')!).id;
    const url = `${environment.myApiUrl}/user/get/${id}/watched`
    return this.http.get<any>(url);
  }

  getMoviesToWatch(): Observable<any> {
    const id = JSON.parse(localStorage.getItem('user')!).id;
    const url = `${environment.myApiUrl}/user/get/${id}/towatch`
    return this.http.get<any>(url);
  }



}
