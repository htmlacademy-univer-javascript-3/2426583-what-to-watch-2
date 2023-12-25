import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {State} from '../../models/state';
import {createAPI} from '../../services/api';
import {AppThunkDispatch, extractActionsTypes, FAKE_USER} from '../../utils/mocks';
import {APIRoute} from '../../const';
import {getFavoriteFilmsAction} from '../favorite-process/favorite-process-api-actions';
import {checkAuthAction} from './user-process-api-actions';

describe('User process async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, FAKE_USER);

      await store.dispatch(checkAuthAction());

      const emittedActions = store.getActions();
      const actions = extractActionsTypes(emittedActions);
      const checkAuthActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFavoriteFilmsAction.fulfilled>;

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
      expect(checkAuthActionFulfilled.payload)
        .toEqual(FAKE_USER);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  // todo добавить асинхронные действия с работой с локальным хранилищем
});
