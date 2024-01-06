import {expect} from 'vitest';
import {CommentProcess} from '../../models/state';
import {FAKE_COMMENT} from '../../utils/mocks';
import {commentProcessSlice} from './comment-process.slice';
import {getFilmCommentsAction} from './comment-process-api-actions';


describe('Comment process slice', () => {
  it ('should return initial state with empty action', ()=> {
    const emptyAction = {type: ''};
    const expectedState: CommentProcess = {
      comments: [FAKE_COMMENT]
    };
    const result = commentProcessSlice.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', ()=> {
    const emptyAction = { type: '' };
    const expectedState: CommentProcess = {
      comments: []
    };

    const result = commentProcessSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array with comments with "getFilmCommentsAction.fulfilled"', () => {
    const expectedState: CommentProcess = {
      comments: [FAKE_COMMENT]
    };

    const result = commentProcessSlice.reducer(
      undefined,
      getFilmCommentsAction.fulfilled(
        [FAKE_COMMENT], '', '')
    );

    expect(result).toEqual(expectedState);
  });
});

