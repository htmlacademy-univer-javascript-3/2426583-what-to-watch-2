import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selector';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getFavoriteFilms} from '../../store/favorite-process/favorite-process.selector';
import {changeFavoriteFilmStateAction, getFavoriteFilmsAction} from '../../store/api-actions';


type FilmCardButtonsProps = {
  children?: JSX.Element | null;
  filmId: number;
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
        <svg viewBox='0 0 19 19' width='19' height='19'>
          <use xlinkHref='#play-s'/>
        </svg>
        <span>Play</span>
      </Link>

      {isAuth &&
        <button className='btn btn--list film-card__button' type='button'>
          {isFavoriteFilm &&
            <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"></use>
            </svg>}
          {!isFavoriteFilm &&
            <svg viewBox='0 0 19 20' width='19' height='20'>
              <use xlinkHref='#add'/>
            </svg>}
          <span onClick={changeFavoriteFilmsState}>My list</span>
          <span className='film-card__count'>{favoriteFilms.length}</span>
        </button>}
      {children}
    </div>
  );
}
