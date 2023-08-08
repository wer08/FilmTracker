import { Component, Input } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: Movie
  movie$: Observable<Movie> | null = null
  constructor(private readonly service: MovieService) { }
  addToWatchList() {
    this.movie$ = this.service.addMoviesToWatch(this.movie.id)
  }
  addToWatchedList() {
    this.movie$ = this.service.addMoviesToWatched(this.movie.id)
  }
}
