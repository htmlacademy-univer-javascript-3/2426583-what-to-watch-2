import {Film} from '../../models/models';
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
import {State} from '../../models/state';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  films: Film[];
};

export default function App({films}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector((state: State) => state.authorizationStatus);

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<Main/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.MyList} element={<ProtectedRoute authorizationStatus={authorizationStatus}><MyList films={films}/></ProtectedRoute>}/>
          <Route path={AppRoute.Film}>
            <Route path=':id' element={<FilmPage films={films}/>}/>
            <Route path={`:id${AppRoute.AddReview}`} element={<AddReview films={films}/>}/>
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player films={films}/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </HistoryRouter>
  );
}
