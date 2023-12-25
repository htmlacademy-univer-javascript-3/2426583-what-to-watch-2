import {render, screen} from '@testing-library/react';
import {ShowMoreBtn} from './show-more-btn';
describe('Component: Show more button', () => {
  it('should render correct', () => {
    const expectedText = 'Show more';

    render(<ShowMoreBtn />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
