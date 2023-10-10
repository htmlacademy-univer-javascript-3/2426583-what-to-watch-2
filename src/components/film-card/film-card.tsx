import {ShortFilmInfo} from '../../models/models';
import './film-card.css';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  shortFilmInfo: ShortFilmInfo;
}

export function FilmCard({shortFilmInfo}: FilmCardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img src={shortFilmInfo.imageUrl} alt={shortFilmInfo.title} />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to="/">{shortFilmInfo.title}</Link>
      </h3>
    </article>
  );
}
