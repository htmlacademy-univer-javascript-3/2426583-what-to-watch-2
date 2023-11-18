import {Link} from 'react-router-dom';
import {AppRoute, USER_KEY_NAME} from '../../const';
import {useAppSelector} from '../../hooks';
import {State} from '../../models/state';
import {UserData} from '../../models/user';

export function UserBlock(): JSX.Element {
  const user: UserData | null = useAppSelector((state: State) => state.user);

  return (
    <ul className='user-block'>
      <li className='user-block__item'>
        <div className='user-block__avatar'>
          <img src={(user !== null) ? user?.avatarUrl : localStorage.getItem(USER_KEY_NAME)} alt='User avatar' width='63' height='63'/>
        </div>
      </li>
      <li className='user-block__item'>
        <Link className='user-block__link' to={AppRoute.Login}>Sign out</Link>
      </li>
    </ul>
  );
}
