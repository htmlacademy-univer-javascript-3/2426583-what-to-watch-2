import {Logo} from '../logo/logo';

export function Footer(): JSX.Element {
  return (
    <footer className='page-footer'>
      <Logo/>

      <div className='copyright'>
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
}
