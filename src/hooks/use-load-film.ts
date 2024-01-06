import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getFilmAction, getSimilarFilmsAction} from '../store/film-process/film-process-api-actions';
import {AppRoute, ReduxStateStatus} from '../const';
import {getFilmCommentsAction} from '../store/comment-process/comment-process-api-actions';
import {useAppDispatch} from './index';


export function useLoadFilm(): void {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted && id) {
      dispatch(getFilmAction(id))
        .then((res) => {
          if (res?.meta.requestStatus === ReduxStateStatus.Rejected) {
            navigate(`${AppRoute.NotFound}`);
          }
        });
      dispatch(getSimilarFilmsAction(id));
      dispatch(getFilmCommentsAction(id));
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, navigate, id]);
}
