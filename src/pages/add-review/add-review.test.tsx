import {render, screen, waitFor} from '@testing-library/react';
import {Route, Routes} from 'react-router';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {withHistory, withStore} from '../../utils/mock-component';
import {
  FAKE_FILMS, FAKE_FILMS_GENRES,
  FAKE_FULL_FILMS, FAKE_PROMO_FILM, getFakeSimilarFilms,
  makeFakeStore
} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, GENRE_FOR_ALL_FILMS, NameSpace} from '../../const';
import {AddReview} from './add-review';
describe('Component: Add review', () => {
  const mockHistory = createMemoryHistory();
  const initialState = makeFakeStore();

  it('should render correctly', () => {
    const filmName = FAKE_FULL_FILMS[0].name;
    const filmNameCount = 2;
    const addReviewText = 'Add review';
    const {withStoreComponent} = withStore(<AddReview/>, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByAltText(filmName).length).toBe(filmNameCount);
    expect(screen.getByText(addReviewText)).toBeInTheDocument();
  });

  it('should redirect to film-page route when user click "film-page name"', async () => {
    const filmNameElementTestId = 'filmNameElement';
    const expectedText = 'film';
    const mockFilmComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path='/' element={<AddReview/>}/>
        <Route path={`${AppRoute.Film}/${FAKE_FULL_FILMS[0].id}`} element={mockFilmComponent}/>
      </Routes>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, initialState);

    render(withStoreComponent);
    await userEvent.click(screen.getByTestId(filmNameElementTestId));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render 404 page when film-page ID is not available', async () => {
    const expectedText = 'Page not found';
    const {withStoreComponent} = withStore(<AddReview/>, makeFakeStore({
      [NameSpace.Film]: {
        isFilmsDataLoading: false,
        genre: GENRE_FOR_ALL_FILMS,
        filmsByGenre: FAKE_FILMS,
        films: FAKE_FILMS,
        genres: FAKE_FILMS_GENRES,
        film: null,
        similarFilms: getFakeSimilarFilms(FAKE_FULL_FILMS[0].genre),
        promoFilm: FAKE_PROMO_FILM
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    }));
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    await waitFor(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });
});
