import {Link, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {UserData} from '../../models/user';
import {getUser} from '../../store/user-process/user-process.selectors';
import {logoutAction} from '../../store/user-process/user-process-api-actions';
import {AppRoute} from '../../const';

export function UserBlock(): JSX.Element {
  const user: UserData | null = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(logoutAction());
  };

  const handleMyListClick = () => {
    navigate(AppRoute.MyList);
  };

  return (
    <ul className='user-block'>
      <li className='user-block__item'>
        <div className='user-block__avatar'>
          <img src={(user !== null) ? user?.avatarUrl : ''} alt='User avatar' width='63' height='63'
            onClick={handleMyListClick}
          />
        </div>
      </li>
      <li className='user-block__item'>
        <Link className='user-block__link' onClick={handleLogoutClick} to={''}>Sign out</Link>
      </li>
    </ul>
  );
}
