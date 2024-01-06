import { render, screen } from '@testing-library/react';
import {withHistory, withStore} from '../../utils/mock-component';
import {makeFakeStore} from '../../utils/mocks';
import {MyList} from './my-list';

describe('Component: MyList', () => {
  it('should render correctly', () => {
    const expectedText = 'My list';
    const catalogText = 'Catalog';
    const {withStoreComponent} = withStore(<MyList/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(catalogText)).toBeInTheDocument();
  });
});
