import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';

type PrivateRouteProps = {
  children: JSX.Element;
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
};

function ProtectedRoute({children, restrictedFor, redirectTo}: PrivateRouteProps): JSX.Element {
  const authorizationStatus = AuthorizationStatus.NoAuth;

  return restrictedFor === authorizationStatus ? <Navigate to={redirectTo} /> : children;
}

export default ProtectedRoute;
