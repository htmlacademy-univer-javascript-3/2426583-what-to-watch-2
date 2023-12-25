import { render, screen } from '@testing-library/react';
import {FAKE_FULL_FILMS} from '../../../utils/mocks';
import {Details} from './details';

describe('Details Component', () => {
  it('should render details correctly', () => {
    const fullFilm = FAKE_FULL_FILMS[0];
    render(<Details film={fullFilm}/>);

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Run Time')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
  });
});
