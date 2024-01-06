import {useCallback, useEffect, useState} from 'react';
import {TailSpin} from 'react-loader-spinner';
import {FilmsList} from '../../components/films-list/films-list';
import {GenresList} from '../../components/genres-list/genres-list';
import {Film, PromoFilm} from '../../models/models';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {
  getFilmsByGenre,
  getIsFilmsDataLoading,
  getPromoFilm
} from '../../store/film-process/film-process.selectors';
import {FilmCardButtons} from '../../components/film-card-buttons/film-card-buttons';
import {getPromoFilmAction} from '../../store/film-process/film-process-api-actions';
import {ShowMoreBtn} from './show-more-btn/show-more-btn';
import './main.css';

const COUNT_OF_FILMS_SHOWN = 8;
export function Main(): JSX.Element {
  const isFilmsDataLoading = useAppSelector(getIsFilmsDataLoading);
  const promoFilm: PromoFilm | null = useAppSelector(getPromoFilm);
  const dispatch = useAppDispatch();

  const filmsByGenre: Film[] = useAppSelector(getFilmsByGenre);
  const [maxShownFilms, setMaxShownFilms] = useState<number>(COUNT_OF_FILMS_SHOWN);
  const isShowMoreButtonVisible = maxShownFilms < filmsByGenre.length;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getPromoFilmAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setMaxShownFilms(COUNT_OF_FILMS_SHOWN);
    }
    return () => {
      isMounted = false;
    };
  }, [filmsByGenre]);

  const showMore = useCallback(() => {
    setMaxShownFilms(maxShownFilms + COUNT_OF_FILMS_SHOWN);
  }, [maxShownFilms]);

  return (
    <div>
      <div data-testid='spinnerElement'>
        <TailSpin
          height="80"
          width="80"
          color="#dfcf77"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperClass="preloader"
          visible={isFilmsDataLoading}
        />
      </div>
      <section className='film-card'>
        <div className='film-card__bg'>
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header customClassName={'film-page-card__head'}/>

        <div className='film-card__wrap' data-testid='filmCardMainElement'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={promoFilm?.posterImage} alt={promoFilm?.name}/>
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title' data-testid='titleElement'>{promoFilm?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre' data-testid='cardGenreElement'>{promoFilm?.genre}</span>
                <span className='film-card__year' data-testid='yearElement'>{promoFilm?.released}</span>
              </p>

              { promoFilm && <FilmCardButtons filmId={promoFilm?.id}></FilmCardButtons>}
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

        <Footer/>
      </div>
    </div>
  );
}
