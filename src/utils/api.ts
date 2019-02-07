import axios from "axios";

const API_KEY = "b1c8852c";
const BASE_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&type=movie`;

export default class API {
  static fetchMovies(query: string) {
    return axios.get(`${BASE_URL}&s=${query}`);
  }

  static fetchMovie(id: string) {
    return axios.get(`${BASE_URL}&i=${id}`);
  }
}
