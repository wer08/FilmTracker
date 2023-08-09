import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import { Observable } from 'rxjs';
import { MovieWithWatchInfo } from '../movie-list/movie-list.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: MovieWithWatchInfo

  movie$: Observable<MovieWithWatchInfo> | null = null
  constructor(private readonly service: MovieService) { }
  addToWatchList() {
    this.movie$ = this.service.addMoviesToWatch(this.movie.id)
    this.movie.isInToWatch = true;
  }
  addToWatchedList() {
    this.movie$ = this.service.addMoviesToWatched(this.movie.id)
    this.movie.isInWatched = true
  }
}
