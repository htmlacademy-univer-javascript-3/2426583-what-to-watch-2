import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, getFilmsByGenre} from './action';
import {FILMS} from '../mocks/films';
import {State} from '../models/state';
import {GENRE_FOR_ALL_FILMS} from '../const';


const initialState = {
  genre: GENRE_FOR_ALL_FILMS,
  films: FILMS,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(getFilmsByGenre, (state: State) => {
      if (state.genre === GENRE_FOR_ALL_FILMS) {
        state.films = FILMS;
      } else {
        state.films = FILMS.filter((film) => film.genre === state.genre);
      }
    });
});

export {reducer};
