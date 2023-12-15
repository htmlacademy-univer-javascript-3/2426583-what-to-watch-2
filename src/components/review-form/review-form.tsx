import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {AddCommentRequest} from '../../models/models';
import {addCommentAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';

const RATING_VALUES = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const defaultReview: AddCommentRequest = {
  filmId: 0,
  comment: '',
  rating: 0
};

type ReviewFormProps = {
  filmId: number;
}

export function ReviewForm({filmId} :ReviewFormProps): JSX.Element {
  const [review, setReview] = useState(defaultReview);
  const dispatch = useAppDispatch();
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
                  />
                  <label className='rating__label' htmlFor={`star-${rating}`}>Rating {rating}</label>
                </Fragment>))
            }
          </div>
        </div>

        <div className='add-review__text'>
          <textarea onChange={handleTextAreaChange} className='add-review__textarea' name='review-text' id='review-text'
            placeholder='Review text'
          />
          <div className='add-review__submit'>
            <button
              className='add-review__btn'
              type='submit'
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
