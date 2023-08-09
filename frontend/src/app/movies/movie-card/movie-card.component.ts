import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie, MovieService } from '../movie.service';
import { Observable } from 'rxjs';
import { MovieWithWatchInfo } from '../movie-list/movie-list.component';
import { AuthService } from 'src/app/user/auth.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie!: MovieWithWatchInfo
  @Input() inList!: boolean
  @Input() watched!: boolean

  present: boolean = true;
  movie$: Observable<MovieWithWatchInfo> | null = null
  constructor(private readonly service: MovieService, private readonly authService:AuthService, private readonly snackBar: MatSnackBar) { }

  isLoggedIn$ = this.authService.isLoggedIn$()

  addToWatchList() {
    this.movie$ = this.service.addMoviesToWatch(this.movie.id)
    this.movie.isInToWatch = true;
    this.snackBar.open(`${this.movie.titleText.text} added to toWatch list`, 'Close', {
      duration: 5000,
      verticalPosition: 'top' as MatSnackBarVerticalPosition
    })
  }
  addToWatchedList() {
    this.movie$ = this.service.addMoviesToWatched(this.movie.id)
    this.movie.isInWatched = true
    this.snackBar.open(`${this.movie.titleText.text} added to watched list`, 'Close', {
      duration: 5000,
      verticalPosition: 'top' as MatSnackBarVerticalPosition
    })
  }
  deleteFromList() {
    let deleteObservable: Observable<any>;
  
    if (this.watched) {
      deleteObservable = this.service.deleteMovieWatchedList(this.movie.id);
    } else {
      deleteObservable = this.service.deleteMovieFromToWatchList(this.movie.id);
    }
  
    deleteObservable.subscribe(
      () => {
        this.present = false; // Only set present to false if deletion is successful
      },
      error => {
        console.error('Error deleting movie:', error);
      }
    );
  }
}
