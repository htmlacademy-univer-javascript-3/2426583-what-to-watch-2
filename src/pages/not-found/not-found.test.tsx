import {render, screen} from '@testing-library/react';
import {NotFound} from './not-found';
import {withHistory} from '../../utils/mock-component';
describe('Component: Not found', () => {
  it('should render correct', () => {
    const expectedText = 'Page not found';
    const expectedLinkText = 'Go to main page';

    render(withHistory(<NotFound />));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
