import { Component, OnInit } from '@angular/core';
import { MovieService, Response } from '../movie.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent{


  constructor(private movieService: MovieService) { }


  movies$ = this.movieService.getMovies();
  nextPageUrl$ = this.movies$.pipe(map(response => response.next))
  



  fetchNextPage(nextPageUrl: string): void {
    console.log(nextPageUrl)
    this.movies$ = this.movieService.getMoviesNextPage(nextPageUrl)
    this.nextPageUrl$ = this.movies$.pipe(map(response => response.next))
  }
}
