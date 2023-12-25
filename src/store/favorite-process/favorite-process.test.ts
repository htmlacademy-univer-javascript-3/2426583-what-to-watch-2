import {expect} from 'vitest';
import {FavoriteProcess} from '../../models/state';
import {FAKE_FILMS} from '../../utils/mocks';
import {favoriteProcessSlice} from './favorite-process.slice';
import {getFavoriteFilmsAction} from './favorite-process-api-actions';

describe('Favorite process slice', () => {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState: FavoriteProcess = {
      favoriteFilms: FAKE_FILMS
    };
    const result = favoriteProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', ()=> {
    const emptyAction = { type: '' };
    const expectedState: FavoriteProcess = {
      favoriteFilms: []
    };

    const result = favoriteProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteFilms" to array with favoriteFilms with "getFavoriteFilmsAction.fulfilled"', () => {
    const expectedState: FavoriteProcess = {
      favoriteFilms: FAKE_FILMS
    };

    const result = favoriteProcessSlice.reducer(
      undefined,
      getFavoriteFilmsAction.fulfilled(
        FAKE_FILMS, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });
});

