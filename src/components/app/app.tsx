import {Film} from '../../models/models';
import {Main} from '../../pages/main/main';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from '../layout/layout';
import {MyList} from '../../pages/my-list/my-list';
import {Login} from '../../pages/login/login';
import {AddReview} from '../../pages/add-review/add-review';
import {Player} from '../../pages/player/player';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FilmPage} from '../../pages/film/film';
import {NotFound} from '../../pages/not-found/not-found';
import ProtectedRoute from '../private-route/protected-route';

type AppProps = {
  films: Film[];
};

export default function App({films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<Main cfilms={films}/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.MyList} element={<ProtectedRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Login}><MyList films={films}/></ProtectedRoute>}/>
          <Route path={AppRoute.Film}>
            <Route path=':id' element={<FilmPage films={films}/>}/>
            <Route path={`:id${AppRoute.AddReview}`} element={<AddReview films={films}/>}/>
          </Route>
          <Route path={`${AppRoute.Player}/:id`} element={<Player films={films}/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
