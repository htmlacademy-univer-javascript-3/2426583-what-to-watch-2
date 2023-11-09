import {useAppDispatch, useAppSelector} from '../../hooks';
import {GENRE_FOR_ALL_FILMS} from '../../const';
import {GenreItem} from './genre-item';
import {changeGenre, getFilmsByGenre} from '../../store/action';
import {State} from '../../models/state';
import {useMemo} from 'react';
import {FILMS} from '../../mocks/films';

export function GenresList(): JSX.Element {
  const currentGenre: string = useAppSelector((state: State) => state.genre);
  const dispatch = useAppDispatch();

  const listOfGenres = useMemo(() => {
    const newListOfGenres = new Set<string>();
    FILMS.forEach((film) => newListOfGenres.add(film.genre));
    return [GENRE_FOR_ALL_FILMS, ...newListOfGenres.values()];
  }, []);

  const handleSetGenre = (selectedGenre: string) => {
    dispatch(changeGenre(selectedGenre));
    dispatch(getFilmsByGenre());
  };

  return (
    <ul className='catalog__genres-list'>
      {
        listOfGenres.map((genre) => (
          <GenreItem key={genre}
            genre={genre}
            isActive={currentGenre === genre}
            onGenreItemClick={(selectedGenre: string) => handleSetGenre(selectedGenre)}
          >
          </GenreItem>
        ))
      }
    </ul>
  );
}
