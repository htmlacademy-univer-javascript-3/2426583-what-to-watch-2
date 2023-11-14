import './add-review.css';
import {UserBlock} from '../../components/user-block/user-block';
import {Logo} from '../../components/logo/logo';
import {Link, Navigate} from 'react-router-dom';
import {Film, UserReview} from '../../models/models';
import {AppRoute} from '../../const';
import {ReviewForm} from '../../components/review-form/review-form';
import {useState} from 'react';
import {useFilm} from '../../hooks/use-film-hook';


type AddReviewProps = {
  films: Film[];
}

const defaultReview: UserReview = {
  id: 0,
  text: '',
  author: 'Matthew Lickona',
  date: new Date(),
  rating: 7.2
};

export function AddReview({films}: AddReviewProps): JSX.Element {
  const [review, setReview] = useState(defaultReview);
  const film = useFilm(films);

  if (!film) {
    return <Navigate to={`${AppRoute.NotFound}`} />;
  }

  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={film.imageSrc} alt={film.title}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header'>
          <Logo/>

          <nav className='breadcrumbs'>
            <ul className='breadcrumbs__list'>
              <li className='breadcrumbs__item'>
                <Link to={`${AppRoute.Film}/${film.id}`} className='breadcrumbs__link'>{film.title}</Link>
              </li>
              <li className='breadcrumbs__item'>
                <Link className='breadcrumbs__link' to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`}>Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className='film-card__poster film-card__poster--small'>
          <img src={film.imageSrc} alt={film.title}/>
        </div>
      </div>

      <ReviewForm onSend={setReview}></ReviewForm>
    </section>
  );
}
