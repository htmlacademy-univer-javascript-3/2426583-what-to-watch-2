import {Film} from '../models/models';
import {useParams} from 'react-router-dom';


export function useFilm(films: Film[]): Film | null {
  const { id = '' } = useParams();
  const filteredFilms = films.filter((film) => film.id === Number(id));

  return (filteredFilms.length) ? filteredFilms[0] : null;
}
