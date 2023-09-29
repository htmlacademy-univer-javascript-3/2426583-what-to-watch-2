import {Film, ShortFilmInfo} from '../../models/models';
import {Main} from '../../pages/main/main';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from '../layout/layout';
import {MyList} from '../../pages/my-list/my-list';
import {Login} from '../../pages/login/login';
import {AddReview} from '../../pages/add-review/add-review';
import {Player} from '../../pages/player/player';
import {AppRoute} from '../../const';
import {FilmPage} from '../../pages/film/film';
import {NotFound} from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  currentFilm: Film;
  films: ShortFilmInfo[];
};

export default function App({currentFilm, films}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Layout/>}>
          <Route index element={<Main currentFilm={currentFilm} films={films}/>}/>
          <Route path={AppRoute.Login} element={<Login/>}/>
          <Route path={AppRoute.MyList} element={<PrivateRoute><MyList films={films}/></PrivateRoute>}/>
          <Route path={AppRoute.Film}>
            <Route path=':id' element={<FilmPage films={films}/>}/>
            <Route path=':id/review' element={<AddReview/>}/>
          </Route>
          <Route path='player/:id' element={<Player/>}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
