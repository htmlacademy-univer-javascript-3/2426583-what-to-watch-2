import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, setFilmsByGenre} from '../../store/film-process/film-process.slice';
import {getGenre, getGenres} from '../../store/film-process/film-process.selectors';
import {GenreItem} from './genre-item/genre-item';


export function GenresList(): JSX.Element {
  const currentGenre: string = useAppSelector(getGenre);
  const listOfGenres: string[] = useAppSelector(getGenres);
  const dispatch = useAppDispatch();

  const handleSetGenre = useCallback((selectedGenre: string) => {
    dispatch(changeGenre(selectedGenre));
    dispatch(setFilmsByGenre(selectedGenre));
  }, [dispatch]);

  return (
    <ul className='catalog__genres-list'>
      {
        listOfGenres.map((genre) => (
          <GenreItem key={genre}
            genre={genre}
            isActive={currentGenre === genre}
            onGenreItemClick={handleSetGenre}
          />
        ))
      }
    </ul>
  );
}
