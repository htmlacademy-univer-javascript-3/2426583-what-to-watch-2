import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {UserData} from '../../models/user';
import {getUser} from '../../store/user-process/user-process.selector';
import {logoutAction} from '../../store/api-actions';

export function UserBlock(): JSX.Element {
  const user: UserData | null = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <ul className='user-block'>
      <li className='user-block__item'>
        <div className='user-block__avatar'>
          <img src={(user !== null) ? user?.avatarUrl : ''} alt='User avatar' width='63' height='63'/>
        </div>
      </li>
      <li className='user-block__item'>
        <Link className='user-block__link' onClick={logout} to={''}>Sign out</Link>
      </li>
    </ul>
  );
}
