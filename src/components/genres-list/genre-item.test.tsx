import {fireEvent, render, screen} from '@testing-library/react';
import {FAKE_FILMS} from '../../utils/mocks';
import {GenreItem} from './genre-item';

describe('Genre Item Component', () => {
  it('should render Genre Item correctly', () => {
    const onGenreItemClick = vi.fn();
    const expectedGenre = FAKE_FILMS[0].genre;

    render(<GenreItem genre={FAKE_FILMS[0].genre} onGenreItemClick={onGenreItemClick} isActive={false}/>);

    expect(screen.getByText(expectedGenre)).toBeInTheDocument();
  });

  it('onGenreItemClick should call when user click on genre', () => {
    const onGenreItemClick = vi.fn();
    const expectedGenre = FAKE_FILMS[0].genre;

    render(<GenreItem genre={FAKE_FILMS[0].genre} onGenreItemClick={onGenreItemClick} isActive={false}/>);

    fireEvent.click(screen.getByText(expectedGenre));
    expect(onGenreItemClick).toBeCalledTimes(1);
  });

  it('active genre should have catalog__genres-item--active class', () => {
    const onGenreItemClick = vi.fn();
    const expectedClass = 'catalog__genres-item--active';
    const genreElementTestId = 'genreElement';

    render(<GenreItem genre={FAKE_FILMS[0].genre} onGenreItemClick={onGenreItemClick} isActive/>);

    expect(screen.getByTestId(genreElementTestId)).toHaveClass(expectedClass);
  });
});
