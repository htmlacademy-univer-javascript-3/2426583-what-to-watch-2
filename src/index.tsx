import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import React from 'react';
import {FILMS} from './mocks/films';

const appInitProps = {
  currentFilm: FILMS[0],
  films: FILMS
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      currentFilm={appInitProps.currentFilm}
      films={appInitProps.films}
    />
  </React.StrictMode>
);
