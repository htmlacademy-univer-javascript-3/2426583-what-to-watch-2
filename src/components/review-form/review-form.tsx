import {ChangeEvent, FormEvent, Fragment, useState} from 'react';
import {UserReview} from '../../models/models';

const RATING_VALUES = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

const defaultReview: UserReview = {
  id: 0,
  text: '',
  author: 'Matthew Lickona',
  date: new Date(),
  rating: 7.2
};

type ReviewFormProps = {
  onSend: (review: UserReview) => void;
}

export function ReviewForm({onSend}: ReviewFormProps): JSX.Element {
  const [review, setReview] = useState(defaultReview);

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setReview({
      ...review,
      rating: Number(evt.target.value)
    });
  }

  function handleTextAreaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setReview({
      ...review,
      text: evt.target.value
    });
  }

  return (
    <div className='add-review'>
      <form action='#' className='add-review__form'>
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
              onSubmit={(evt: FormEvent<HTMLButtonElement>) => {
                evt.preventDefault();
                onSend(review);
              }}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
