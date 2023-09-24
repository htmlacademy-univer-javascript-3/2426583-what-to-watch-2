import {ShortFilmInfo} from '../model/models';
import './film-card.css';

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
        <a className="small-film-card__link" href="film-page.html">{shortFilmInfo.title}</a>
      </h3>
    </article>
  );
}
