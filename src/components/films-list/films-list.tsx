import {useCallback, useState} from 'react';
import {FavoriteFilm, Film} from '../../models/models';
import {FilmCard} from '../film-card/film-card';

type FilmsListProps = {
  films: FavoriteFilm[];
}

export function FilmsList({films}: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number>(-1);

  const handleMouseEnter = useCallback((film: Film) => {
    setActiveFilmId(film.id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveFilmId(-1);
  }, []);

  return (
    <div className='catalog__films-list'>

      {
        films.map((shortFilmInfo: Film) => (
          <FilmCard
            key={shortFilmInfo.id}
            shortFilmInfo={shortFilmInfo}
            onMouseEnter={() => handleMouseEnter(shortFilmInfo)}
            onMouseLeave={handleMouseLeave}
            isActive={shortFilmInfo.id === activeFilmId}
          />
        ))
      }

    </div>
  );
}
