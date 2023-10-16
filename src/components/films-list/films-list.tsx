import {Film} from '../../models/models';
import {useState} from 'react';
import {FilmCard} from '../film-card/film-card';

type FilmsListProps = {
  films: Film[];
}

export function FilmsList({films}: FilmsListProps): JSX.Element {
  const [selectedActiveFilmId, setSelectedActiveFilmId] = useState<number>(-1);

  return (
    <div className='catalog__films-list'>

      {
        films.map((shortFilmInfo: Film) => <FilmCard key={shortFilmInfo.id} shortFilmInfo={shortFilmInfo}/>)
      }

    </div>
  );
}
