import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User } from '../user/auth.service';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient, private readonly authService: AuthService) { }

  getMovies() {
    const options = {
      headers: {
        'X-RapidAPI-Key': environment.key,
        'X-RapidAPI-Host': environment.host
      }
    };

    return this.http.get<Response>(`${environment.publicApiUrl}/titles?limit=20`, options);
  }
  getMoviesNextPage(url: string) {
    const options = {
      headers: {
        'X-RapidAPI-Key': environment.key,
        'X-RapidAPI-Host': environment.host
      }
    };

    return this.http.get<Response>(`${environment.publicApiUrl}${url}&limit=20`, options);
  }

  addMoviesToWatched(movieId: string) {
    const id = JSON.parse(localStorage.getItem('user')!).id
    const body = 
      {
        id: movieId
      }

    return this.http.post<Movie>(`${environment.myApiUrl}/user/add-to-watched/${id}`, body)
    .pipe(
      switchMap(() => {
        return this.authService.loadUserInfo();
      }),
      tap((updatedUser) => {
        this.authService.saveUser(JSON.stringify(updatedUser));
      })
    );
  }

  addMoviesToWatch(movieId: string) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const body = 
      {
        id: movieId
      };
  
    return this.http.post<Movie>(`${environment.myApiUrl}/user/add-to-watch/${user.id}`, body)
      .pipe(
        switchMap(() => {
          return this.authService.loadUserInfo();
        }),
        tap((updatedUser) => {
          this.authService.saveUser(JSON.stringify(updatedUser));
        })
      );
  }
}

export interface Response{
  page: number,
  results: Movie[],
  next: string
}
export interface Movie{
  id: string
  primaryImage: { url: string}
  titleText: {text: string}
  releaseYear: {year: number}
}
