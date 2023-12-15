import {createSlice} from '@reduxjs/toolkit';
import {GENRE_FOR_ALL_FILMS, NameSpace} from '../../const';
import {getFilmAction, getFilmsAction, getSimilarFilmsAction} from '../api-actions';
import {FilmProcess} from '../../models/state';

const initialState: FilmProcess = {
  isFilmsDataLoading: false,
  genre: GENRE_FOR_ALL_FILMS,
  filmsByGenre: [],
  films: [],
  genres: [],
  film: null,
  similarFilms: []
};

export const filmProcessSlice = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setFilms: (state, action) => {
      state.films = action.payload;
    },
    setGenres: (state) => {
      const newListOfGenres = new Set<string>();
      state.films.forEach((film) => newListOfGenres.add(film.genre));
      state.genres = [GENRE_FOR_ALL_FILMS, ...newListOfGenres.values()];
    },
    changeGenre: (state, action) => {
      state.genre = action.payload;
    },
    setFilmsByGenre: (state) => {
      if (state.genre === GENRE_FOR_ALL_FILMS) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter((film) => film.genre === state.genre);
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFilmsAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(getFilmsAction.fulfilled, (state) => {
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmsAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmAction.pending, (state) => {
        state.isFilmsDataLoading = true;
      })
      .addCase(getFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
      })
      .addCase(getSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      });
  }
});

export const {setGenres, changeGenre, setFilmsByGenre, setFilms, setFilm, setSimilarFilms} = filmProcessSlice.actions;
