import React from 'react';

type ShowMoreBtnProps = {
  handleClick: () => void;
};
function ShowMoreBtn({ handleClick }: ShowMoreBtnProps): JSX.Element {
  return (
    <div className='catalog__more'>
      <button className='catalog__button' type='button' onClick={handleClick}>Show more</button>
    </div>
  );
}

export default React.memo(ShowMoreBtn);
