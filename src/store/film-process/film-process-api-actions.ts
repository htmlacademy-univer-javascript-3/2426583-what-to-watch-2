import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute} from '../../const';
import {AppDispatch, State} from '../../models/state';
import {Film, FullFilm, PromoFilm} from '../../models/models';

export const getFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/get',
  async (_arg, {extra: api}) => {
    const {data: films} = await api.get<Film[]>(APIRoute.Films);
    return films;
  },
);

export const getFilmAction = createAsyncThunk<FullFilm, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getOne',
  async (arg: string, {extra: api}) => {
    const {data: film} = await api.get<FullFilm>(`${APIRoute.Films}/${arg}`);
    return film;
  },
);

export const getSimilarFilmsAction = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getSimilarFilms',
  async (arg: string, { extra: api}) => {
    const {data: films} = await api.get<Film[]>(`${APIRoute.Films}/${arg}/similar`);
    return films;
  },
);

export const getPromoFilmAction = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getPromoFilm',
  async (_arg, { extra: api}) => {
    const {data: promoFilm} = await api.get<PromoFilm>(APIRoute.Promo);
    return promoFilm;
  },
);
