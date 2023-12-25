import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {State} from '../../models/state';
import {createAPI} from '../../services/api';
import {AppThunkDispatch, extractActionsTypes, FAKE_FILMS, FAKE_FULL_FILMS} from '../../utils/mocks';
import {APIRoute} from '../../const';
import {FullFilm} from '../../models/models';
import {changeFavoriteFilmStateAction, getFavoriteFilmsAction} from './favorite-process-api-actions';

describe('Favorite process async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('getFavoriteFilmsAction', () => {

    it('should dispatch "getFavoriteFilmsAction.pending", "getFavoriteFilmsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(200, FAKE_FILMS);

      await store.dispatch(getFavoriteFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFavoriteFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFavoriteFilmsAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        getFavoriteFilmsAction.pending.type,
        getFavoriteFilmsAction.fulfilled.type,
      ]);
      expect(getFavoriteFilmsActionFulfilled.payload)
        .toEqual(FAKE_FILMS);
    });

    it('should dispatch "getFavoriteFilmsAction.pending", "getFavoriteFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Favorite}`).reply(400);

      await store.dispatch(getFavoriteFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoriteFilmsAction.pending.type,
        getFavoriteFilmsAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteFilmStateAction', () => {
    const mockFullFilm: FullFilm = FAKE_FULL_FILMS[0];
    const changeFavoriteFilmStateRequest = {
      filmId: mockFullFilm.id,
      status: Number(!mockFullFilm.isFavorite)
    };

    it('should dispatch "changeFavoriteFilmStateAction.pending", "changeFavoriteFilmStateAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${changeFavoriteFilmStateRequest.filmId}/${changeFavoriteFilmStateRequest.status}`).reply(200, mockFullFilm);

      await store.dispatch(changeFavoriteFilmStateAction(changeFavoriteFilmStateRequest));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteFilmStateActionFulfilled = emittedActions.at(2) as ReturnType<typeof changeFavoriteFilmStateAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteFilmStateAction.pending.type,
        getFavoriteFilmsAction.pending.type,
        changeFavoriteFilmStateAction.fulfilled.type,
      ]);

      expect(changeFavoriteFilmStateActionFulfilled.payload)
        .toEqual(mockFullFilm);
    });

    it('should dispatch "changeFavoriteFilmStateAction.pending", "changeFavoriteFilmStateAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${changeFavoriteFilmStateRequest.filmId}/${changeFavoriteFilmStateRequest.status}`).reply(400);

      await store.dispatch(changeFavoriteFilmStateAction(changeFavoriteFilmStateRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteFilmStateAction.pending.type,
        changeFavoriteFilmStateAction.rejected.type,
      ]);
    });
  });

});
