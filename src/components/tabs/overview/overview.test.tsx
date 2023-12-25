import { render, screen } from '@testing-library/react';
import {FAKE_FULL_FILMS} from '../../../utils/mocks';
import {Overview} from './overview';

describe('Overview Component', () => {
  it('should render overview correctly', () => {
    const fullFilm = FAKE_FULL_FILMS[0];
    const scoreTestId = 'score';
    const levelTestId = 'level';
    const countTestId = 'count';
    const descriptionTestId = 'description';
    const directorTestId = 'count';
    const starringTestId = 'description';
    render(<Overview film={fullFilm}/>);

    expect(screen.getByTestId(scoreTestId)).toBeInTheDocument();
    expect(screen.getByTestId(levelTestId)).toBeInTheDocument();
    expect(screen.getByTestId(countTestId)).toBeInTheDocument();
    expect(screen.getByTestId(descriptionTestId)).toBeInTheDocument();
    expect(screen.getByTestId(directorTestId)).toBeInTheDocument();
    expect(screen.getByTestId(starringTestId)).toBeInTheDocument();
  });
});
