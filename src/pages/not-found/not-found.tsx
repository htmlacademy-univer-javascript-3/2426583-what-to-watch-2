import {Link} from 'react-router-dom';
import './not-found.css';

export function NotFound(): JSX.Element {
  return (
    <div className='not-found-page'>
      <h1 className='page-title not-found-page__title'>
        404.
        <br/>
        <small>Page not found</small>
        <br/>
        <Link to='/' className='page-link'>Go to main page</Link>
      </h1>
    </div>
  );
}
