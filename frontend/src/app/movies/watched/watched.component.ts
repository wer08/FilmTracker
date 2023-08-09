import { Component } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { Movie, MovieService } from '../movie.service';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { MovieWithWatchInfo } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent {
  movies$: Observable<MovieWithWatchInfo[]> | undefined;
  constructor(private readonly userService: UserService, private readonly route: ActivatedRoute, private readonly movieService: MovieService) { }
  ngOnInit(): void {
    this.movies$ = this.route.params.pipe(
      switchMap(params => this.userService.getMoviesWatched()),
      map(response => response.data.watchedList),
      switchMap(movieIds => this.movieService.getMovieDetails(movieIds).pipe(
        map(movies =>
          movies.map(movie => ({
            ...movie,
            isInToWatch: false,
            isInWatched: true
          })))
      ))
    )
  }
}
