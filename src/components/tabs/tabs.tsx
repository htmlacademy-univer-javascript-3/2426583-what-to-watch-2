import classNames from 'classnames';
import React from 'react';
import {Tab} from '../../const';
import './tabs.css';

type TabsProps = {
  onTabSelected: (tab: Tab) => void;
  selectedTab: Tab;
}

const TABS = [Tab.overview, Tab.details, Tab.reviews] as const;
export const Tabs = React.memo(({onTabSelected, selectedTab}: TabsProps): JSX.Element => (
  <div className="film-card__desc">
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {
          TABS.map((tab: Tab) => (
            <li key={tab} className={classNames({'film-nav__item' : true, 'film-nav__item--active' : (selectedTab === tab)})}>
              <a onClick={() => onTabSelected(tab)} className="film-nav__link" data-testid='tab-value'>{tab}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  </div>
)
);

Tabs.displayName = 'Tabs';
