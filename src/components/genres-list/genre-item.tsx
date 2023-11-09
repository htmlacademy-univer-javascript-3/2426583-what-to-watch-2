import classNames from 'classnames';

type GenreItemProps = {
  genre: string;
  isActive: boolean;
  onGenreItemClick: (genre: string) => void;
}
export function GenreItem({genre, isActive, onGenreItemClick}: GenreItemProps): JSX.Element {
  return (
    <li className={classNames({'catalog__genres-item' : true, 'catalog__genres-item--active' : isActive})}>
      <div onClick={() => onGenreItemClick(genre)} className='catalog__genres-link'>{genre}</div>
    </li>
  );
}
