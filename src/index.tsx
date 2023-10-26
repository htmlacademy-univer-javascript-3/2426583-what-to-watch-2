import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import React from 'react';
import {FILMS} from './mocks/films';

const appInitProps = {
  films: FILMS
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      films={appInitProps.films}
    />
  </React.StrictMode>
);
