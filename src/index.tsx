import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {FILMS} from './mocks/films';
import {store} from './store';
import {fetchFilmsAction} from './store/api-actions';

const appInitProps = {
  films: FILMS
};

store.dispatch(fetchFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        films={appInitProps.films}
      />
    </Provider>
  </React.StrictMode>
);
