import {Link} from 'react-router-dom';
import {FullFilm} from '../../models/models';
import {AppRoute} from '../../const';
import {ReviewForm} from '../../components/review-form/review-form';
import {Header} from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {getFilm} from '../../store/film-process/film-process.selectors';
import {NotFound} from '../not-found/not-found';
import './add-review.css';


export function AddReview(): JSX.Element {
  const film: FullFilm | null = useAppSelector(getFilm);

  if (!film) {
    return (<NotFound></NotFound>);
  }

  return (
    <section className='film-card film-card--full' data-testid='reviewElement'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>
        <Header customClassName={''}>
          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link to={`${AppRoute.Film}/${film.id}`} className='breadcrumbs__link' data-testid='filmNameElement'>{film.name}</Link>
              </li>
              <li className='breadcrumbs__item'>
                <Link className='breadcrumbs__link' to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`}>Add review</Link>
              </li>
            </ul>
          </nav>
        </Header>

        <div className='film-card__poster film-card__poster--small'>
          <img src={film.posterImage} alt={film.name}/>
        </div>
      </div>

      <ReviewForm filmId={film.id}></ReviewForm>
    </section>
  );
}
