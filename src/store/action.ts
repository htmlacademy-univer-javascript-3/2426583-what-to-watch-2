import {createAction} from '@reduxjs/toolkit';
import {Film} from '../models/models';

export const changeGenre = createAction('changeGenre', (genre: string): {payload: string} => ({
  payload: genre
}));

export const getFilmsByGenre = createAction('getFilmsByGenre');

export const loadFilms = createAction<Film[]>('loadFilms');

export const setFilmsDataLoadingStatus = createAction<boolean>('setFilmsDataLoadingStatus');
