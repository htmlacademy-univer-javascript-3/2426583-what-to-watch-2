import {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Film, FullFilm} from '../../models/models';
import {AppRoute, AuthorizationStatus, Tab} from '../../const';
import {Overview} from '../../components/tabs/overview/overview';
import {Details} from '../../components/tabs/details/details';
import {Reviews} from '../../components/tabs/reviews/reviews';
import {FilmsList} from '../../components/films-list/films-list';
import {Header} from '../../components/header/header';
import {useAppSelector} from '../../hooks';
import {useLoadFilm} from '../../hooks/use-load-film';
import {Footer} from '../../components/footer/footer';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import {getFilm, getIsFilmsDataLoading, getSimilarFilms} from '../../store/film-process/film-process.selectors';
import {FilmCardButtons} from '../../components/film-card-buttons/film-card-buttons';
import {Tabs} from '../../components/tabs/tabs';
import {LoadingScreen} from '../loading-screen/loading-screen';
import './film-page.css';

const getComponentBySelectedTab = (selectedTab: Tab, film: FullFilm) => {
  switch (selectedTab) {
    case Tab.Overview:
      return <Overview film={film}></Overview>;
    case Tab.Details:
      return <Details film={film}></Details>;
    case Tab.Reviews:
      return <Reviews/>;
  }
};

export function FilmPage(): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(Tab.Overview);
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
    let isMounted = true;
    if (isMounted) {
      const sameGenreFilms = similarFilms.filter((filteredFilm: Film) => filteredFilm.genre === film?.genre).slice(0, 4);
      setMoreLikeThisFilms(sameGenreFilms);
    }
    return () => {
      isMounted = false;
    };
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

            <Header customClassName={'film-page-card__head'}/>

            <div className='film-card__wrap' data-testid='filmCardElement'>
              <div className='film-card__desc'>
                <h2 className='film-card__title' data-testid='titleElement'>{film.name}</h2>
                <p className='film-card__meta'>
                  <span className='film-card__genre' data-testid='genreElement'>{film.genre}</span>
                  <span className='film-card__year' data-testid='yearElement'>{film.released}</span>
                </p>

                <FilmCardButtons filmId={film.id}>
                  {isAuth ?
                    <Link to={`${AppRoute.Film}/${film.id}${AppRoute.AddReview}`} className='btn film-card__button' data-testid='linkToReviewElement'>Add
                      review
                    </Link> : null}
                </FilmCardButtons>
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
