import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { Movie, MovieService } from '../movie.service';
import { MovieWithWatchInfo } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-to-watch',
  templateUrl: './to-watch.component.html',
  styleUrls: ['./to-watch.component.css']
})
export class ToWatchComponent implements OnInit{
  movies$: Observable<MovieWithWatchInfo[]> | undefined;
  constructor(private readonly userService: UserService, private readonly route: ActivatedRoute, private readonly movieService: MovieService) { }
  ngOnInit(): void {
    this.movies$ = this.route.params.pipe(
      switchMap(params => this.userService.getMoviesToWatch()),
      map(response => response.data.toWatchList),
      switchMap(movieIds => this.movieService.getMovieDetails(movieIds).pipe(
        map(movies =>
          movies.map(movie => ({
            ...movie,
            isInToWatch: true,
            isInWatched: false
          })))
      ))
    )
  }
  
}
