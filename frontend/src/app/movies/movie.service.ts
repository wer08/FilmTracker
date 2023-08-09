import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService, User } from '../user/auth.service';
import { Observable, forkJoin, map, switchMap, tap } from 'rxjs';

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

    return this.http.get<Response>(`${environment.publicApiUrl}/titles?limit=20&startYear=1970&endYear=2023`, options);
  }
  getMoviesNextPage(url: string) {
    const options = {
      headers: {
        'X-RapidAPI-Key': environment.key,
        'X-RapidAPI-Host': environment.host
      }
    };

    return this.http.get<Response>(`${environment.publicApiUrl}${url}`, options);
  }

  getMovieById(id: string) {
    const options = {
      headers: {
        'X-RapidAPI-Key': environment.key,
        'X-RapidAPI-Host': environment.host
      }
    };
    return this.http.get<any>(`${environment.publicApiUrl}/titles/${id}`, options).pipe(
      map(response => response.results)
    );
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
        this.authService.saveUser(this.authService.extractUser(updatedUser));
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
          this.authService.saveUser(this.authService.extractUser(updatedUser));
        })
      );
  }

  deleteMovieFromToWatchList(movieId: string){
    const user = JSON.parse(localStorage.getItem('user')!);
  
    return this.http.delete<Movie>(`${environment.myApiUrl}/user/remove-from-to-watch/${movieId}/${user.id}`)
      .pipe(
        switchMap(() => {
          return this.authService.loadUserInfo();
        }),
        tap((updatedUser) => {
          this.authService.saveUser(this.authService.extractUser(updatedUser));
        })
      );
  }
  deleteMovieWatchedList(movieId: string){
    const user = JSON.parse(localStorage.getItem('user')!);
  
    return this.http.delete<Movie>(`${environment.myApiUrl}/user/remove-from-watched/${movieId}/${user.id}`)
      .pipe(
        switchMap(() => {
          return this.authService.loadUserInfo();
        }),
        tap((updatedUser) => {
          this.authService.saveUser(this.authService.extractUser(updatedUser));
        })
      );
  }

  isMovieInWatched(client: User, movie: Movie): boolean {
    return client.watched.some(m => m === movie.id);

  }

  isMovieInToWatch(client: User, movie: Movie): boolean {

    return client.toWatch.some(m => m === movie.id);
  }

  

  getMovieDetails(movieIds: string[]): Observable<Movie[]> {
    const observables: Observable<Movie>[] = [];
    for (const movieId of movieIds) {
      observables.push(this.getMovieById(movieId))
    }

    return forkJoin(observables)
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
