import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import {UserData} from './user';
import {Film, FullFilm, UserReview} from './models';

export type CommentProcess = {
  comments: UserReview[];
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type FilmProcess = {
  isFilmsDataLoading: boolean;
  genre: string;
  filmsByGenre: Film[];
  films: Film[];
  genres: string[];
  film: FullFilm | null;
  similarFilms: Film[];
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
