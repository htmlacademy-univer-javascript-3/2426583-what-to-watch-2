import {expect} from 'vitest';
import {FilmProcess} from '../../models/state';
import {GENRE_FOR_ALL_FILMS} from '../../const';
import {
  FAKE_FILMS,
  FAKE_FILMS_GENRES,
  FAKE_FULL_FILMS, FAKE_PROMO_FILM,
  getFakeSimilarFilms
} from '../../utils/mocks';
import {Film} from '../../models/models';
import {getFilmAction, getFilmsAction, getPromoFilmAction, getSimilarFilmsAction} from './film-process-api-actions';
import {filmProcessSlice, setFilmsByGenre} from './film-process.slice';


describe('Film process slice', () => {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: GENRE_FOR_ALL_FILMS,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: FAKE_FILMS_GENRES,
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const result = filmProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', ()=> {
    const emptyAction = { type: '' };
    const expectedState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: GENRE_FOR_ALL_FILMS,
      filmsByGenre: [],
      films: [],
      genres: [],
      film: null,
      similarFilms: [],
      promoFilm: null
    };

    const result = filmProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it ('should set all films "setFilmsByGenre" action', ()=> {
    const initialState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: GENRE_FOR_ALL_FILMS,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmsByGenre: Film[] = FAKE_FILMS;

    const result = filmProcessSlice.reducer(initialState, setFilmsByGenre(GENRE_FOR_ALL_FILMS));

    expect(result.filmsByGenre).toEqual(expectedFilmsByGenre);
  });

  it ('should set part of films "setFilmsByGenre" action', ()=> {
    const initialState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmsByGenre: Film[] = getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre);

    const result = filmProcessSlice.reducer(initialState, setFilmsByGenre(FAKE_FULL_FILMS[0].genre));

    expect(result.filmsByGenre).toEqual(expectedFilmsByGenre);
  });

  it('should set "isFilmsDataLoading" to "true", "films" to "[]" with "getFilmsAction.pending"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmsStateLength = 0;
    const expectedIsFilmsDataLoadingState = true;

    const result = filmProcessSlice.reducer(initialState, getFilmsAction.pending);

    expect(result.films.length).toBe(expectedFilmsStateLength);
    expect(result.isFilmsDataLoading).toEqual(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false" and set "films" with "getFilmsAction.fulfilled"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: [],
      films: [],
      genres: [GENRE_FOR_ALL_FILMS],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmsState = FAKE_FILMS;
    const expectedGenres = [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES];
    const expectedFilmsByGenre = FAKE_FILMS;
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getFilmsAction.fulfilled(
      FAKE_FILMS, '', ''));

    expect(result.films).toEqual(expectedFilmsState);
    expect(result.genres).toEqual(expectedGenres);
    expect(result.filmsByGenre).toEqual(expectedFilmsByGenre);
    expect(result.isFilmsDataLoading).toEqual(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false", "films" to "[]" with "getFilmsAction.rejected"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmsStateLength = 0;
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getFilmsAction.rejected);

    expect(result.films.length).toBe(expectedFilmsStateLength);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "true", "film-page" to "null" with "getFilmsAction.pending"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmState = null;
    const expectedIsFilmsDataLoadingState = true;

    const result = filmProcessSlice.reducer(initialState, getFilmAction.pending);

    expect(result.film).toEqual(expectedFilmState);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false" and set "film-page" with "getFilmsAction.fulfilled"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: null,
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedFilmState = FAKE_FULL_FILMS[0];
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getFilmAction.fulfilled(
      FAKE_FULL_FILMS[0], '', ''));

    expect(result.film).toEqual(expectedFilmState);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false", "film-page" to "null" with "getFilmsAction.rejected"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getFilmAction.rejected);

    expect(result.film).toEqual(null);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "true", "similarFilms" to "[]" with "getSimilarFilmsAction.pending"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedSimilarFilmsStateLength = 0;
    const expectedIsFilmsDataLoadingState = true;

    const result = filmProcessSlice.reducer(initialState, getSimilarFilmsAction.pending);

    expect(result.similarFilms.length).toBe(expectedSimilarFilmsStateLength);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false" and set "similarFilms" with "getSimilarFilmsAction.fulfilled"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: [],
      promoFilm: null
    };
    const expectedSimilarFilmsState = getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre);
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getSimilarFilmsAction.fulfilled(
      getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre), '', ''));

    expect(result.similarFilms).toEqual(expectedSimilarFilmsState);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false", "similarFilms" to "[]" with "getSimilarFilmsAction.rejected"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedSimilarFilmsStateLength = 0;
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getSimilarFilmsAction.rejected);

    expect(result.similarFilms.length).toBe(expectedSimilarFilmsStateLength);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "true", "promoFilm" to "null" with "getPromoFilmAction.pending"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: false,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: FAKE_PROMO_FILM
    };
    const expectedPromoFilmState = null;
    const expectedIsFilmsDataLoadingState = true;

    const result = filmProcessSlice.reducer(initialState, getPromoFilmAction.pending);

    expect(result.promoFilm).toEqual(expectedPromoFilmState);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false" and set "promoFilm" with "getPromoFilmAction.fulfilled"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: null
    };
    const expectedPromoFilmState = FAKE_FILMS[0];
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getPromoFilmAction.fulfilled(
      FAKE_FILMS[0], '', ''));

    expect(result.promoFilm).toEqual(expectedPromoFilmState);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });

  it('should set "isFilmsDataLoading" to "false", "promoFilm" to "null" with "getPromoFilmAction.rejected"', () => {
    const initialState: FilmProcess = {
      isFilmsDataLoading: true,
      genre: FAKE_FULL_FILMS[0].genre,
      filmsByGenre: FAKE_FILMS,
      films: FAKE_FILMS,
      genres: [GENRE_FOR_ALL_FILMS, ...FAKE_FILMS_GENRES],
      film: FAKE_FULL_FILMS[0],
      similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
      promoFilm: FAKE_PROMO_FILM
    };
    const expectedPromoFilmState = null;
    const expectedIsFilmsDataLoadingState = false;

    const result = filmProcessSlice.reducer(initialState, getPromoFilmAction.rejected);

    expect(result.promoFilm).toEqual(expectedPromoFilmState);
    expect(result.isFilmsDataLoading).toBe(expectedIsFilmsDataLoadingState);
  });
});

