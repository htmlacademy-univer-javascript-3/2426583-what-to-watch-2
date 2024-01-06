import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Film} from '../../models/models';
import {AppRoute} from '../../const';
import {VideoPlayer} from '../video-player/video-player';
import './film-card.css';


type FilmCardProps = {
  shortFilmInfo: Film;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive: boolean;
}

export const FilmCard = React.memo(({shortFilmInfo, onMouseEnter, onMouseLeave, isActive}: FilmCardProps): JSX.Element => {
  const navigate = useNavigate();

  const goToFilm = () => {
    navigate(`${AppRoute.Film}/${shortFilmInfo.id}`);
  };

  return (
    <article className="small-film-card catalog__films-card">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={goToFilm}
        className="small-film-card__image"
        data-testid='smallFilmCardElement'
      >
        {isActive && (
          <div data-testid='videoElement'>
            <VideoPlayer
              src={shortFilmInfo.previewVideoLink}
              poster={shortFilmInfo.previewImage}
            />
          </div>
        )}
        {!isActive && (
          <img src={shortFilmInfo.previewImage} alt={shortFilmInfo.name} data-testid='imageElement'/>
        )}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}/${shortFilmInfo.id}`} data-testid='filmNameElement'>{shortFilmInfo.name}</Link>
      </h3>
    </article>
  );
});

FilmCard.displayName = 'FilmCard';
