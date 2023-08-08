import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WatchedComponent } from './watched/watched.component';
import { ToWatchComponent } from './to-watch/to-watch.component';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieCardComponent,
    WatchedComponent,
    ToWatchComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  exports: [
    MovieListComponent,
    WatchedComponent,
    ToWatchComponent
  ]
})
export class MoviesModule { }
