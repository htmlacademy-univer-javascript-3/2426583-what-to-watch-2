export type Film = {
  id: number;
  name: string;
  previewImage: string;
  previewVideoLink: string;
  genre: string;
  runTime: number;
  year: number;
  rating: FilmRating;
  description: FilmDescription;
  reviews: UserReview[];
}

export type FullFilm = {
  id: string;
  name: string;
  posterImage: string;
  backgroundImage: string;
  backgroundColor: string;
  videoLink: string;
  description: string;
  rating: number;
  scoresCount: number;
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  released: number;
  isFavorite: boolean;
}

export type FilmRating = {
  score: number;
  level: string;
  count: number;
}

export type FilmDescription = {
  info: string;
  director: string;
  starring: string[];
}

export type UserReview = {
  id: number;
  comment: string;
  user: string;
  date: Date;
  rating: number;
}

export type AddCommentRequest = {
  filmId: string;
  comment: string;
  rating: number;
}

