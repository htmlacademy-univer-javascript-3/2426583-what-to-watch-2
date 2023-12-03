import {APIRoute, AppRoute, USER_KEY_NAME} from '../const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../models/state';
import {AxiosInstance} from 'axios';
import {AddCommentRequest, Film, FullFilm, UserReview} from '../models/models';
import {
  redirectToRoute} from './action';
import {AuthData, UserData} from '../models/user';
import {dropToken, saveToken} from '../services/token';
import {setFilms, setFilmsByGenre, setGenres} from './film-process/film-process.slice';

export const getFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/get',
  async (_arg, {dispatch, extra: api}) => {
    const {data: films} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilms(films));
    dispatch(setGenres());
    dispatch(setFilmsByGenre());
  },
);

export const getFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getOne',
  async (arg, {extra: api}) => {
    const {data: film} = await api.get<FullFilm>(`${APIRoute.Films}/${arg}`);
    return film;
  },
);

export const getSimilarFilmsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getSimilarFilms',
  async (arg, { extra: api}) => {
    const {data: films} = await api.get<Film[]>(`${APIRoute.Films}/${arg}/similar`);
    return films;
  },
);

export const getFilmCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/get',
  async (arg, { extra: api}) => {
    const {data: comments} = await api.get<UserReview[]>(`${APIRoute.Comments}/${arg}`);
    return comments;
  },
);

export const addCommentAction = createAsyncThunk<void, AddCommentRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/create',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    await api.post<UserReview>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${AppRoute.Film}/${filmId}`));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: user} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(user.token);
    localStorage.setItem(USER_KEY_NAME, user.avatarUrl);
    dispatch(redirectToRoute(AppRoute.Main));
    return user;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, { extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const logoutAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete<UserData>(APIRoute.Logout);
    dropToken();
    localStorage.removeItem(USER_KEY_NAME);
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
