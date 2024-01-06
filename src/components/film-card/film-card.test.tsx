import { createMemoryHistory } from 'history';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router';
import {AppRoute} from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import {FAKE_FILMS} from '../../utils/mocks';
import {FilmCard} from './film-card';

describe('Component: FilmCard', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push(AppRoute.Main);
  });

  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<FilmCard shortFilmInfo={FAKE_FILMS[0]} isActive={false}/>);
    const filmNameElementTestId = 'filmNameElement';
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId(filmNameElementTestId)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to film-page route when user click "film-page name"', async () => {
    const expectedText = 'film';
    const mockFilmComponent = <span>{expectedText}</span>;
    const componentWithHistory = withHistory(
      <Routes>
        <Route path={AppRoute.Main} element={<FilmCard shortFilmInfo={FAKE_FILMS[0]} isActive={false}/>} />
        <Route path={`${AppRoute.Film}/${FAKE_FILMS[0].id}`} element={mockFilmComponent} />
      </Routes>,
      mockHistory
    );
    const { withStoreComponent } = withStore(componentWithHistory, {});

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render video when user mouse enter to card', () => {
    const videoElementTestId = 'videoElement';
    const componentWithHistory = withHistory(<FilmCard shortFilmInfo={FAKE_FILMS[0]} isActive/>);
    const {withStoreComponent} = withStore(componentWithHistory, {});

    render(withStoreComponent);

    expect(screen.getByTestId(videoElementTestId)).toBeInTheDocument();
  });

  it('should render preview image when user mouse leave to card', () => {
    const videoElementTestId = 'imageElement';
    const componentWithHistory = withHistory(<FilmCard shortFilmInfo={FAKE_FILMS[0]} isActive={false}/>);
    const {withStoreComponent} = withStore(componentWithHistory, {});

    render(withStoreComponent);

    expect(screen.getByTestId(videoElementTestId)).toBeInTheDocument();
  });

  it('onMouseEnter should call when user mouse enter to card', () => {
    const mockOnMouseEnter = vi.fn();
    const smallFilmCardElementTestId = 'smallFilmCardElement';
    const componentWithHistory = withHistory(<FilmCard shortFilmInfo={FAKE_FILMS[0]} isActive={false} onMouseEnter={mockOnMouseEnter}/>);
    const {withStoreComponent} = withStore(componentWithHistory, {});

    render(withStoreComponent);

    fireEvent.mouseEnter(screen.getByTestId(smallFilmCardElementTestId));

    expect(mockOnMouseEnter).toBeCalledTimes(1);
  });

  it('onMouseLeave should call when user mouse leave from card', () => {
    const mockOnMouseLeave = vi.fn();
    const smallFilmCardElementTestId = 'smallFilmCardElement';
    const componentWithHistory = withHistory(<FilmCard shortFilmInfo={FAKE_FILMS[0]} isActive={false} onMouseLeave={mockOnMouseLeave}/>);
    const {withStoreComponent} = withStore(componentWithHistory, {});

    render(withStoreComponent);

    fireEvent.mouseLeave(screen.getByTestId(smallFilmCardElementTestId));
    expect(mockOnMouseLeave).toBeCalledTimes(1);
  });
});
