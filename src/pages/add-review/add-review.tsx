import './add-review.css';
import {UserBlock} from '../../components/user-block/user-block';
import {Logo} from '../../components/logo/logo';
import {Link, Navigate, useParams} from 'react-router-dom';
import {Film, Review} from '../../models/models';
import {AppRoute} from '../../const';
import {ReviewForm} from '../../components/review-form/review-form';
import {useState} from 'react';


type AddReviewProps = {
  films: Film[];
}

export function AddReview({films}: AddReviewProps): JSX.Element {
  const [review, setReview] = useState({
    id: 0,
    text: '',
    author: 'Matthew Lickona',
    date: new Date(),
    rating: 7.2
  });

  const params = useParams();
  const id = params.id ? Number(params.id) : -1;

  const filteredFilms = films.filter((x) => x.id === Number(id));
  if (filteredFilms.length === 0) {
    return <Navigate to={`/${AppRoute.NotFound}`} />;
  }

  const film = filteredFilms[0];

  return (
    <section className='film-card film-card--full'>
      <div className='film-card__header'>
        <div className='film-card__bg'>
          <img src={film.imageUrl} alt={film.title}/>
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
          <img src={film.imageUrl} alt={film.title}/>
        </div>
      </div>

      <ReviewForm onSend={(newReview: Review) => setReview(newReview)}></ReviewForm>
    </section>
  );
}
