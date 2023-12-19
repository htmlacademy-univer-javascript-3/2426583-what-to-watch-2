import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {UserData} from './user';
import {FavoriteFilm, Film, FullFilm, PromoFilm, UserReview} from './models';

export type CommentProcess = {
  comments: UserReview[];
}

export type FavoriteProcess = {
  favoriteFilms: FavoriteFilm[];
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
  favoriteFilmsQuantity: number;
  promoFilm: PromoFilm | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
