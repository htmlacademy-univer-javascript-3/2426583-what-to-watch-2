import {Film, FullFilm} from '../../models/models';
import './film.css';
import {Logo} from '../../components/logo/logo';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, Tab} from '../../const';
import {useCallback, useEffect, useState} from 'react';
import {Tabs} from '../../components/tabs/tabs';
import {Overview} from '../../components/tabs/overview-tab/overview';
import {Details} from '../../components/tabs/details-tab/details';
import {Reviews} from '../../components/tabs/reviews-tab/reviews';
import {FilmsList} from '../../components/films-list/films-list';
import {Header} from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {State} from '../../models/state';
import {useLoadFilm} from '../../hooks/use-film-hook';
import {LoadingScreen} from '../loading-screen/loading-screen';

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

  const isFilmLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const film: FullFilm | null = useAppSelector((state: State) => state.film);
  const similarFilms: Film[] = useAppSelector((state: State) => state.similarFilms);

  const isAuth =
    useAppSelector(
      (state) => state.authorizationStatus
    ) === AuthorizationStatus.Auth;

  useLoadFilm();

  const handleTabClick = useCallback((tab: Tab) => {
    setSelectedTab(tab);
  }, []);

  useEffect(() => {
    const sameGenreFilms = similarFilms.filter((filteredFilm: Film) => filteredFilm.genre === film?.genre).slice(0, 4);
    setMoreLikeThisFilms(sameGenreFilms);
  }, [similarFilms, film]);

  // if (isFilmLoading) {
  //   return (<TailSpin
  //     height="80"
  //     width="80"
  //     color="#dfcf77"
  //     ariaLabel="tail-spin-loading"
  //     radius="1"
  //     wrapperStyle={{'position': 'absolute', 'zIndex' : '1000', 'top': '50%', 'left': '50%', 'marginLeft': '-48px', 'marginTop': '-48px'}}
  //     wrapperClass=""
  //     visible={isFilmLoading}
  //           />);
  // }

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

            <Header className={'film-card__head'}/>

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
                      review</Link>}
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
                >
                </Tabs>
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
