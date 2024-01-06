import {createMemoryHistory, MemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {FAKE_FILMS_GENRES, makeFakeStore} from '../../utils/mocks';
import {withHistory, withStore} from '../../utils/mock-component';
import {GenresList} from './genres-list';

describe('Genre List Component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render Genre List correctly', () => {
    const expectedCount = FAKE_FILMS_GENRES.length;
    const genreElementTestId = 'genreElement';
    const withHistoryComponent = withHistory(<GenresList/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByTestId(genreElementTestId).length).toBe(expectedCount);
  });
});
