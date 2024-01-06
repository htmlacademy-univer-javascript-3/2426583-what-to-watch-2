import {render, screen} from '@testing-library/react';
import {
  FAKE_COMMENT,
  FAKE_FILMS,
  FAKE_FILMS_GENRES,
  FAKE_FULL_FILMS,
  getFakeSimilarFilms,
  makeFakeStore
} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import {AuthorizationStatus, GENRE_FOR_ALL_FILMS} from '../../const';
import {Main} from './main';

describe('Component: Main', () => {
  const initialState = makeFakeStore();

  it('should render correctly', () => {
    const titleElementTestId = 'titleElement';
    const genreElementTestId = 'cardGenreElement';
    const yearElementTestId = 'yearElement';

    const {withStoreComponent} = withStore(<Main/>, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(titleElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(genreElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(yearElementTestId)).toBeInTheDocument();
  });

  it('should render loading spinner while fetching promoFilm data', () => {
    const fakeStore = {
      COMMENT: { comments: [FAKE_COMMENT] },
      FAVORITE: { favoriteFilms: FAKE_FILMS },
      FILM: {
        isFilmsDataLoading: true,
        genre: GENRE_FOR_ALL_FILMS,
        filmsByGenre: FAKE_FILMS,
        films: FAKE_FILMS,
        genres: FAKE_FILMS_GENRES,
        film: null,
        similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
        promoFilm: null
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    };
    const {withStoreComponent} = withStore(<Main/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const spinner = screen.getByTestId('spinnerElement');
    expect(spinner).toBeInTheDocument();
  });
});
