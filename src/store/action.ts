import {createAction} from '@reduxjs/toolkit';

export const changeGenre = createAction('changeGenre', (genre: string): {payload: string} => ({
  payload: genre
}));

export const getFilmsByGenre = createAction('getFilmsByGenre');
