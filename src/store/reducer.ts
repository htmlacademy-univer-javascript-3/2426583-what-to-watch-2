import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  getFilmsByGenre,
  loadFilms,
  requireAuthorization,
  setFilmsDataLoadingStatus, setUser
} from './action';
import {State} from '../models/state';
import {AuthorizationStatus, GENRE_FOR_ALL_FILMS} from '../const';
import {Film} from '../models/models';
import {UserData} from '../models/user';

type InitialStateType = {
  isFilmsDataLoading: boolean;
  genre: string;
  filmsByGenre: Film[];
  films: Film[];
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
}

const initialState: InitialStateType = {
  isFilmsDataLoading: false,
  genre: GENRE_FOR_ALL_FILMS,
  filmsByGenre: [],
  films: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setFilmsDataLoadingStatus, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
