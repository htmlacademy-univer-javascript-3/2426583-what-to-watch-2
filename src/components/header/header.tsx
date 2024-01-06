import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';
import {Logo} from '../logo/logo';
import {UserBlock} from '../user-block/user-block';

type HeaderProps = {
  children?: JSX.Element | null;
  customClassName: string;
}

export function Header({children, customClassName}: HeaderProps): JSX.Element {
  const authorizationStatus: AuthorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <header className={classnames('page-header', customClassName)}>
      <Logo/>
      {children}
      {authorizationStatus === AuthorizationStatus.Auth && <UserBlock/>}
      {(authorizationStatus !== AuthorizationStatus.Auth && window.location.pathname === AppRoute.Login) &&
        <h1 className='page-title user-page__title'>Sign in</h1>}
      {(authorizationStatus !== AuthorizationStatus.Auth && window.location.pathname !== AppRoute.Login) &&
        <Link to={AppRoute.Login} className="user-block user-block__link">
          Sign in
        </Link>}
    </header>);
}
