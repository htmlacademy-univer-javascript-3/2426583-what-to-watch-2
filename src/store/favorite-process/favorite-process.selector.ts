import {State} from '../../models/state';
import {NameSpace} from '../../const';
import {FavoriteFilm} from '../../models/models';

export const getFavoriteFilms = (state: Pick<State, NameSpace.Favorite>): FavoriteFilm[] => state[NameSpace.Favorite].favoriteFilms;
