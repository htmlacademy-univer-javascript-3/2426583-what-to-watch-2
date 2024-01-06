import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {AddCommentRequest} from '../../models/models';
import {useAppDispatch} from '../../hooks';
import {addCommentAction} from '../../store/comment-process/comment-process-api-actions';

const MAX_LEN_REVIEW = 400;
const MIN_LEN_REVIEW = 50;
const RATING_VALUES = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const defaultReview: AddCommentRequest = {
  filmId: '',
  comment: '',
  rating: 0
};

type ReviewFormProps = {
  filmId: string;
}

export function ReviewForm({filmId} :ReviewFormProps): JSX.Element {
  const [review, setReview] = useState(defaultReview);
  const dispatch = useAppDispatch();
  const isDisabled = review.rating === null || review.comment.length < MIN_LEN_REVIEW || review.comment.length > MAX_LEN_REVIEW;
  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setReview({
      ...review,
      rating: Number(evt.target.value)
    });
  }

  function handleTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReview({
      ...review,
      comment: evt.target.value
    });
  }

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(addCommentAction({
      filmId: filmId,
      comment: review.comment,
      rating: review.rating
    }));
  };

  return (
    <div className='add-review'>
      <form action='#' className='add-review__form' onSubmit={handleSubmit}>
        <div className='rating'>
          <div className='rating__stars'>
            {
              RATING_VALUES.map((rating: number) => (
                <Fragment key={rating}>
                  <input className='rating__input'
                    id={`star-${rating}`}
                    type='radio'
                    name='rating'
                    value={rating}
                    onChange={handleRatingChange}
                    data-testid={`ratingElement-${rating}`}
                  />
                  <label className='rating__label' htmlFor={`star-${rating}`}>Rating {rating}</label>
                </Fragment>))
            }
          </div>
        </div>

        <div className='add-review__text'>
          <textarea onChange={handleTextAreaChange} className='add-review__textarea' name='review-text' id='review-text'
            placeholder='Review text' data-testid='postElement'
          />
          <div className='add-review__submit'>
            <button
              className='add-review__btn'
              type='submit'
              disabled={isDisabled}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
