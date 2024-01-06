import {internet, random} from 'faker';
import {expect} from 'vitest';
import {AuthData, UserData} from '../../models/user';
import {UserProcess} from '../../models/state';
import {AuthorizationStatus} from '../../const';
import {getToken} from '../../services/token';
import {userProcessSlice} from './user-process.slice';
import {checkAuthAction, loginAction, logoutAction} from './user-process-api-actions';

describe('User process slice', () => {
  const FAKE_USER: UserData = {
    name: internet.email(),
    avatarUrl: internet.avatar(),
    email: internet.email(),
    token: random.float.toString()
  };
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: FAKE_USER
    };
    const result = userProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', ()=> {
    const emptyAction = { type: '' };
    const expectedState: UserProcess = {
      authorizationStatus: (getToken() !== '') ? AuthorizationStatus.Auth : AuthorizationStatus.Unknown,
      user: null
    };

    const result = userProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Unknown", "user" to "null" with "checkAuthAction.pending"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null
    };

    const result = userProcessSlice.reducer(undefined, checkAuthAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Auth", set "user" with "checkAuthAction.fulfilled"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: FAKE_USER
    };

    const result = userProcessSlice.reducer(
      undefined,
      checkAuthAction.fulfilled(
        FAKE_USER, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", "user" to "null" with "checkAuthAction.rejected"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };

    const result = userProcessSlice.reducer(undefined, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Unknown", "user" to "null" with "loginAction.pending"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null
    };

    const result = userProcessSlice.reducer(undefined, loginAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "Auth", set "user" with "loginAction.fulfilled"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: FAKE_USER
    };
    const authData: AuthData = {
      login: internet.email(),
      password: internet.password(10)
    };

    const result = userProcessSlice.reducer(
      undefined,
      loginAction.fulfilled(
        FAKE_USER, '', authData)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", "user" to "null" with "loginAction.rejected"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };

    const result = userProcessSlice.reducer(undefined, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "authorizationStatus" to "NoAuth", "user" to "null" with "logoutAction.fulfilled"', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null
    };

    const result = userProcessSlice.reducer(undefined, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
