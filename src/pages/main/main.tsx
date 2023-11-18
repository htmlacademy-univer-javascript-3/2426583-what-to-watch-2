import './main.css';
import {Logo} from '../../components/logo/logo';
import {FilmsList} from '../../components/films-list/films-list';
import {GenresList} from '../../components/genres-list/genres-list';
import {FILMS} from '../../mocks/films';
import {Film} from '../../models/models';
import {useAppSelector} from '../../hooks';
import {State} from '../../models/state';
import {useEffect, useState} from 'react';
import {ShowMoreBtn} from './show-more-btn/show-more-btn';
import {TailSpin} from 'react-loader-spinner';
import {Header} from '../../components/header/header';

const COUNT_OF_FILMS_SHOWN = 8;
export function Main(): JSX.Element {
  const filmsByGenre: Film[] = useAppSelector((state: State) => state.filmsByGenre);
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const [maxShownFilms, setMaxShownFilms] = useState(8);
  const isShowMoreButtonVisible = maxShownFilms < filmsByGenre.length;
  const firstFilm = FILMS[0];

  useEffect(() => {
    setMaxShownFilms(COUNT_OF_FILMS_SHOWN);
  }, [filmsByGenre]);

  const showMore = () => {
    setMaxShownFilms(maxShownFilms + COUNT_OF_FILMS_SHOWN);
  };

  return (
    <div>
      <TailSpin
        height="80"
        width="80"
        color="#dfcf77"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{'position': 'absolute', 'zIndex' : '1000', 'top': '50%', 'left': '50%', 'margin-left': '-48px', 'margin-top': '-48px'}}
        wrapperClass=""
        visible={isFilmsDataLoading}
      />
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={firstFilm.previewImage} alt={firstFilm.name}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header customClassName={'film-card__head'}/>

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={firstFilm.previewImage} alt={firstFilm.name}/>
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{firstFilm.name}</h2>
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
                  <span className='film-card__count'>{filmsByGenre.length}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <GenresList></GenresList>

          <FilmsList films={filmsByGenre.slice(0, maxShownFilms)}/>

          {isShowMoreButtonVisible && <ShowMoreBtn handleClick={showMore}></ShowMoreBtn>}
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
