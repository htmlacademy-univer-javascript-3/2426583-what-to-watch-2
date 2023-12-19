import {State} from '../../models/state';
import {NameSpace} from '../../const';
import {Film, FullFilm, PromoFilm} from '../../models/models';

export const getIsFilmsDataLoading = (state: Pick<State, NameSpace.Film>): boolean => state[NameSpace.Film].isFilmsDataLoading;

export const getGenre = (state: Pick<State, NameSpace.Film>): string => state[NameSpace.Film].genre;

export const getFilmsByGenre = (state: Pick<State, NameSpace.Film>): Film[] => state[NameSpace.Film].filmsByGenre;

export const getFilms = (state: Pick<State, NameSpace.Film>): Film[] => state[NameSpace.Film].films;

export const getGenres = (state: Pick<State, NameSpace.Film>): string[] => state[NameSpace.Film].genres;

export const getFilm = (state: Pick<State, NameSpace.Film>): FullFilm | null => state[NameSpace.Film].film;

export const getSimilarFilms = (state: Pick<State, NameSpace.Film>): Film[] => state[NameSpace.Film].similarFilms;

export const getPromoFilm = (state: Pick<State, NameSpace.Film>): PromoFilm | null => state[NameSpace.Film].promoFilm;
