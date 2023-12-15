export const enum AppRoute {
  Login = '/login',
  Main = '/',
  MyList = '/mylist',
  Film = '/films',
  AddReview = '/review',
  Player = '/player',
  NotFound = '/notfound',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum Tab {
  details = 'Details',
  overview = 'Overview',
  reviews = 'Reviews'
}

export const GENRE_FOR_ALL_FILMS = 'All films';

export const enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
  Promo = '/promo'
}

export enum ReduxStateStatus {
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
  Idle = 'idle'
}

export enum NameSpace {
  Film = 'FILM',
  User = 'USER',
  Comment = 'COMMENT',
  Favorite = 'FAVORITE'
}

export const enum Time {
  MinuteSeconds = 60,
  HourSeconds = 3600,
  HourMinutes = 60,
}
