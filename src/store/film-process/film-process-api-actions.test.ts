import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {State} from '../../models/state';
import {createAPI} from '../../services/api';
import {
  AppThunkDispatch,
  extractActionsTypes,
  FAKE_FILMS,
  FAKE_FULL_FILMS, FAKE_PROMO_FILM,
  getFakeSimilarFilms
} from '../../utils/mocks';
import {APIRoute} from '../../const';
import {getFilmAction, getFilmsAction, getPromoFilmAction, getSimilarFilmsAction} from './film-process-api-actions';

describe('Film process async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('getFilmsAction', () => {

    it('should dispatch "getFilmsAction.pending", "setGenres.pending", "setFilmsByGenre.pending", "getFilmsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}`).reply(200, FAKE_FILMS);

      await store.dispatch(getFilmsAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFilmsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFilmsAction.pending.type,
        getFilmsAction.fulfilled.type,
      ]);
      expect(getFilmsActionFulfilled.payload)
        .toEqual(FAKE_FILMS);
    });

    it('should dispatch "getFilmsAction.pending", "getFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}`).reply(400);

      await store.dispatch(getFilmsAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFilmsAction.pending.type,
        getFilmsAction.rejected.type,
      ]);
    });
  });

  describe('getFilmAction', () => {
    const filmId = FAKE_FULL_FILMS[0].id;
    it('should dispatch "getFilmAction.pending", "getFilmAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${filmId}`).reply(200, FAKE_FULL_FILMS[0]);

      await store.dispatch(getFilmAction(filmId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFilmAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        getFilmAction.pending.type,
        getFilmAction.fulfilled.type,
      ]);
      expect(getFilmActionFulfilled.payload)
        .toEqual(FAKE_FULL_FILMS[0]);
    });

    it('should dispatch "getFilmsAction.pending", "getFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${filmId}`).reply(400);

      await store.dispatch(getFilmAction(filmId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFilmAction.pending.type,
        getFilmAction.rejected.type,
      ]);
    });
  });

  describe('getSimilarFilmsAction', () => {
    const filmId = FAKE_FULL_FILMS[2].id;
    const similarFilms = getFakeSimilarFilms(FAKE_FULL_FILMS[2].genre);
    it('should dispatch "getSimilarFilmsAction.pending", "getSimilarFilmsAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${filmId}/similar`).reply(200, similarFilms);

      await store.dispatch(getSimilarFilmsAction(filmId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getSimilarFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getSimilarFilmsAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        getSimilarFilmsAction.pending.type,
        getSimilarFilmsAction.fulfilled.type,
      ]);
      expect(getSimilarFilmsActionFulfilled.payload)
        .toEqual(similarFilms);
    });

    it('should dispatch "getSimilarFilmsAction.pending", "getSimilarFilmsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${filmId}/similar`).reply(400);

      await store.dispatch(getSimilarFilmsAction(filmId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getSimilarFilmsAction.pending.type,
        getSimilarFilmsAction.rejected.type,
      ]);
    });
  });

  describe('getPromoFilmAction', () => {
    it('should dispatch "getPromoFilmAction.pending", "getPromoFilmAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onGet(`${APIRoute.Promo}`).reply(200, FAKE_PROMO_FILM);

      await store.dispatch(getPromoFilmAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getPromoFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof getPromoFilmAction.fulfilled>;


      expect(extractedActionsTypes).toEqual([
        getPromoFilmAction.pending.type,
        getPromoFilmAction.fulfilled.type,
      ]);
      expect(getPromoFilmActionFulfilled.payload)
        .toEqual(FAKE_PROMO_FILM);
    });

    it('should dispatch "getPromoFilmAction.pending", "getPromoFilmAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Promo}`).reply(400);

      await store.dispatch(getPromoFilmAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getPromoFilmAction.pending.type,
        getPromoFilmAction.rejected.type,
      ]);
    });
  });
});
