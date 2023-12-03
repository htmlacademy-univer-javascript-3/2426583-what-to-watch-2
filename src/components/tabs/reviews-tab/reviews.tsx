import {UserReview} from '../../../models/models';
import {Review} from './review';
import {useAppSelector} from '../../../hooks';
import {getComments} from '../../../store/comment-process/comment-process.selector';

export function Reviews(): JSX.Element {
  const reviews = useAppSelector(getComments);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {
          reviews.slice(0, Math.floor(reviews.length / 2)).map((review: UserReview) => (
            <Review key={review.id} review={review}/>
          ))
        }
      </div>
      <div className="film-card__reviews-col">
        {
          reviews.slice(Math.floor(reviews.length / 2), reviews.length).map((review: UserReview) => (
            <Review key={review.id} review={review}/>
          ))
        }
      </div>
    </div>);
}
