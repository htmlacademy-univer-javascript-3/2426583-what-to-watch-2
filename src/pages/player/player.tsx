import {Navigate, useParams} from 'react-router-dom';
import {Film} from '../../models/models';
import {AppRoute} from '../../const';

type PlayerProps = {
  films: Film[];
}
export function Player({films}: PlayerProps): JSX.Element {
  const params = useParams();
  const id = params.id ? Number(params.id) : -1;

  const filteredFilms = films.filter((x) => x.id === Number(id));
  if (filteredFilms.length === 0) {
    return <Navigate to={`/${AppRoute.NotFound}`} />;
  }

  const film = filteredFilms[0];

  return (
    <div className="player">
      <video src={film.videoUrl} className="player__video" poster={film.imageUrl}/>

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
  );
}
