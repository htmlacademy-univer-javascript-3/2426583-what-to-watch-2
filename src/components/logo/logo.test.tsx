import { render, screen } from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import {Logo} from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const firstLetter = 'W';
    const secondLetter = 'T';
    const numberOfLetterW = 2;

    render(withHistory(<Logo/>));

    expect(screen.getAllByText(firstLetter).length).toBe(numberOfLetterW);
    expect(screen.getByText(secondLetter)).toBeInTheDocument();
  });
});
