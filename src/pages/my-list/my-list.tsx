import {Film} from '../../models/models';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';
import {FilmsList} from '../../components/films-list/films-list';


type MyListProps = {
  films: Film[];
}

export function MyList({films}: MyListProps): JSX.Element {
  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo/>
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>{films.length}</span>
        </h1>
        <UserBlock/>
      </header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <FilmsList films={films}/>
      </section>

      <footer className='page-footer'>
        <Logo/>

        <div className='copyright'>
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
