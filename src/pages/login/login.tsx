import {ChangeEvent, FormEvent, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Header} from '../../components/header/header';
import {Footer} from '../../components/footer/footer';
import {loginAction} from '../../store/user-process/user-process-api-actions';
import {errorHandle} from '../../services/error-handle';
import {AuthorizationStatus} from '../../const';
import {getAuthorizationStatus} from '../../store/user-process/user-process.selectors';

const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export function Login(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
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

    if (!EMAIL_PATTERN.test(login)) {
      return errorHandle('Please enter a valid email address');
    }

    if (/[a-z]/i.test(password) && /[0-9]/.test(password)) {
      dispatch(loginAction({
        login: login,
        password: password
      }));
    } else {
      errorHandle('Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character');
    }
  };

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to="/" />;
  }

  return (
    <div className='user-page'>

      <Header customClassName={'user-page__head'}/>

      <div className='sign-in user-page__content'>
        <form action='' className='sign-in__form' onSubmit={handleSubmit}>
          <div className='sign-in__fields'>
            <div className='sign-in__field'>
              <input className='sign-in__input' type='email' placeholder='Email address' name='login' id='user-email' data-testid='loginElement' onChange={handleLoginChange}/>
              <label className='sign-in__label visually-hidden' htmlFor='user-email'>Email address</label>
            </div>
            <div className='sign-in__field'>
              <input className='sign-in__input' type='password' placeholder='Password' name='password' id='user-password' data-testid='passwordElement' onChange={handlePasswordChange}/>
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
