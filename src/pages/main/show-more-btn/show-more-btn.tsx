import React from 'react';

type ShowMoreBtnProps = {
  handleClick: () => void;
};
export const ShowMoreBtn = React.memo(({handleClick}: ShowMoreBtnProps): JSX.Element => (
  <div className='catalog__more'>
    <button className='catalog__button' type='button' onClick={handleClick}>Show more</button>
  </div>
)
);

ShowMoreBtn.displayName = 'ShowMoreBtn';
