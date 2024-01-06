import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import {Route, Routes} from 'react-router';
import {
  FAKE_COMMENT,
  FAKE_FILMS,
  FAKE_FILMS_GENRES,
  FAKE_FULL_FILMS,
  FAKE_USER, getFakeSimilarFilms,
  makeFakeStore
} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import {AppRoute, AuthorizationStatus, GENRE_FOR_ALL_FILMS, NameSpace} from '../../const';
import {FilmPage} from './film-page';

describe('Component: Film Page', () => {
  const mockHistory = createMemoryHistory();
  const initialState = makeFakeStore();

  it('should render correctly', () => {
    const titleElementTestId = 'titleElement';
    const genreElementTestId = 'genreElement';
    const yearElementTestId = 'yearElement';
    const moreLikeThisText = 'More like this';

    const {withStoreComponent} = withStore(<FilmPage/>, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(titleElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(genreElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(yearElementTestId)).toBeInTheDocument();
    expect(screen.getByText(moreLikeThisText)).toBeInTheDocument();
  });

  it('should redirect to add review route when authorised user click "Add review"', async () => {
    const linkToReviewElementTestId = 'linkToReviewElement';
    const expectedText = 'review';
    const mockFilmComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path='/' element={<FilmPage/>}/>
        <Route path={`${AppRoute.Film}/${FAKE_FULL_FILMS[0].id}${AppRoute.AddReview}`} element={mockFilmComponent}/>
      </Routes>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(linkToReviewElementTestId));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render loading spinner while fetching film-page data', () => {
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
        promoFilm: FAKE_FILMS[0]
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    };
    const {withStoreComponent} = withStore(<FilmPage/>, fakeStore);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const spinner = screen.getByTestId('spinnerElement');
    expect(spinner).toBeInTheDocument();
  });


  it('should render film-page page with film-page data', async () => {
    const fakeFilm = FAKE_FULL_FILMS[0];
    const {withStoreComponent} = withStore(<FilmPage/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await waitFor(() => {
      const filmTitle = screen.getByText(fakeFilm.name);
      expect(filmTitle).toBeInTheDocument();
    });
  });
});
