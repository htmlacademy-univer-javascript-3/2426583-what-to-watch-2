import {FilmsList} from '../../components/films-list/films-list';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';


export function MyList(): JSX.Element {
  return (
    <div className='user-page'>

      <Header customClassName={'user-page__head'}>
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>{[].length}</span>
        </h1>
      </Header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <FilmsList films={[]}/>
      </section>

      <Footer/>
    </div>
  );
}
