import { render, screen } from '@testing-library/react';
import React from 'react';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/mocks';
import {createMemoryHistory, MemoryHistory} from 'history';
import {UserBlock} from './user-block';
describe('Component: UserBlock', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const expectedAltText = 'User avatar';
    const withHistoryComponent = withHistory(<UserBlock/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
