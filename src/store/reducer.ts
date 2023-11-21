import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre, loadFilms, setFilmsDataLoadingStatus} from './action';
import {State} from '../models/state';
import {GENRE_FOR_ALL_FILMS} from '../const';


const initialState = {
  isFilmsDataLoading: false,
  genre: GENRE_FOR_ALL_FILMS,
  filmsByGenre: [],
  films: []
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
    });
});

export {reducer};
