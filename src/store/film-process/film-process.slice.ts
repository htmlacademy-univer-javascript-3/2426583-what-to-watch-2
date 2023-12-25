import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GENRE_FOR_ALL_FILMS, NameSpace} from '../../const';
import {FilmProcess} from '../../models/state';
import {Film, FullFilm, PromoFilm} from '../../models/models';
import {getFilmAction, getFilmsAction, getPromoFilmAction, getSimilarFilmsAction} from './film-process-api-actions';

const initialState: FilmProcess = {
  isFilmsDataLoading: false,
  genre: GENRE_FOR_ALL_FILMS,
  filmsByGenre: [],
  films: [],
  genres: [],
  film: null,
  similarFilms: [],
  promoFilm: null
};

export const getFilmsGenres = (films: Film[]): string[] => {
  const newListOfGenres = new Set<string>();
  films.forEach((film) => newListOfGenres.add(film.genre));
  return [GENRE_FOR_ALL_FILMS, ...newListOfGenres.values()];
};

export const getFilmsByGenre = (genre: string, films: Film[]): Film[] => {
  if (genre === GENRE_FOR_ALL_FILMS) {
    return films;
  } else {
    return films.filter((film) => film.genre === genre);
  }
};

export const filmProcessSlice = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setFilms: (state, action: PayloadAction<Film[]>) => {
      state.films = action.payload;
    },
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    setFilmsByGenre: (state, action: PayloadAction<string>) => {
      state.filmsByGenre = getFilmsByGenre(action.payload, state.films);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getFilmsAction.pending, (state) => {
        state.films = [];
        state.isFilmsDataLoading = true;
      })
      .addCase(getFilmsAction.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.films = action.payload;
        state.genres = getFilmsGenres(action.payload);
        state.filmsByGenre = getFilmsByGenre(GENRE_FOR_ALL_FILMS, state.films);
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmsAction.rejected, (state) => {
        state.films = [];
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmAction.pending, (state) => {
        state.film = null;
        state.isFilmsDataLoading = true;
      })
      .addCase(getFilmAction.fulfilled, (state, action: PayloadAction<FullFilm>) => {
        state.film = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(getFilmAction.rejected, (state) => {
        state.film = null;
        state.isFilmsDataLoading = false;
      })
      .addCase(getSimilarFilmsAction.pending, (state) => {
        state.similarFilms = [];
        state.isFilmsDataLoading = true;
      })
      .addCase(getSimilarFilmsAction.fulfilled, (state, action: PayloadAction<Film[]>) => {
        state.similarFilms = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(getSimilarFilmsAction.rejected, (state) => {
        state.similarFilms = [];
        state.isFilmsDataLoading = false;
      })
      .addCase(getPromoFilmAction.pending, (state) => {
        state.promoFilm = null;
        state.isFilmsDataLoading = true;
      })
      .addCase(getPromoFilmAction.fulfilled, (state, action: PayloadAction<PromoFilm>) => {
        state.promoFilm = action.payload;
        state.isFilmsDataLoading = false;
      })
      .addCase(getPromoFilmAction.rejected, (state) => {
        state.promoFilm = null;
        state.isFilmsDataLoading = false;
      });
  }
});

export const {changeGenre, setFilmsByGenre} = filmProcessSlice.actions;
