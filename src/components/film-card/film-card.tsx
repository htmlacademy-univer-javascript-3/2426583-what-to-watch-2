import React from 'react';
import {Link} from 'react-router-dom';
import {FavoriteFilm} from '../../models/models';
import {AppRoute} from '../../const';
import {VideoPlayer} from '../video-player/video-player';
import './film-card.css';


type FilmCardProps = {
  shortFilmInfo: FavoriteFilm;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive: boolean;
}

export const FilmCard = React.memo(({shortFilmInfo, onMouseEnter, onMouseLeave, isActive}: FilmCardProps): JSX.Element => (
  <article className="small-film-card catalog__films-card">
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="small-film-card__image"
    >
      {isActive && (
        <VideoPlayer
          src={shortFilmInfo.previewVideoLink}
          poster={shortFilmInfo.previewImage}
        />
      )}
      {!isActive && (
        <img src={shortFilmInfo.previewImage} alt={shortFilmInfo.name} />
      )}
    </div>
    <h3 className="small-film-card__title">
      <Link className="small-film-card__link" to={`${AppRoute.Film}/${shortFilmInfo.id}`}>{shortFilmInfo.name}</Link>
    </h3>
  </article>
));

FilmCard.displayName = 'FilmCard';
