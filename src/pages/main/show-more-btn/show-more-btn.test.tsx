import {render, screen} from '@testing-library/react';
import {ShowMoreBtn} from './show-more-btn';
describe('Component: Show more button', () => {
  it('should render correct', () => {
    const expectedText = 'Show more';
    const handleClick = vi.fn();

    render(<ShowMoreBtn handleClick={handleClick} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
