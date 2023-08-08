import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesModule } from './movies/movies.module';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ToWatchComponent } from './movies/to-watch/to-watch.component';
import { WatchedComponent } from './movies/watched/watched.component';


const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'watch-list', component: ToWatchComponent },
  { path: 'watched-list', component: WatchedComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
