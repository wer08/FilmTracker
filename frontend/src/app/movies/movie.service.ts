import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

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

  addMoviesToWatched(movie: Movie) {
    const id = JSON.parse(localStorage.getItem('user')!).id
    const body = 
      {
        movie: JSON.stringify(movie)
      }

    return this.http.post<Movie>(`${environment.myApiUrl}/user/add-to-watched/${id}`,body)
  }

  addMoviesToWatch(movie: Movie) {
    const id = JSON.parse(localStorage.getItem('user')!).id
    const body = 
      {
        movie: JSON.stringify(movie)
      }

    return this.http.post<Movie>(`${environment.myApiUrl}/user/add-to-watch/${id}`,body)
  }
}

export interface Response{
  page: number,
  results: Movie[],
  next: string
}
export interface Movie{
  primaryImage: { url: string}
  titleText: {text: string}
  releaseYear: {year: number}
}
