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
} from '../../store/film-process/film-process.selector';
import {FilmCardButtons} from '../../components/film-card-buttons/film-card-buttons';
import {getPromoFilmAction} from '../../store/api-actions';
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
    dispatch(getPromoFilmAction());
  }, [dispatch]);

  useEffect(() => {
    setMaxShownFilms(COUNT_OF_FILMS_SHOWN);
  }, [filmsByGenre]);

  const showMore = useCallback(() => {
    setMaxShownFilms(maxShownFilms + COUNT_OF_FILMS_SHOWN);
  }, [maxShownFilms]);

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
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name}/>
        </div>

        <h1 className='visually-hidden'>WTW</h1>

        <Header customClassName={'film-card__head'}/>

        <div className='film-card__wrap'>
          <div className='film-card__info'>
            <div className='film-card__poster'>
              <img src={promoFilm?.posterImage} alt={promoFilm?.name}/>
            </div>

            <div className='film-card__desc'>
              <h2 className='film-card__title'>{promoFilm?.name}</h2>
              <p className='film-card__meta'>
                <span className='film-card__genre'>{promoFilm?.genre}</span>
                <span className='film-card__year'>{promoFilm?.released}</span>
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
