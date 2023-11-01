import {Tab} from '../../const';
import './tabs.css';
import classNames from 'classnames';

type TabsProps = {
  onTabSelected: (tab: Tab) => void;
  selectedTab: Tab;
}
export function Tabs({onTabSelected, selectedTab}: TabsProps): JSX.Element {
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            [Tab.overview, Tab.details, Tab.reviews].map((tab: Tab) => (
              <li key={tab} className={classNames({'film-nav__item' : true, 'film-nav__item--active' : (selectedTab === tab)})}>
                <a onClick={() => onTabSelected(tab)} className="film-nav__link">{tab}</a>
              </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
}
