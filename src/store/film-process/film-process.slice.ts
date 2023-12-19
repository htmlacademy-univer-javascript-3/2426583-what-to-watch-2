import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GENRE_FOR_ALL_FILMS, NameSpace} from '../../const';
import {FilmProcess} from '../../models/state';
import {Film, FullFilm, PromoFilm} from '../../models/models';
import {getFilmAction, getFilmsAction, getPromoFilmAction, getSimilarFilmsAction} from '../api-actions';

const initialState: FilmProcess = {
  isFilmsDataLoading: false,
  genre: GENRE_FOR_ALL_FILMS,
  filmsByGenre: [],
  films: [],
  genres: [],
  film: null,
  similarFilms: [],
  favoriteFilmsQuantity: 0,
  promoFilm: null
};

export const filmProcessSlice = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setFilms: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
    },
    setGenres: (state) => {
      const newListOfGenres = new Set<string>();
      state.films.forEach((film) => newListOfGenres.add(film.genre));
      state.genres = [GENRE_FOR_ALL_FILMS, ...newListOfGenres.values()];
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setFilmsByGenre: (state) => {
      if (state.genre === GENRE_FOR_ALL_FILMS) {
        state.filmsByGenre = state.films;
      } else {
        state.filmsByGenre = state.films.filter((film) => film.genre === state.genre);
      }
    },
    setPromoFilmFavoriteState: (state, action: PayloadAction<boolean>) => {
      state.film.isFavorite = action.payload;
    },
    setFilmFavoriteState: (state, action: PayloadAction<boolean>) => {
      state.film.isFavorite = action.payload;
    },
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
      .addCase(getFilmAction.fulfilled, (state, action: PayloadAction<FullFilm>) => {
        state.film = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmAction.rejected, (state) => {
        state.isFilmsDataLoading = false;
      })
      .addCase(getSimilarFilmsAction.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.similarFilms = action.payload;
      })
      .addCase(getPromoFilmAction.fulfilled, (state, action: PayloadAction<PromoFilm>) => {
        state.promoFilm = action.payload;
      });
  }
});

export const {setGenres, changeGenre, setFilmsByGenre, setFilms} = filmProcessSlice.actions;
