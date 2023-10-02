import {ShortFilmInfo} from '../../models/models';
import {FilmCard} from '../../components/film-card/film-card';
import {Logo} from '../../components/logo/logo';
import {UserBlock} from '../../components/user-block/user-block';


type MyListProps = {
  films: ShortFilmInfo[];
}

export function MyList({films}: MyListProps): JSX.Element {
  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo/>
        <h1 className='page-title user-page__title'>My list <span className='user-page__film-count'>9</span></h1>
        <UserBlock/>
      </header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <div className='catalog__films-list'>

          {
            films.map((shortFilmInfo: ShortFilmInfo) => <FilmCard key={shortFilmInfo.title} shortFilmInfo={shortFilmInfo}/>)
          }

        </div>
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
