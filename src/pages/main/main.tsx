import {Film, ShortFilmInfo} from '../../models/models';
import {FilmCard} from '../../components/film-card/film-card';
import './main.css';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';


type MainProps = {
  currentFilm: Film;
  films: ShortFilmInfo[];
}

export function Main({currentFilm, films}: MainProps): JSX.Element {
  return (
    <div>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src='../../../public/img/bg-the-grand-budapest-hotel.jpg' alt='The Grand Budapest Hotel'/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <header className='page-header film-card__head'>
          <Logo/>
          <UserBlock/>
        </header>

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src='../../../public/img/the-grand-budapest-hotel-poster.jpg' alt='The Grand Budapest Hotel poster'/>
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{currentFilm.title}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{currentFilm.genre}</span>
                <span className='film-card__year'>{currentFilm.year}</span>
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
              <a href='#' className='catalog__genres-link'>All genres</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Comedies</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Crime</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Documentary</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Dramas</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Horror</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Kids & Family</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Romance</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Sci-Fi</a>
            </li>
            <li className='catalog__genres-item'>
              <a href='#' className='catalog__genres-link'>Thrillers</a>
            </li>
          </ul>

          <div className='catalog__films-list'>
            {
              films.map((shortFilmInfo: ShortFilmInfo) => <FilmCard key={shortFilmInfo.title} shortFilmInfo={shortFilmInfo}/>)
            }
          </div>

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>Show more</button>
          </div>
        </section>

        <footer className='page-footer'>
          <div className='logo'>
            <a className='logo__link logo__link--light'>
              <span className='logo__letter logo__letter--1'>W</span>
              <span className='logo__letter logo__letter--2'>T</span>
              <span className='logo__letter logo__letter--3'>W</span>
            </a>
          </div>

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}