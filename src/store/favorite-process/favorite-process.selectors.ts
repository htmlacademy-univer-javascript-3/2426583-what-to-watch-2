import {State} from '../../models/state';
import {NameSpace} from '../../const';
import {Film} from '../../models/models';

export const getFavoriteFilms = (state: Pick<State, NameSpace.Favorite>): Film[] => state[NameSpace.Favorite].favoriteFilms;
