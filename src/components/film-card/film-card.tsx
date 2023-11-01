import {Film} from '../../models/models';
import './film-card.css';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {VideoPlayer} from '../video-player/video-player';

type FilmCardProps = {
  shortFilmInfo: Film;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive: boolean;
}

export function FilmCard({shortFilmInfo, onMouseEnter, onMouseLeave, isActive}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="small-film-card__image"
      >
        {isActive && (
          <VideoPlayer
            src={shortFilmInfo.videoSrc}
            preview={shortFilmInfo.imageSrc}
          />
        )}
        {!isActive && (
          <img src={shortFilmInfo.imageSrc} alt={shortFilmInfo.title} />
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}/${shortFilmInfo.id}`}>{shortFilmInfo.title}</Link>
      </h3>
    </article>
  );
}
