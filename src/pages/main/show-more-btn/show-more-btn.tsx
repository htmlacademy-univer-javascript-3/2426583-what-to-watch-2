type ShowMoreBtnProps = {
  handleClick: () => void;
};
export function ShowMoreBtn({ handleClick }: ShowMoreBtnProps): JSX.Element {
  return (
    <div className='catalog__more'>
      <button className='catalog__button' type='button' onClick={handleClick}>Show more</button>
    </div>
  );
}
