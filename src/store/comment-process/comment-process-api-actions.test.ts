import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Action} from '@reduxjs/toolkit';
import {lorem} from 'faker';
import {State} from '../../models/state';
import {createAPI} from '../../services/api';
import {AppThunkDispatch, extractActionsTypes, FAKE_COMMENT} from '../../utils/mocks';
import {APIRoute} from '../../const';
import {AddCommentRequest} from '../../models/models';
import {redirectToRoute} from '../action';
import {addCommentAction, getFilmCommentsAction} from './comment-process-api-actions';

describe('Comment process async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('getFilmCommentsAction', () => {
    const filmId = lorem.words(1);

    it('should dispatch "getFilmCommentsAction.pending", "getFilmCommentsAction.fulfilled", when server response 200', async() => {
      const mockComments = [FAKE_COMMENT];
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${filmId}`).reply(200, mockComments);

      await store.dispatch(getFilmCommentsAction(filmId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const getFilmCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFilmCommentsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFilmCommentsAction.pending.type,
        getFilmCommentsAction.fulfilled.type,
      ]);

      getFilmCommentsActionFulfilled.payload[0].date = new Date(getFilmCommentsActionFulfilled.payload[0].date);
      expect(getFilmCommentsActionFulfilled.payload)
        .toEqual(mockComments);
    });

    it('should dispatch "getFilmCommentsAction.pending", "getFilmCommentsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${filmId}`).reply(400, []);

      await store.dispatch(getFilmCommentsAction(lorem.words(1)));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFilmCommentsAction.pending.type,
        getFilmCommentsAction.rejected.type,
      ]);
    });
  });

  describe('addCommentAction', () => {
    const addCommentRequest: AddCommentRequest = {
      filmId: lorem.words(1),
      comment: lorem.words(15),
      rating: 5.5
    };

    it('should dispatch "addCommentAction.pending", "redirectToRoute", "addCommentAction.fulfilled", when server response 200', async() => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${addCommentRequest.filmId}`, {comment: addCommentRequest.comment, rating: addCommentRequest.rating}).reply(200);

      await store.dispatch(addCommentAction(addCommentRequest));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        addCommentAction.pending.type,
        redirectToRoute.type,
        addCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "addCommentAction.pending", "addCommentAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${addCommentRequest.filmId}`, {comment: addCommentRequest.comment, rating: addCommentRequest.rating}).reply(400);

      await store.dispatch(addCommentAction(addCommentRequest));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type,
      ]);
    });
  });

});
