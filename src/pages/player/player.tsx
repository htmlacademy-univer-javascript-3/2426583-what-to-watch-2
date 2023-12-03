import {FullFilm} from '../../models/models';
import {useLoadFilmPlayer} from '../../hooks/use-load-film-player';
import {useAppSelector} from '../../hooks';
import {LoadingScreen} from '../loading-screen/loading-screen';
import {getFilm, getIsFilmsDataLoading} from '../../store/film-process/film-process.selector';

export function Player(): JSX.Element {
  const film: FullFilm | null = useAppSelector(getFilm);
  const isFilmLoading = useAppSelector(getIsFilmsDataLoading);

  useLoadFilmPlayer();

  return (
    <>
      {isFilmLoading && <LoadingScreen/>}
      <div className="player">
        <video src={film?.videoLink} className="player__video" poster={film?.backgroundImage}/>

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"/>
              <div className="player__toggler">Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"/>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"/>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
