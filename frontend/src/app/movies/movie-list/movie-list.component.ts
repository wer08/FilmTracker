import { Component, OnInit } from '@angular/core'
import { Movie, MovieService, Response } from '../movie.service';
import { Observable, combineLatest, map, of, switchMap } from 'rxjs';
import { AuthService, User } from 'src/app/user/auth.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent{


  constructor(private movieService: MovieService, private readonly authService: AuthService) { }
  searchQueryTitle: string = '';
  searchQueryKeyword: string = '';

  movies$ = combineLatest([
    this.movieService.getMovies(),
    this.authService.loadUserInfo()
  ]).pipe(
    switchMap(([response, client]) => {
      const clientObject = JSON.parse(this.authService.extractUser(client))
      const modifiedResults = this.mapMoviesWithWatchInfo(response.results, clientObject);
      return of({ ...response, results: modifiedResults });
    })
  );
  
  nextPageUrl$ = this.movies$.pipe(map(response => response.next))
  
  private mapMoviesWithWatchInfo(movies: Movie[], client: User): MovieWithWatchInfo[] {
    return movies.map(movie => ({
      ...movie,
      isInWatched: this.movieService.isMovieInWatched(client, movie),
      isInToWatch: this.movieService.isMovieInToWatch(client, movie)
    }));
  }

  performSearchByKeyword() {
    const url = this.searchQueryKeyword.trim().length > 0 ? `/titles/search/keyword/${this.searchQueryKeyword}` : `/titles?limit=20&startYear=1970&endYear=2023`
    this.movies$ = this.movieService.getMoviesNextPage(url).pipe(
      switchMap(response => {
        return this.authService.loadUserInfo().pipe(
          map(client => {
            const clientObject = JSON.parse(this.authService.extractUser(client))
            const modifiedResults = this.mapMoviesWithWatchInfo(response.results, clientObject);
            return { ...response, results: modifiedResults };
          })
        );
      })
    );
  }

  performSearchByTitle() {
    const url = this.searchQueryTitle.trim().length > 0 ? `/titles/search/title/${this.searchQueryTitle}` : `/titles?limit=20&startYear=1970&endYear=2023`
    this.movies$ = this.movieService.getMoviesNextPage(url).pipe(
      switchMap(response => {
        return this.authService.loadUserInfo().pipe(
          map(client => {
            const clientObject = JSON.parse(this.authService.extractUser(client))
            const modifiedResults = this.mapMoviesWithWatchInfo(response.results, clientObject);
            return { ...response, results: modifiedResults };
          })
        );
      })
    );
  }

  fetchNextPage(nextPageUrl: string): void {
    this.movies$ = this.movieService.getMoviesNextPage(nextPageUrl).pipe(
      switchMap(response => {
        return this.authService.loadUserInfo().pipe(
          map(client => {
            const clientObject = JSON.parse(this.authService.extractUser(client))
            const modifiedResults = this.mapMoviesWithWatchInfo(response.results, clientObject);
            return { ...response, results: modifiedResults };
          })
        );
      })
    );
  
    this.nextPageUrl$ = this.movies$.pipe(map(response => response.next))
  }
}
export interface MovieWithWatchInfo extends Movie {
  isInWatched: boolean;
  isInToWatch: boolean;
}
