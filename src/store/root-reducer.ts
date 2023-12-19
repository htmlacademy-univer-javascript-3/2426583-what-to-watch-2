import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {userProcessSlice} from './user-process/user-process.slice';
import {filmProcessSlice} from './film-process/film-process.slice';
import {commentProcessSlice} from './comment-process/comment-process.slice';
import {favoriteProcessSlice} from './favorite-process/favorite-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.User]: userProcessSlice.reducer,
  [NameSpace.Film]: filmProcessSlice.reducer,
  [NameSpace.Comment]: commentProcessSlice.reducer,
  [NameSpace.Favorite]: favoriteProcessSlice.reducer
});
