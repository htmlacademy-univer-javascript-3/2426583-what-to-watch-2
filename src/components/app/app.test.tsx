// import {createMemoryHistory, MemoryHistory} from 'history';
// import {withHistory, withStore} from '../../utils/mock-component';
// import App from './app';
// import {makeFakeStore} from '../../utils/mocks';
// import {AppRoute} from '../../const';
// import {render} from '@testing-library/react';
//
//
// describe('Application Routing', () => {
//   let mockHistory: MemoryHistory;
//
//   beforeEach(() => {
//     mockHistory = createMemoryHistory();
//   });
//
//   it('should render "Main" when user navigate to "/"', () => {
//     const withHistoryComponent = withHistory(<App />, mockHistory);
//     const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
//     mockHistory.push(AppRoute.Main);
//
//     render(withStoreComponent);
//
//     // todo
//   });
// });
