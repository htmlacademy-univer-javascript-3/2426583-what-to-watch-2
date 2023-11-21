import {useNavigate, useParams} from 'react-router-dom';
import {fetchFilmAction, fetchFilmCommentsAction, fetchSimilarFilmsAction} from '../store/api-actions';
import {useEffect} from 'react';
import {AppRoute, ReduxStateStatus} from '../const';
import {useAppDispatch} from './index';


export function useLoadFilm(): void {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id))
        .then((res) => {
          if (res?.meta.requestStatus === ReduxStateStatus.Rejected) {
            navigate(`${AppRoute.NotFound}`);
          }
        });
      dispatch(fetchSimilarFilmsAction(id));
      dispatch(fetchFilmCommentsAction(id));
    }
  }, [navigate, id]);
}
