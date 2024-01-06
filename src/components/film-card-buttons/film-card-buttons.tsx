import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getFavoriteFilms} from '../../store/favorite-process/favorite-process.selectors';
import {
  changeFavoriteFilmStateAction,
  getFavoriteFilmsAction
} from '../../store/favorite-process/favorite-process-api-actions';
import {Icon} from '../icon/icon';


type FilmCardButtonsProps = {
  children?: JSX.Element | null;
  filmId: string;
}

export function FilmCardButtons({children, filmId}: FilmCardButtonsProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isFavoriteFilm = favoriteFilms.filter((favorite) => favorite.id === filmId).length > 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoriteFilmsAction());
  }, [dispatch]);

  const changeFavoriteFilmsState = () => {
    dispatch(changeFavoriteFilmStateAction({filmId: filmId, status: Number(!isFavoriteFilm)}));
  };

  return (
    <div className='film-card__buttons'>

      <Link className='btn btn--play film-card__button' to={`${AppRoute.Player}/${filmId}`}>
        <Icon width='19' height='19' xlinkHref='#play-s'/>
        <span>Play</span>
      </Link>

      {isAuth &&
        <button className='btn btn--list film-card__button' type='button' data-testid={isFavoriteFilm ? 'inListIconElement' : 'addIconElement'}>
          {isFavoriteFilm &&
            <Icon width='18' height='14' xlinkHref='#in-list'/>}
          {!isFavoriteFilm &&
            <Icon width='19' height='20' xlinkHref='#add'/>}
          <span onClick={changeFavoriteFilmsState}>My list</span>
          <span className='film-card__count'>{favoriteFilms.length}</span>
        </button>}
      {children}
    </div>
  );
}
