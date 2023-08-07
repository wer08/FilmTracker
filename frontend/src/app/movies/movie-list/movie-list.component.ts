import { Component } from '@angular/core';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {


  constructor(private movieService: MovieService) { }
  
  movies$ = this.movieService.getMovies();
}
