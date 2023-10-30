import {Film} from '../../models/models';
import {FilmCard} from '../../components/film-card/film-card';
import './film.css';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';
import {Link, Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useFilm} from '../../hooks/use-film-hook';

type FilmPageProps = {
  films: Film[];
}

export function FilmPage({films}: FilmPageProps): JSX.Element {
  const film = useFilm(films);

  if (!film) {
    return <Navigate to={`${AppRoute.NotFound}`} />;
  }

  return (
    <>
      <section className='film-card film-card--full'>
        <div className='film-card__hero'>
          <div className='film-card__bg'>
            <img src={film.imageSrc} alt={film.title}/>
          </div>

          <h1 className='visually-hidden'>WTW</h1>

          <header className='page-header film-card__head'>
            <Logo/>
            <UserBlock/>
          </header>

          <div className='film-card__wrap'>
            <div className='film-card__desc'>
              <h2 className='film-card__title'>{film.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{film.genre}</span>
                <span className='film-card__year'>{film.year}</span>
              </p>

              <div className='film-card__buttons'>
                <button className='btn btn--play film-card__button' type='button'>
                  <svg viewBox='0 0 19 19' width='19' height='19'>
                    <use xlinkHref='#play-s'/>
                  </svg>
                  <span>Play</span>
                </button>
                <button className='btn btn--list film-card__button' type='button'>
                  <svg viewBox='0 0 19 20' width='19' height='20'>
                    <use xlinkHref='#add'/>
                  </svg>
                  <span>My list</span>
                  <span className='film-card__count'>9</span>
                </button>
                <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className='btn film-card__button'>Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className='film-card__wrap film-card__translate-top'>
          <div className='film-card__info'>
            <div className='film-card__poster film-card__poster--big'>
              <img src={film.imageSrc} alt={film.title}/>
            </div>

            <div className='film-card__desc'>
              <nav className='film-nav film-card__nav'>
                <ul className='film-nav__list'>
                  <li className='film-nav__item film-nav__item--active'>
                    <Link to='/' className='film-nav__link'>Overview</Link>
                  </li>
                  <li className='film-nav__item'>
                    <Link to='/' className='film-nav__link'>Details</Link>
                  </li>
                  <li className='film-nav__item'>
                    <Link to='/' className='film-nav__link'>Reviews</Link>
                  </li>
                </ul>
              </nav>

              <div className='film-rating'>
                <div className='film-rating__score'>{film.rating.score}</div>
                <p className='film-rating__meta'>
                  <span className='film-rating__level'>{film.rating.level}</span>
                  <span className='film-rating__count'>{film.rating.count}</span>
                </p>
              </div>

              <div className='film-card__text'>
                <p>{film.description.info}</p>
                <p className='film-card__director'><strong>Director: {film.description.director}</strong></p>

                <p className='film-card__starring'><strong>Starring: {film.description.starring}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <div className='catalog__films-list'>
            {
              films.map((shortFilmInfo: Film) => <FilmCard key={shortFilmInfo.title} shortFilmInfo={shortFilmInfo}/>)
            }
          </div>
        </section>

        <footer className='page-footer'>
          <Logo/>

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
