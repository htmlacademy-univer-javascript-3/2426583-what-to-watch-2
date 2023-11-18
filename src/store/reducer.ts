import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  getFilmsByGenre, setFilm,
  setFilms, setSimilarFilms,
  requireAuthorization,
  setFilmsDataLoadingStatus, setUser, setFilmComments
} from './action';
import {State} from '../models/state';
import {AuthorizationStatus, GENRE_FOR_ALL_FILMS, USER_KEY_NAME} from '../const';
import {Film, FullFilm, UserReview} from '../models/models';
import {UserData} from '../models/user';

type InitialStateType = {
  isFilmsDataLoading: boolean;
  genre: string;
  filmsByGenre: Film[];
  films: Film[];
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  film: FullFilm | null;
  similarFilms: Film[];
  reviews: UserReview[];
}

const initialState: InitialStateType = {
  isFilmsDataLoading: false,
  genre: GENRE_FOR_ALL_FILMS,
  filmsByGenre: [],
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  film: null,
  similarFilms: [],
  reviews: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmsByGenre, (state: State) => {
      if (state.genre === GENRE_FOR_ALL_FILMS) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter((film) => film.genre === state.genre);
      }
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(setFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setFilmComments, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
      localStorage.setItem(USER_KEY_NAME, state.user.avatarUrl);
    });
});

export {reducer};
