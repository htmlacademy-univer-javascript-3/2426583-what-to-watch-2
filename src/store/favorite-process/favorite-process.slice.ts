import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FavoriteProcess} from '../../models/state';
import {NameSpace} from '../../const';
import {FavoriteFilm} from '../../models/models';
import {getFavoriteFilmsAction} from '../api-actions';

const initialState: FavoriteProcess = {
  favoriteFilms: []
};

export const favoriteProcessSlice = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFavoriteFilmsAction.fulfilled, (state, action: PayloadAction<FavoriteFilm[]>) => {
        state.favoriteFilms = action.payload;
      });
  }
});

