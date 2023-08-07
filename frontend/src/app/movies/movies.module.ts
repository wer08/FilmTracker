import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MovieListComponent
  ]
})
export class MoviesModule { }
