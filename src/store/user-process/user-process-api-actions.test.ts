import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {State} from '../../models/state';
import {createAPI} from '../../services/api';
import {AppThunkDispatch, extractActionsTypes, FAKE_USER} from '../../utils/mocks';
import {APIRoute} from '../../const';
import {getFavoriteFilmsAction} from '../favorite-process/favorite-process-api-actions';
import {checkAuthAction, loginAction, logoutAction} from './user-process-api-actions';
import {AuthData} from '../../models/user';
import * as tokenStorage from '../../services/token';
import {redirectToRoute} from '../action';

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

  describe('loginAction', () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
    const fakeServerReplay = { token: 'secret' };

    it('should dispatch "loginAction.pending", "redirectToRoute", "getFavoriteFilmsAction.pending", "loginAction.fulfilled" when server response 200', async() => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        getFavoriteFilmsAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "redirectToRoute", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        redirectToRoute.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
