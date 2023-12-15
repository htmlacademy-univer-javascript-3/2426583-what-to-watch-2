import {ChangeEvent, FormEvent, useState} from 'react';
import {useAppDispatch} from '../../hooks';
import {loginAction} from '../../store/api-actions';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';


export function Login(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  function handleLoginChange(evt: ChangeEvent<HTMLInputElement>) {
    setLogin(evt.target.value);
  }

  function handlePasswordChange(evt: ChangeEvent<HTMLInputElement>) {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction({
      login: login,
      password: password
    }));
  };

  return (
    <div className='user-page'>

      <Header customClassName={'user-page__head'}/>

      <div className='sign-in user-page__content'>
        <form action='' className='sign-in__form' onSubmit={handleSubmit}>
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input className='sign-in__input' type='email' placeholder='Email address' name='login' id='user-email' onChange={handleLoginChange}/>
              <label className='sign-in__label visually-hidden' htmlFor='user-email'>Email address</label>
            </div>
            <div className='sign-in__field'>
              <input className='sign-in__input' type='password' placeholder='Password' name='password' id='user-password' onChange={handlePasswordChange}/>
              <label className='sign-in__label visually-hidden' htmlFor='user-password'>Password</label>
            </div>
          </div>
          <div className='sign-in__submit'>
            <button className='sign-in__btn' type='submit'>Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}
