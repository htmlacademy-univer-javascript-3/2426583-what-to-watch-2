import {Logo} from '../logo/logo';
import {UserBlock} from '../user-block/user-block';
import {useAppSelector} from '../../hooks';
import {State} from '../../models/state';
import {AppRoute, AuthorizationStatus} from '../../const';
import classnames from 'classnames';

type HeaderProps = {
  children: JSX.Element | null;
  customClassName: string;
}
export function Header({ children , customClassName}: HeaderProps): JSX.Element {
  const authorizationStatus: AuthorizationStatus = useAppSelector((state: State) => state.authorizationStatus);
  return (
    <header className={classnames('page-header', customClassName)}>
      <Logo/>
      {children}
      { authorizationStatus === AuthorizationStatus.Auth && <UserBlock/>}
      { (authorizationStatus !== AuthorizationStatus.Auth && window.location.pathname === AppRoute.Login) && <h1 className='page-title user-page__title'>Sign in</h1>}
    </header>);
}
