import {createAction} from '@reduxjs/toolkit';
import {Film} from '../models/models';
import {AppRoute, AuthorizationStatus} from '../const';
import {UserData} from '../models/user';

export const changeGenre = createAction('changeGenre', (genre: string): {payload: string} => ({
  payload: genre
}));

export const getFilmsByGenre = createAction('getFilmsByGenre');

export const loadFilms = createAction<Film[]>('loadFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('setFilmsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');

export const setUser = createAction<UserData>('setUser');

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');
