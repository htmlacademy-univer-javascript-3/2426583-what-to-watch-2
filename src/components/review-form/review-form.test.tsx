import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {AuthorizationStatus, NameSpace} from '../../const';
import {withHistory, withStore} from '../../utils/mock-component';
import {FAKE_USER} from '../../utils/mocks';
import {ReviewForm} from './review-form';
describe('Component: Review Form', () => {
  const initialState = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: FAKE_USER
    }
  };

  it('should render correctly', () => {
    const expectedRatingCount = 10;
    const postText = 'Post';
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByRole('radio').length).toBe(expectedRatingCount);
    expect(screen.getByText(postText)).toBeInTheDocument();
  });

  it('should render correctly when user enter rating and post', async () => {
    const postElementTestId = 'postElement';
    const expectedPostValue = 'Test Test Test';
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const ratingInputs = screen.getAllByRole('radio');
    fireEvent.click(ratingInputs[0]);

    await userEvent.type(
      screen.getByTestId(postElementTestId),
      expectedPostValue,
    );

    expect(ratingInputs[0]).toBeChecked();
    expect(screen.getByDisplayValue(expectedPostValue)).toBeInTheDocument();
  });

  it('should disable submit button when rating and review text are not set correctly', async () => {
    const postElementTestId = 'postElement';
    const expectedPostValue = 'Short Text';
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    const ratingInputs = screen.getAllByRole('radio');
    fireEvent.click(ratingInputs[0]);

    await userEvent.type(
      screen.getByTestId(postElementTestId),
      expectedPostValue,
    );

    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when rating and review text are set correctly', async () => {
    const postElementTestId = 'postElement';
    const expectedPostValue = 'Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text';
    const { withStoreComponent } = withStore(<ReviewForm />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    const ratingInputs = screen.getAllByRole('radio');
    fireEvent.click(ratingInputs[0]);

    await userEvent.type(
      screen.getByTestId(postElementTestId),
      expectedPostValue,
    );

    expect(submitButton).not.toBeDisabled();
  });
});
