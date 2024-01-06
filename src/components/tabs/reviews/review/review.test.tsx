import {render, screen} from '@testing-library/react';
import {FAKE_COMMENT} from '../../../../utils/mocks';
import {Review} from './review';

describe('Review Component', () => {
  it('should render review correctly', () => {
    const review = FAKE_COMMENT;
    const textTestId = 'text';
    const authorTestId = 'author';
    const dateTestId = 'date';
    const ratingTestId = 'rating';

    render(<Review review={review}/>);

    expect(screen.getByTestId(textTestId)).toBeInTheDocument();
    expect(screen.getByTestId(authorTestId)).toBeInTheDocument();
    expect(screen.getByTestId(dateTestId)).toBeInTheDocument();
    expect(screen.getByTestId(ratingTestId)).toBeInTheDocument();
  });
});


