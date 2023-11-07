export type ShortFilmInfo = {
  title: string;
  genre: string;
  year: string;
}

export type Film = {
  id: number;
  title: string;
  imageSrc: string;
  videoSrc: string;
  genre: string;
  runTime: number;
  year: number;
  rating: FilmRating;
  description: FilmDescription;
  reviews: UserReview[];
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
  text: string;
  author: string;
  date: Date;
  rating: number;
}

