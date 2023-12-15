import {Main} from '../../pages/main/main';
import {Route, Routes} from 'react-router-dom';
import Layout from '../layout/layout';
import {MyList} from '../../pages/my-list/my-list';
import {Login} from '../../pages/login/login';
import {AddReview} from '../../pages/add-review/add-review';
import {Player} from '../../pages/player/player';
import {AppRoute} from '../../const';
import {FilmPage} from '../../pages/film/film';
import {NotFound} from '../../pages/not-found/not-found';
import ProtectedRoute from '../private-route/protected-route';
import {useAppSelector} from '../../hooks';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selector';

export default function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.MyList} element={<ProtectedRoute authorizationStatus={authorizationStatus}><MyList/></ProtectedRoute>}/>
          <Route path={AppRoute.Film}>
            <Route path=':id' element={<FilmPage/>}/>
            <Route path={`:id${AppRoute.AddReview}`} element={<ProtectedRoute authorizationStatus={authorizationStatus}><AddReview/></ProtectedRoute>}/>
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </HistoryRouter>
  );
}
