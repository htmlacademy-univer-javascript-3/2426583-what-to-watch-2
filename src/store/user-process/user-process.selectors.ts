import {NameSpace} from '../../const';
import {AuthorizationStatus} from '../../const';
import {State} from '../../models/state';
import {UserData} from '../../models/user';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].user;
