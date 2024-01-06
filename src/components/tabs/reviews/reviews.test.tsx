import {createMemoryHistory, MemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {FAKE_COMMENT, makeFakeStore} from '../../../utils/mocks';
import {withHistory, withStore} from '../../../utils/mock-component';
import {Reviews} from './reviews';

describe('Reviews Component', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render Reviews correctly', () => {
    const reviews = [FAKE_COMMENT];
    const expectedCount = reviews.length;
    const reviewTestId = 'review';
    const withHistoryComponent = withHistory(<Reviews reviews={reviews}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getAllByTestId(reviewTestId).length).toBe(expectedCount);
  });
});

