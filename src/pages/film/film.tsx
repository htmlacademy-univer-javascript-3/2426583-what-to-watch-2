import {Film, FullFilm} from '../../models/models';
import './film.css';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, Tab} from '../../const';
import {useCallback, useEffect, useState} from 'react';
import {Overview} from '../../components/tabs/overview-tab/overview';
import {Details} from '../../components/tabs/details-tab/details';
import {Reviews} from '../../components/tabs/reviews-tab/reviews';
import {FilmsList} from '../../components/films-list/films-list';
import {Header} from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {useLoadFilm} from '../../hooks/use-load-film';
import {LoadingScreen} from '../loading-screen/loading-screen';
import {Footer} from '../../components/footer/footer';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selector';
import {getFilm, getIsFilmsDataLoading, getSimilarFilms} from '../../store/film-process/film-process.selector';
import Tabs from '../../components/tabs/tabs';

const getComponentBySelectedTab = (selectedTab: Tab, film: FullFilm) => {
  switch (selectedTab) {
    case Tab.overview:
      return <Overview film={film}></Overview>;
    case Tab.details:
      return <Details film={film}></Details>;
    case Tab.reviews:
      return <Reviews/>;
  }
};

export function FilmPage(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(Tab.overview);
  const [moreLikeThisFilms, setMoreLikeThisFilms] = useState<Film[]>([]);

  const isFilmLoading = useAppSelector(getIsFilmsDataLoading);
  const film: FullFilm | null = useAppSelector(getFilm);
  const similarFilms: Film[] = useAppSelector(getSimilarFilms);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  useLoadFilm();

  const handleTabClick = useCallback((tab: Tab) => {
    setSelectedTab(tab);
  }, []);

  useEffect(() => {
    const sameGenreFilms = similarFilms.filter((filteredFilm: Film) => filteredFilm.genre === film?.genre).slice(0, 4);
    setMoreLikeThisFilms(sameGenreFilms);
  }, [similarFilms, film]);

  return (
    <>
      {isFilmLoading && <LoadingScreen/>}
      {film &&
        <section className='film-card film-card--full'>
          <div className='film-card__hero'>
            <div className='film-card__bg'>
              <img src={film.backgroundImage} alt={film.name}/>
            </div>

            <h1 className='visually-hidden'>WTW</h1>

            <Header customClassName={'film-card__head'}></Header>

            <div className='film-card__wrap'>
              <div className='film-card__desc'>
                <h2 className='film-card__title'>{film.name}</h2>
                <p className='film-card__meta'>
                  <span className='film-card__genre'>{film.genre}</span>
                  <span className='film-card__year'>{film.released}</span>
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
                  {isAuth &&
                    <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className='btn film-card__button'>Add
                      review
                    </Link>}
                </div>
              </div>
            </div>
          </div>

          <div className='film-card__wrap film-card__translate-top'>
            <div className='film-card__info'>
              <div className='film-card__poster film-card__poster--big'>
                <img src={film.posterImage} alt={film.name}/>
              </div>

              <div className='film-card__desc'>
                <Tabs
                  onTabSelected={handleTabClick}
                  selectedTab={selectedTab}
                />
                {getComponentBySelectedTab(selectedTab, film)}
              </div>
            </div>
          </div>
        </section>}

      <div className='page-content'>
        <section className='catalog catalog--like-this'>
          <h2 className='catalog__title'>More like this</h2>

          <FilmsList films={moreLikeThisFilms}/>
        </section>

        <Footer/>
      </div>
    </>
  );
}
