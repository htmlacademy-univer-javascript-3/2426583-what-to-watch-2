import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getFilmAction} from '../store/film-process/film-process-api-actions';
import {AppRoute, ReduxStateStatus} from '../const';
import {useAppDispatch} from './index';


export function useLoadFilmPlayer(): void {
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
    }
  }, [dispatch, navigate, id]);
}
