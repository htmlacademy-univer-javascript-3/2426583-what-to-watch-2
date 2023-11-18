import {useNavigate, useParams} from 'react-router-dom';
import {store} from '../store';
import {fetchFilmAction, fetchFilmCommentsAction, fetchSimilarFilmsAction} from '../store/api-actions';
import {useEffect} from 'react';
import {AppRoute, ReduxStateStatus} from '../const';


export function useLoadFilm(): void {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      store.dispatch(fetchFilmAction(id))
        .then((res) => {
          if (res?.meta.requestStatus === ReduxStateStatus.Rejected) {
            navigate(`${AppRoute.NotFound}`);
          }
        });
      store.dispatch(fetchSimilarFilmsAction(id));
      store.dispatch(fetchFilmCommentsAction(id));
    }
  }, [navigate, id]);
}
