import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentProcess} from '../../models/state';
import {NameSpace} from '../../const';
import {UserReview} from '../../models/models';
import {getFilmCommentsAction} from '../api-actions';

const initialState: CommentProcess = {
  comments: []
};

export const commentProcessSlice = createSlice({
  name: NameSpace.Comment,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFilmCommentsAction.fulfilled, (state, action: PayloadAction<UserReview[]>) => {
        state.comments = action.payload;
      });
  }
});
