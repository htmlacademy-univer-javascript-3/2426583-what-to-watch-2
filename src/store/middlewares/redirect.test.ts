import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../browser-history';
import { AppRoute } from '../../const';
import {State} from '../../models/state';
import { redirectToRoute } from '../action';
import { redirect } from './redirect';

vi.mock('../../browser-history', () => ({
  default: {
    location: { pathname: ''},
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;

  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with redirectToRoute action', () => {
    const redirectAction = redirectToRoute(AppRoute.Login);
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should not redirect to "/main" with empty action', () => {
    const emptyAction = { type: '', payload: AppRoute.Main };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe(AppRoute.Main);
  });
});
