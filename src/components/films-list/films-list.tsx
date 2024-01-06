import {useCallback, useState} from 'react';
import {Film} from '../../models/models';
import {FilmCard} from '../film-card/film-card';

type FilmsListProps = {
  films: Film[];
}

export function FilmsList({films}: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<string>('');

  const handleMouseEnter = useCallback((film: Film) => {
    setActiveFilmId(film.id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveFilmId('');
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
