import {useEffect} from 'react';
import {FilmsList} from '../../components/films-list/films-list';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/favorite-process/favorite-process.selectors';
import {getFavoriteFilmsAction} from '../../store/favorite-process/favorite-process-api-actions';

export function MyList(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(getFavoriteFilmsAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className='user-page'>

      <Header customClassName={'user-page__head'}>
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>{favoriteFilms.length}</span>
        </h1>
      </Header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <FilmsList films={favoriteFilms}/>
      </section>

      <Footer/>
    </div>
  );
}
