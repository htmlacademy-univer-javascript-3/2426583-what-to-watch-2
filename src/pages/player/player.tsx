import {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import {FullFilm} from '../../models/models';
import {useLoadFilmPlayer} from '../../hooks/use-load-film-player';
import {useAppSelector} from '../../hooks';
import {AppRoute} from '../../const';
import {Icon} from '../../components/icon/icon';
import {getFilm, getIsFilmsDataLoading} from '../../store/film-process/film-process.selectors';
import {LoadingScreen} from '../loading-screen/loading-screen';
import {formatDuration} from './player.utils';

const START_VIDEO_TIMEOUT = 1000;

export function Player(): JSX.Element {
  const film: FullFilm | null = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getIsFilmsDataLoading);
  const [timeout, setModalTimeout] = useState<ReturnType<typeof setTimeout>>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeLeft, setTimeLeft] = useState(videoRef.current?.duration ?? 0);
  const [progress, setProgress] = useState(0);

  useLoadFilmPlayer();

  const updateTimeLeft = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    setTimeLeft(event.currentTarget.duration - event.currentTarget.currentTime);
    setProgress(event.currentTarget.currentTime / event.currentTarget.duration * 100);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      clearTimeout(timeout);
    }
    return () => {
      isMounted = false;
    };
  }, [timeout]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && videoRef.current?.paused === isPlaying) {
      setIsPlaying(!isPlaying);
    }
    return () => {
      isMounted = false;
    };
  }, [videoRef.current?.paused, isPlaying]);

  const handleMouseEnter = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setModalTimeout(setTimeout(() => {
      videoRef.current?.play();
      setIsPlaying(true);
    }, START_VIDEO_TIMEOUT));
  };

  const handlePlayIconClick = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullscreenIconClick = () => {
    videoRef.current?.requestFullscreen();
  };


  if (isFilmLoading) {
    return (<LoadingScreen/>);
  }

  return (
    <div className="player" onMouseEnter={handleMouseEnter}>
      <video
        ref={videoRef}
        src={film?.videoLink}
        className="player__video"
        poster={film?.posterImage}
        onTimeUpdate={(event) => updateTimeLeft(event)}
        data-testid='videoElement'
      >
      </video>
      {film && <Link className="player__exit" to={`${AppRoute.Film}/${film?.id}`} data-testid='exitButton'>Exit</Link>}

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">-{formatDuration(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayIconClick} data-testid={isPlaying ? 'pauseButton' : 'playButton'}>
            <Icon width={19} height={19} xlinkHref={isPlaying ? '#pause' : '#play-s'}/>
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film?.name}</div>
          <button type="button" className="player__full-screen" onClick={handleFullscreenIconClick} data-testid='fullScreenButton'>
            <Icon width={27} height={27} xlinkHref="#full-screen"/>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
