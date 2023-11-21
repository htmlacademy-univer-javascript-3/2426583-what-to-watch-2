import {createAction} from '@reduxjs/toolkit';
import {Film, FullFilm, UserReview} from '../models/models';
import {AuthorizationStatus} from '../const';
import {UserData} from '../models/user';

export const changeGenre = createAction('changeGenre', (genre: string): {payload: string} => ({
  payload: genre
}));

export const getFilmsByGenre = createAction('getFilmsByGenre');

export const setFilms = createAction<Film[]>('setFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('setFilmsDataLoadingStatus');

export const setFilm = createAction<FullFilm>('setFilm');

export const setSimilarFilms = createAction<Film[]>('setSimilarFilms');

export const setFilmComments = createAction<UserReview[]>('setFilmComments');

export const redirectToRoute = createAction<string>('redirectToRoute');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setUser = createAction<UserData>('setUser');
