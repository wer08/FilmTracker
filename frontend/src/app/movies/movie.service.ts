import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiURL = 'https://moviesdatabase.p.rapidapi.com/titles';

  constructor(private http: HttpClient) { }

  getMovies() {
    const options = {
      headers: {
        'X-RapidAPI-Key': '191c82b600msh5f4e0ecae3616b3p14d0e6jsnabbf42c40f43',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
      }
    };

    return this.http.get<Response>(this.apiURL, options);
  }
}

interface Response{
  page: number,
  results: any[]
}
