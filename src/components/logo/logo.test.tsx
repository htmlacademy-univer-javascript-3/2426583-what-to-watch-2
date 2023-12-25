import { render, screen } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {Logo} from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const firstLetter = 'W';
    const secondLetter = 'T';
    const numberOfLetterW = 2;

    render(<BrowserRouter><Logo/></BrowserRouter>);

    expect(screen.getAllByText(firstLetter).length).toBe(numberOfLetterW);
    expect(screen.getByText(secondLetter)).toBeInTheDocument();
  });
});
