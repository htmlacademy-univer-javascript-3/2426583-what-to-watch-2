import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIRoute, AppRoute} from '../const';
import {AppDispatch, State} from '../models/state';
import {AddCommentRequest, FavoriteFilm, Film, FullFilm, UserReview} from '../models/models';
import {AuthData, UserData} from '../models/user';
import {dropToken, saveToken} from '../services/token';
import {
  setFilms,
  setFilmsByGenre,
  setGenres,
} from './film-process/film-process.slice';
import {redirectToRoute} from './action';

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
  async (arg: string, {extra: api}) => {
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
  async (arg: string, { extra: api}) => {
    const {data: films} = await api.get<Film[]>(`${APIRoute.Films}/${arg}/similar`);
    return films;
  },
);

export const getFavoriteFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getFavoriteFilms',
  async (_arg, { extra: api}) => {
    const {data: favoriteFilms} = await api.get<FavoriteFilm[]>(`${APIRoute.Favorite}`);
    return favoriteFilms;
  },
);

export const changeFavoriteFilmStateAction = createAsyncThunk<void, {filmId: number; status: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/changeFavoriteFilmsState',
  async (arg: {filmId: number; status: number}, { dispatch, extra: api}) => {
    const {data: updatedFilm} = await api.post<FullFilm>(`${APIRoute.Favorite}/${arg.filmId}/${arg.status}`);
    dispatch(getFavoriteFilmsAction());
    return updatedFilm;
  },
);

export const getPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/getPromoFilm',
  async (_arg, { extra: api}) => {
    const {data: promoFilm} = await api.get<FavoriteFilm[]>(`${APIRoute.Promo}`);
    return promoFilm;
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
    dispatch(redirectToRoute(AppRoute.Main));
    dispatch(getFavoriteFilmsAction());
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
