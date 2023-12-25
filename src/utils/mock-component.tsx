import {createMemoryHistory, MemoryHistory} from 'history';
import { HelmetProvider } from 'react-helmet-async';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore, MockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Action} from '@reduxjs/toolkit';
import HistoryRouter from '../components/history-router/history-router';
import {State} from '../models/state';
import {createAPI} from '../services/api';
import {AppThunkDispatch} from './mocks';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
