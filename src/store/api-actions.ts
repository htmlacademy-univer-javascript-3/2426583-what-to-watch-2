import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../models/state';
import {AxiosInstance} from 'axios';
import {AddCommentRequest, Film, FullFilm, UserReview} from '../models/models';
import {
  getFilmsByGenre, setFilm,
  setFilms, setSimilarFilms,
  redirectToRoute,
  requireAuthorization,
  setFilmsDataLoadingStatus,
  setUser, setFilmComments
} from './action';
import {AuthData, UserData} from '../models/user';
import {saveToken} from '../services/token';

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
    dispatch(setFilms(data));
    dispatch(getFilmsByGenre());
  },
);

export const fetchFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadFilm',
  async (arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoadingStatus(true));
    const {data: film} = await api.get<FullFilm>(`${APIRoute.Films}/${arg}`);
    dispatch(setFilm(film));
    dispatch(setFilmsDataLoadingStatus(false));
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadSimilarFilms',
  async (arg, {dispatch, extra: api}) => {
    // dispatch(setFilmsDataLoadingStatus(true));
    const {data: film} = await api.get<Film[]>(`${APIRoute.Films}/${arg}/similar`);
    // dispatch(setFilmsDataLoadingStatus(false));
    dispatch(setSimilarFilms(film));
  },
);

export const fetchFilmCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadComments',
  async (arg, {dispatch, extra: api}) => {
    const {data: reviews} = await api.get<UserReview[]>(`${APIRoute.Comments}/${arg}`);
    dispatch(setFilmComments(reviews));
  },
);

export const addCommentAction = createAsyncThunk<void, AddCommentRequest, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'addCommentAction',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    const {data: review} = await api.post<UserReview>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${AppRoute.Film}/${filmId}`));
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loginAction',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
