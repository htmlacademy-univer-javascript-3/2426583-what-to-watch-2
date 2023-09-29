import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import React from 'react';

const appInitProps = {
  currentFilm: {
    title: 'The Grand Budapest Hotel',
    genre: 'Drama',
    year: '2014'
  },
  films: [
    {
      title: 'Fantastic Beasts: The Crimes of Grindelwald',
      imageUrl: 'public/img/fantastic-beasts-the-crimes-of-grindelwald.jpg'
    },
    {
      title: 'Bohemian Rhapsody',
      imageUrl: 'public/img/bohemian-rhapsody.jpg'
    },
    {
      title: 'Macbeth',
      imageUrl: 'public/img/macbeth.jpg'
    },
    {
      title: 'Aviator',
      imageUrl: 'public/img/aviator.jpg'
    },
    {
      title: 'We need to talk about Kevin',
      imageUrl: 'public/img/we-need-to-talk-about-kevin.jpg'
    },
    {
      title: 'What We Do in the Shadows',
      imageUrl: 'public/img/what-we-do-in-the-shadows.jpg'
    },
    {
      title: 'Revenant',
      imageUrl: 'public/img/revenant.jpg'
    },
    {
      title: 'Johnny English',
      imageUrl: 'public/img/johnny-english.jpg'
    },
    {
      title: 'Shutter Island',
      imageUrl: 'public/img/shutter-island.jpg'
    },
    {
      title: 'Pulp Fiction',
      imageUrl: 'public/img/pulp-fiction.jpg'
    },
    {
      title: 'No Country for Old Men',
      imageUrl: 'public/img/no-country-for-old-men.jpg'
    },
    {
      title: 'Snatch',
      imageUrl: 'public/img/snatch.jpg'
    },
    {
      title: 'Moonrise Kingdom',
      imageUrl: 'public/img/moonrise-kingdom.jpg'
    },
    {
      title: 'Seven Years in Tibet',
      imageUrl: 'public/img/seven-years-in-tibet.jpg'
    },
    {
      title: 'Midnight Special',
      imageUrl: 'public/img/midnight-special.jpg'
    },
    {
      title: 'War of the Worlds',
      imageUrl: 'public/img/war-of-the-worlds.jpg'
    },
    {
      title: 'Dardjeeling Limited',
      imageUrl: 'public/img/dardjeeling-limited.jpg'
    },
    {
      title: 'Orlando',
      imageUrl: 'public/img/orlando.jpg'
    },
    {
      title: 'Mindhunter',
      imageUrl: 'public/img/mindhunter.jpg'
    },
    {
      title: 'Midnight Special',
      imageUrl: 'public/img/midnight-special.jpg'
    }]
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
