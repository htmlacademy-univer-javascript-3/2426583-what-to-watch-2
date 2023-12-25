import {FullFilm} from '../../../models/models';
import {useFilmRating} from './overview-utils';

type OverviewProps = {
  film: FullFilm;
}

export function Overview({film}: OverviewProps): JSX.Element {
  return (
    <div>
      <div className="film-rating">
        <div className="film-rating__score" data-testid="score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level" data-testid="level">{useFilmRating(film.rating)}</span>
          <span className="film-rating__count" data-testid="count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p data-testid="description">{film.description}</p>

        <p className="film-card__director" data-testid="director"><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring" data-testid="starring">
          <strong>Starring: {film.starring.join(', ')} and other
          </strong>
        </p>
      </div>
    </div>
  );
}
