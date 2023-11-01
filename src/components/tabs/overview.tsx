import {Film} from '../../models/models';

type OverviewProps = {
  film: Film;
}

export function Overview({film}: OverviewProps): JSX.Element {
  return (
    <div>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating.score}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{film.rating.level}</span>
          <span className="film-rating__count">{film.rating.count} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description.info}</p>

        <p className="film-card__director"><strong>Director: {film.description.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {film.description.starring.join(', ')} and other
          </strong>
        </p>
      </div>
    </div>
  );
}
