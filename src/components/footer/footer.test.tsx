import { render, screen } from '@testing-library/react';
import React from 'react';
import {withHistory} from '../../utils/mock-component';
import {Footer} from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = '© 2019 What to watch Ltd.';

    render(withHistory(<Footer/>));

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
