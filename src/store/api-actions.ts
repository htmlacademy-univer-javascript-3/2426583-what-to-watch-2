import {APIRoute} from '../const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../models/state';
import {AxiosInstance} from 'axios';
import {Film} from '../models/models';
import {getFilmsByGenre, loadFilms, setFilmsDataLoadingStatus} from './action';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadFilms',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilmsDataLoadingStatus(false));
    dispatch(loadFilms(data));
    dispatch(getFilmsByGenre());
  },
);
