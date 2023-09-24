import {Film, ShortFilmInfo} from '../model/models';
import {Main} from '../../pages/main/main';

type AppProps = {
  currentFilm: Film;
  films: ShortFilmInfo[];
};

export default function App({currentFilm, films}: AppProps): JSX.Element {
  return (
    <Main currentFilm={currentFilm} films={films}/>
  );
}
