import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {Film, FullFilm} from '../../models/models';
import {AppDispatch, State} from '../../models/state';
import {APIRoute} from '../../const';

export const getFavoriteFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/getFavoriteFilms',
  async (_arg, { extra: api}) => {
    const {data: favoriteFilms} = await api.get<Film[]>(APIRoute.Favorite);
    return favoriteFilms;
  },
);

export const changeFavoriteFilmStateAction = createAsyncThunk<FullFilm, {filmId: string; status: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/changeFavoriteFilmsState',
  async (arg: {filmId: string; status: number}, { dispatch, extra: api}) => {
    const {data: updatedFilm} = await api.post<FullFilm>(`${APIRoute.Favorite}/${arg.filmId}/${arg.status}`);
    dispatch(getFavoriteFilmsAction());
    return updatedFilm;
  },
);
