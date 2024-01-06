import classNames from 'classnames';
import React from 'react';

type GenreItemProps = {
  genre: string;
  isActive: boolean;
  onGenreItemClick: (genre: string) => void;
}

export const GenreItem = React.memo(({genre, isActive, onGenreItemClick}: GenreItemProps): JSX.Element => (
  <li className={classNames({'catalog__genres-item' : true, 'catalog__genres-item--active' : isActive})} data-testid='genreElement'>
    <div onClick={() => onGenreItemClick(genre)} className='catalog__genres-link'>{genre}</div>
  </li>
));

GenreItem.displayName = 'GenreItem';
