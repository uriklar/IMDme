import { observable, action, flow, computed } from "mobx";
import API from "../utils/api";
import { AxiosResponse } from "axios";

export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: "movie";
  Poster: string;
  Director?: string;
  Released?: string;
  Actors?: string;
  Plot?: string;
  imdbRating?: string;
}

export interface IMovieStore {
  movies: Record<string, IMovie>;
  fetchMovies: (query: string) => void;
  fetchMovie: (movieId: string) => void;
  movieIds: string[];
  error: string | null;
}

export default class MovieStore implements IMovieStore {
  @observable movies: Record<string, IMovie> = {};
  @observable error: string | null = null;

  @action.bound
  fetchMovies = flow(function*(this: IMovieStore, query: string) {
    this.error = null;
    this.movies = {};

    const response: AxiosResponse<any> = yield API.fetchMovies(query).then(
      response => response
    );

    if (response.data.Error) {
      this.error = response.data.Error;
      return;
    }

    this.movies = response.data.Search.reduce(
      (acc: Record<string, IMovie>, movie: IMovie) => {
        acc[movie.imdbID] = movie;

        return acc;
      },
      {}
    );
  });

  @action.bound
  fetchMovie = flow(function*(this: IMovieStore, movieId: string) {
    const response: AxiosResponse<IMovie> = yield API.fetchMovie(movieId).then(
      response => response
    );

    this.movies[movieId] = response.data;
  });

  @computed
  get movieIds() {
    return Object.keys(this.movies);
  }
}
