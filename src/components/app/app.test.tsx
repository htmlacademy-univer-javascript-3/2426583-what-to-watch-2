import {createMemoryHistory, MemoryHistory} from 'history';
import {render, screen, waitFor} from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component';
import {
  FAKE_FULL_FILMS,
  FAKE_USER,
  makeFakeStore
} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import App from './app';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const filmCardMainElementTestId = 'filmCardMainElement';
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(filmCardMainElementTestId)).toBeInTheDocument();
  });

  it('should render "Login" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const loginElementTestId = 'loginElement';
    const passwordElementTestId = 'passwordElement';
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByTestId(loginElementTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordElementTestId)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));
    mockHistory.push(AppRoute.MyList);

    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render "FilmPage" when user navigate to "/films"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const filmCardElementTestId = 'filmCardElement';
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    mockHistory.push(`${AppRoute.Film}/${FAKE_FULL_FILMS[0].id}`);

    render(withStoreComponent);

    expect(screen.getByTestId(filmCardElementTestId)).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/id/review"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const reviewElementTestId = 'reviewElement';
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));
    mockHistory.push(`${AppRoute.Film}/${FAKE_FULL_FILMS[0].id}${AppRoute.AddReview}`);

    render(withStoreComponent);

    expect(screen.getByTestId(reviewElementTestId)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/id"', async () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push(`${AppRoute.Player}/${FAKE_FULL_FILMS[0].id}`);

    render(withStoreComponent);
    await waitFor(() => {
      const videoElementTestId = screen.getByTestId('videoElement');
      expect(videoElementTestId).toBeInTheDocument();

      const exitButtonTestId = screen.getByTestId('exitButton');
      expect(exitButtonTestId).toBeInTheDocument();

      const playButtonTestId = screen.getByTestId('playButton');
      expect(playButtonTestId).toBeInTheDocument();

      const fullScreenButtonTestId = screen.getByTestId('fullScreenButton');
      expect(fullScreenButtonTestId).toBeInTheDocument();
    });
  });

  it('should render "NotFound" when user navigate to other path', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/fakefilm';
    const pageNotFoundText = 'Page not found';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText(pageNotFoundText)).toBeInTheDocument();
  });
});
