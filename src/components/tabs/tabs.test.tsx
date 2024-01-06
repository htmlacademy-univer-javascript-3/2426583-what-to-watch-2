import {render, screen} from '@testing-library/react';
import {Tab} from '../../const';
import {Tabs} from './tabs';
describe('Tabs Component', () => {
  it('should render tabs correctly', () => {
    const expectedCount = 3;
    const overviewTab = Tab.overview;
    const detailsTab = Tab.details;
    const reviewsTab = Tab.reviews;
    const tabValueTestId = 'tab-value';
    const onTabSelected = vi.fn();

    render(<Tabs selectedTab={Tab.overview} onTabSelected={onTabSelected}/>);

    expect(screen.getByText(overviewTab)).toBeInTheDocument();
    expect(screen.getByText(detailsTab)).toBeInTheDocument();
    expect(screen.getByText(reviewsTab)).toBeInTheDocument();
    expect(screen.getAllByTestId(tabValueTestId).length).toBe(expectedCount);
  });
});


