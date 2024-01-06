import { render, screen, waitFor } from '@testing-library/react';
import { VideoPlayer } from './video-player';
import {FAKE_FULL_FILMS} from '../../utils/mocks';

describe('VideoPlayer Component', () => {
  const videoPlayerProps = {
    src: FAKE_FULL_FILMS[0].videoLink,
    poster: FAKE_FULL_FILMS[0].posterImage,
  };

  it('should render VideoPlayer component', () => {
    render(<VideoPlayer {...videoPlayerProps} />);

    const videoPlayer = screen.getByTestId('video-player');

    expect(videoPlayer).toBeInTheDocument();
    expect(videoPlayer.tagName).toBe('VIDEO');
    expect(videoPlayer).toHaveAttribute('src', videoPlayerProps.src);
    expect(videoPlayer).toHaveAttribute('poster', videoPlayerProps.poster);
  });

  it('should play the video after a delay', async () => {
    const START_VIDEO_TIMEOUT = 1000;
    render(<VideoPlayer {...videoPlayerProps} />);

    const videoPlayer: HTMLVideoElement = screen.getByTestId('video-player');
    expect(videoPlayer.paused).toBe(true);

    await waitFor(() => {
      setTimeout(() => {
        expect(videoPlayer.paused).toBe(false);
      }, START_VIDEO_TIMEOUT);
    });
  });
});
