import {render, waitFor, screen, fireEvent} from '@testing-library/react';
import {GENRE_FOR_ALL_FILMS, NameSpace} from '../../const';
import {FAKE_FULL_FILMS} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import {Player} from './player';

describe('Player Component', () => {
  const initialState = {
    [NameSpace.Film]: {
      isFilmsDataLoading: false,
      genre: GENRE_FOR_ALL_FILMS,
      filmsByGenre: [],
      films: [],
      genres: [],
      film: FAKE_FULL_FILMS[0],
      similarFilms: [],
      promoFilm: null
    }
  };

  it('should render correctly with controls', async () => {
    const { withStoreComponent } = withStore(<Player />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

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

  it('should toggle play/pause correctly', async () => {
    const START_VIDEO_TIMEOUT = 1000;
    HTMLVideoElement.prototype.play = vi.fn();
    const { withStoreComponent } = withStore(<Player />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const playButton = screen.getByTestId('playButton');
    const videoPlayer: HTMLVideoElement = screen.getByTestId('videoElement');

    expect(videoPlayer.paused).toBe(true);

    fireEvent.click(playButton);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, START_VIDEO_TIMEOUT);
    });
  });
});
