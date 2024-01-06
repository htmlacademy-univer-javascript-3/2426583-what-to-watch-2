import {render, screen} from '@testing-library/react';
import {withHistory} from '../../utils/mock-component';
import {LoadingScreen} from './loading-screen';

describe('Component: Loading screen', () => {
  it('should render correctly', () => {
    const expectedElementTestId = 'spinnerElement';

    render(withHistory(<LoadingScreen/>));

    expect(screen.getByTestId(expectedElementTestId)).toBeInTheDocument();
  });
});
