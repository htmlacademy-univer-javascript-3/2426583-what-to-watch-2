import {Film} from '../../models/models';
import './film-card.css';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type FilmCardProps = {
  shortFilmInfo: Film;
}

export function FilmCard({shortFilmInfo}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={shortFilmInfo.imageUrl} alt={shortFilmInfo.title} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Film}/${shortFilmInfo.id}`}>{shortFilmInfo.title}</Link>
      </h3>
    </article>
  );
}
