import {Film} from '../../models/models';
import './main.css';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';
import {Link} from 'react-router-dom';
import {FilmsList} from '../../components/films-list/films-list';


type MainProps = {
  films: Film[];
}

export function Main({films}: MainProps): JSX.Element {
  const [firstFilm] = films;
  return (
    <div>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={firstFilm.imageSrc} alt={firstFilm.title}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header film-card__head'>
          <Logo/>
          <UserBlock/>
        </header>

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={firstFilm.imageSrc} alt={firstFilm.title}/>
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{firstFilm.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{firstFilm.genre}</span>
                <span className='film-card__year'>{firstFilm.year}</span>
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
                  <span className='film-card__count'>{films.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <ul className='catalog__genres-list'>
            <li className='catalog__genres-item catalog__genres-item--active'>
              <Link to='#' className='catalog__genres-link'>All genres</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Comedies</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Crime</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Documentary</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Dramas</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Horror</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Kids & Family</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Romance</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Sci-Fi</Link>
            </li>
            <li className='catalog__genres-item'>
              <Link to='#' className='catalog__genres-link'>Thrillers</Link>
            </li>
          </ul>

          <FilmsList films={films}/>

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>Show more</button>
          </div>
        </section>

        <footer className='page-footer'>
          <Logo/>

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
