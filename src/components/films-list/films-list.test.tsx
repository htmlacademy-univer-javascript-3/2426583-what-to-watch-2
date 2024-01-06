import {render, screen} from '@testing-library/react';
import {createMemoryHistory, MemoryHistory} from 'history';
import {FAKE_FILMS} from '../../utils/mocks';
import {withHistory} from '../../utils/mock-component';
import {FilmsList} from './films-list';

describe('Films List Component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render films list correctly', () => {
    const films = FAKE_FILMS;
    const expectedCount = films.length;
    const smallFilmCardElementTestId = 'smallFilmCardElement';

    render(withHistory(<FilmsList films={films}/>, mockHistory));

    expect(screen.getAllByTestId(smallFilmCardElementTestId).length).toBe(expectedCount);
  });
});
