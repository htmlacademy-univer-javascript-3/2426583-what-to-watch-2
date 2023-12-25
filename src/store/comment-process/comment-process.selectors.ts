import {State} from '../../models/state';
import {UserReview} from '../../models/models';
import {NameSpace} from '../../const';

export const getComments = (state: Pick<State, NameSpace.Comment>): UserReview[] => state[NameSpace.Comment].comments;
