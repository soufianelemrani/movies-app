import { FormControl, Validators } from '@angular/forms';
import { Movie } from '../movies/movie.model';

export const isAdult = (movie: Movie) => {
  return movie.isAdult === '0' ? 'No' : 'Yes';
};

export const Genres = [
  'Documentary',
  'Short',
  'Animation',
  'Comedy',
  'Romance',
  'Sport',
  'News',
  'Drama',
  'Fantasy',
  'Horror',
  'Biography',
  'Music',
  'War',
  'Crime',
  'Western',
  'Family',
  'Adventure',
  'Action',
  'History',
  'Mystery',
  'Sci-Fi',
  'Musical',
  'Thriller',
];
