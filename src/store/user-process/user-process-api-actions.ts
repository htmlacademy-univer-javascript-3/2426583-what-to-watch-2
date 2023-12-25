import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AuthData, UserData} from '../../models/user';
import {AppDispatch, State} from '../../models/state';
import {APIRoute, AppRoute} from '../../const';
import {dropToken, saveToken} from '../../services/token';
import {redirectToRoute} from '../action';
import {getFavoriteFilmsAction} from '../favorite-process/favorite-process-api-actions';

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(user.token);
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(getFavoriteFilmsAction());
    return user;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api}) => {
    const {data: user} = await api.get<UserData>(APIRoute.Login);
    return user;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete<UserData>(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
