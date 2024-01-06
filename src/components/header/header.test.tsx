import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component';
import {FAKE_USER, makeFakeStore} from '../../utils/mocks';
import {Header} from './header';

describe('Component: Header', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render Sign in text, if user is not authorised', () => {
    const signInText = 'Sign in';
    const componentWithHistory = withHistory(
      <Header customClassName=''/>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null
      }
    }));

    render(withStoreComponent);

    expect(screen.queryByText(signInText)).toBeInTheDocument();
  });

  it('should render User Block, if user is authorised', () => {
    const altText = 'User avatar';
    const componentWithHistory = withHistory(
      <Header customClassName=''/>,
      mockHistory
    );
    const {withStoreComponent} = withStore(componentWithHistory, makeFakeStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: FAKE_USER
      }
    }));

    render(withStoreComponent);

    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });
});
