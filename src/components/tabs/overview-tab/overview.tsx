import {FullFilm} from '../../../models/models';
import {useFilmRating} from './overview-utils';

type OverviewProps = {
  film: FullFilm;
}

export function Overview({film}: OverviewProps): JSX.Element {
  return (
    <div>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{useFilmRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {film.starring.join(', ')} and other
          </strong>
        </p>
      </div>
    </div>
  );
}
