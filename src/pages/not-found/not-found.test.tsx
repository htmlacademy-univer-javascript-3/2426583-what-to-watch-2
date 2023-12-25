import {render, screen} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {NotFound} from './not-found';
describe('Component: Not found', () => {
  it('should render correct', () => {
    const expectedText = 'Page not found';

    render(<BrowserRouter><NotFound /></BrowserRouter>);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
