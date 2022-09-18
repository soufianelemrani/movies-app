import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>('assets/response.json').pipe(shareReplay());
  }
  getEnglish() {
    return this.http.get('assets/language/eng.json').pipe(shareReplay());
  }
  getFrench() {
    return this.http.get('assets/language/fr.json').pipe(shareReplay());
  }
}
