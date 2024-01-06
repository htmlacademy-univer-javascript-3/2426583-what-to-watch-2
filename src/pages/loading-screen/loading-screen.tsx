import {TailSpin} from 'react-loader-spinner';
import './loading-screen.css';

export function LoadingScreen(): JSX.Element {
  return (
    <section className='film-card film-card--full' data-testid='spinnerElement'>
      <TailSpin
        height="80"
        width="80"
        color="#dfcf77"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperClass="preloader"
        visible
        data-testid='spinnerElement'
      />
    </section>
  );
}
