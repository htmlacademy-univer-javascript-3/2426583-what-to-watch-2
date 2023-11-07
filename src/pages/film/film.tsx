import {Film} from '../../models/models';
import './film.css';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';
import {Link, Navigate} from 'react-router-dom';
import {AppRoute, Tab} from '../../const';
import {useFilm} from '../../hooks/use-film-hook';
import {useCallback, useEffect, useState} from 'react';
import {Tabs} from '../../components/tabs/tabs';
import {Overview} from '../../components/tabs/overview';
import {Details} from '../../components/tabs/details';
import {Reviews} from '../../components/tabs/reviews-tab/reviews';
import {FilmsList} from '../../components/films-list/films-list';

const getComponentBySelectedTab = (selectedTab: Tab, film: Film) => {
  switch (selectedTab) {
    case Tab.overview:
      return <Overview film={film}></Overview>;
    case Tab.details:
      return <Details film={film}></Details>;
    case Tab.reviews:
      return <Reviews reviews={film.reviews}/>;
  }
};

type FilmPageProps = {
  films: Film[];
}

export function FilmPage({films}: FilmPageProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState(Tab.overview);
  const [moreLikeThisFilms, setMoreLikeThisFilms] = useState([]);

  const handleTabClick = useCallback((tab: Tab) => {
    setSelectedTab(tab);
  }, []);

  const film = useFilm(films);

  useEffect(() => {
    const sameGenreFilms = films.filter((filteredFilm: Film) => filteredFilm.genre === film?.genre).slice(0,4);
    setMoreLikeThisFilms(sameGenreFilms);
  }, [films, film]);

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
              <Tabs
                onTabSelected={(tab: Tab) => handleTabClick(tab)}
                selectedTab={selectedTab}
              >
              </Tabs>
              {getComponentBySelectedTab(selectedTab, film)}
            </div>
          </div>
        </div>
      </section>

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
