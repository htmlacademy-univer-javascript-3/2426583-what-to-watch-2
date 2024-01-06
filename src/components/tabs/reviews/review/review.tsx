import {format} from 'date-fns';
import {UserReview} from '../../../../models/models';

type ReviewProps = {
  review: UserReview;
}
export function Review({review}: ReviewProps): JSX.Element {
  return (
    <div className="review" data-testid="review">
      <blockquote className="review__quote">
        <p className="review__text" data-testid="text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author" data-testid="author">{review.user}</cite>
          <time className="review__date" data-testid="date" dateTime={format(new Date(review.date), 'MMMM d, yyyy-MM-dd')}>{format(new Date(review.date), 'MMMM d, yyyy-MM-dd')}</time>
        </footer>
      </blockquote>

      <div className="review__rating" data-testid="rating">{review.rating}</div>
    </div>
  );
}
