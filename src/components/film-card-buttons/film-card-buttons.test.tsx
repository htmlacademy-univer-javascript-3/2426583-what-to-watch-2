import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Route, Routes} from 'react-router';
import userEvent from '@testing-library/user-event';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component';
import {FAKE_FILMS, FAKE_USER, makeFakeStore} from '../../utils/mocks';
import {FilmCardButtons} from './film-card-buttons';

describe('Component: FilmCardButtons', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly', () => {
    const playButtonText = 'Play';
    const {withStoreComponent} = withStore(<FilmCardButtons filmId={FAKE_FILMS[0].id}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByText(playButtonText)).toBeInTheDocument();
  });

  it('should redirect to film-page player when user click "Play"', async () => {
    const expectedText = 'film-page player';
    const mockFilmPlayerComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<FilmCardButtons filmId={FAKE_FILMS[0].id}/>}/>
        <Route path={`${AppRoute.Player}/${FAKE_FILMS[0].id}`} element={mockFilmPlayerComponent}/>
      </Routes>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    }));

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render Add Button, if user is authorised and current film-page is not favorite', () => {
    const notFavoriteFilmId = 'test';
    const addIconElementTestId = 'addIconElement';
    const componentWithHistory = withHistory(
      <FilmCardButtons filmId={notFavoriteFilmId}/>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(addIconElementTestId)).toBeInTheDocument();
  });

  it('should render In List Button, if user is authorised and current film-page is favorite', () => {
    const inListIconElementTestId = 'inListIconElement';
    const componentWithHistory = withHistory(
      <FilmCardButtons filmId={FAKE_FILMS[0].id}/>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId(inListIconElementTestId)).toBeInTheDocument();
  });

  it('should show count of favorite films, if user is authorised', () => {
    const componentWithHistory = withHistory(
      <FilmCardButtons filmId={FAKE_FILMS[0].id}/>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));

    render(withStoreComponent);

    expect(screen.getByText(FAKE_FILMS.length));
  });
});
