import {Film} from '../../models/models';
import {Logo} from '../../components/logo/logo';
import {FilmsList} from '../../components/films-list/films-list';
import {Header} from '../../components/header/header';


type MyListProps = {
  films: Film[];
}

export function MyList({films}: MyListProps): JSX.Element {
  return (
    <div className='user-page'>

      <Header customClassName={'user-page__head'}>
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>{films.length}</span>
        </h1>
      </Header>

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
