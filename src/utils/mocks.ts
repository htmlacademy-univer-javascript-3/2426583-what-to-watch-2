import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {datatype, date, image, internet, lorem} from 'faker';
import {Film, FullFilm, PromoFilm, UserReview} from '../models/models';
import {State} from '../models/state';
import {createAPI} from '../services/api';
import {UserData} from '../models/user';
import {AuthorizationStatus, GENRE_FOR_ALL_FILMS, NameSpace} from '../const';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const FAKE_PROMO_FILM: PromoFilm = {
  id: '25130e24-894e-414a-b8dd-aba81d3819ba',
  name: 'Bohemian Rhapsody',
  posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Bohemian_Rhapsody.jpg',
  backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Bohemian_Rhapsody.jpg',
  videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
  genre: 'Drama',
  released: 2018,
  isFavorite: false
};
export const FAKE_FILMS: Film[] = [
  {
    id: '9a9ebc60-4820-4260-87c2-db65930cd312',
    name: 'Moonrise Kingdom',
    previewImage: 'https://13.design.htmlacademy.pro/static/film/preview/moonrise-kingdom.jpg',
    previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/traffic.mp4',
    genre: 'Adventure'
  },
  {
    id: 'f6446bb0-e366-4173-b0a9-ad3f04becba4',
    name: 'War of the Worlds',
    previewImage: 'https://13.design.htmlacademy.pro/static/film/preview/war-of-the-worlds.jpg',
    previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/traffic.mp4',
    genre: 'Adventure'
  },
  {
    id: '2a3853a7-98ce-4511-ae3c-5e487867f319',
    name: 'No Country for Old Men',
    previewImage: 'https://13.design.htmlacademy.pro/static/film/preview/no-country-for-old-men.jpg',
    previewVideoLink: 'https://13.design.htmlacademy.pro/static//film/video/dog.mp4',
    genre: 'Crime'
  }
];

export const FAKE_FILMS_GENRES = ['Adventure', 'Crime'];
export const FAKE_FULL_FILMS: FullFilm[] = [
  {
    id: '25130e24-894e-414a-b8dd-aba81d3819ba',
    name: 'Bohemian Rhapsody',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Bohemian_Rhapsody.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Bohemian_Rhapsody.jpg',
    backgroundColor: '#929FA5',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
    description: 'Bohemian Rhapsody is a foot-stomping celebration of Queen, their music and their extraordinary lead singer Freddie Mercury. Freddie defied stereotypes and shattered convention to become one of the most beloved entertainers on the planet. The film-page traces the meteoric rise of the band through their iconic songs and revolutionary sound. They reach unparalleled success, but in an unexpected turn Freddie, surrounded by darker influences, shuns Queen in pursuit of his solo career. Having suffered greatly without the collaboration of Queen, Freddie manages to reunite with his bandmates just in time for Live Aid. While bravely facing a recent AIDS diagnosis, Freddie leads the band in one of the greatest performances in the history of rock music. Queen cements a legacy that continues to inspire outsiders, dreamers and music lovers to this day.',
    rating: 6.1,
    scoresCount: 338903,
    director: 'Bryan Singer',
    starring: [
      'Rami Malek',
      'Lucy Boynton',
      'Gwilym Lee'
    ],
    runTime: 134,
    genre: 'Drama',
    released: 2018,
    isFavorite: false
  },
  {
    id: '78fd5274-ca3a-4dfb-b322-98a022ced72e',
    name: 'We need to talk about Kevin',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/We_need_to_talk_about_Kevin.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/We_need_to_talk_about_Kevin.jpg',
    backgroundColor: '#E1DFDE',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bubbles.mp4',
    description: 'Kevin\'s mother struggles to love her strange child, despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.',
    rating: 3.8,
    scoresCount: 123240,
    director: 'Lynne Ramsay',
    starring: [
      'Tilda Swinton',
      'John C. Reilly',
      'Ezra Miller'
    ],
    runTime: 112,
    genre: 'Drama',
    released: 2011,
    isFavorite: false
  },
  {
    id: 'bc09ee8e-253c-4a53-9cfb-8345f2d8dbd5',
    name: 'Seven Years in Tibet',
    posterImage: 'https://13.design.htmlacademy.pro/static/film/poster/Seven_Years_in_Tibet.jpg',
    backgroundImage: 'https://13.design.htmlacademy.pro/static/film/background/Seven_Years_in_Tibet.jpg',
    backgroundColor: '#C6CADF',
    videoLink: 'https://13.design.htmlacademy.pro/static/film/video/bike.mp4',
    description: 'True story of Heinrich Harrer, an Austrian mountain climber who became friends with the Dalai Lama at the time of China\'s takeover of Tibet.',
    rating: 3.6,
    scoresCount: 112612,
    director: 'Jean-Jacques Annaud',
    starring: [
      'Brad Pitt',
      'David Thewlis',
      'BD Wong'
    ],
    runTime: 136,
    genre: 'Adventure',
    released: 1997,
    isFavorite: false
  }
];

export const FAKE_COMMENT: UserReview = {
  id: datatype.number(),
  comment: lorem.words(10),
  user: internet.userName(),
  date: date.soon(),
  rating: datatype.number()
};

export const FAKE_USER: UserData = {
  name: internet.userName(),
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  token: datatype.string(15)
};

export const getFakeSimilarFilms = (genre: string): Film[] => FAKE_FILMS.filter((film: Film) => film.genre === genre);

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [NameSpace.Comment]: { comments: [FAKE_COMMENT] },
  [NameSpace.Favorite]: { favoriteFilms: FAKE_FILMS },
  [NameSpace.Film]: {
    isFilmsDataLoading: false,
    genre: GENRE_FOR_ALL_FILMS,
    filmsByGenre: FAKE_FILMS,
    films: FAKE_FILMS,
    genres: FAKE_FILMS_GENRES,
    film: FAKE_FULL_FILMS[0],
    similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
    promoFilm: FAKE_PROMO_FILM
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: null
  },
  ...initialState ?? {},
});
