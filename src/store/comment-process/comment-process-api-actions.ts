import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {AddCommentRequest, UserReview} from '../../models/models';
import {AppDispatch, State} from '../../models/state';
import {APIRoute, AppRoute} from '../../const';
import {redirectToRoute} from '../action';

export const getFilmCommentsAction = createAsyncThunk<UserReview[], string, {
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
