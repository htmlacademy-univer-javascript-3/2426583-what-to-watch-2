import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import {store} from './store';
import {getFilmsAction} from './store/film-process/film-process-api-actions';
import {checkAuthAction} from './store/user-process/user-process-api-actions';
import HistoryRouter from './components/history-router/history-router';
import browserHistory from './browser-history';

store.dispatch(checkAuthAction());
store.dispatch(getFilmsAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App/>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
