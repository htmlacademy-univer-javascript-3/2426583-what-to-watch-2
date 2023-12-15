import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getFilmAction, getFilmCommentsAction, getSimilarFilmsAction} from '../store/api-actions';
import {AppRoute, ReduxStateStatus} from '../const';
import {useAppDispatch} from './index';


export function useLoadFilm(): void {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getFilmAction(id))
        .then((res) => {
          if (res?.meta.requestStatus === ReduxStateStatus.Rejected) {
            navigate(`${AppRoute.NotFound}`);
          }
        });
      dispatch(getSimilarFilmsAction(id));
      dispatch(getFilmCommentsAction(id));
    }
  }, [dispatch, navigate, id]);
}
