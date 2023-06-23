import axios from 'axios';

const KEY = 'b2f0a6dfe44405f771630781bf4935dd';
const BASE_URL = 'https://api.themoviedb.org/3';



export function getTrendingMovies() {
  const params = new URLSearchParams({
    api_key: KEY,
  });

  return axios.get(`${BASE_URL}/trending/movie/day?${params}`);
}

export function searchMovies(query) {
  const params = new URLSearchParams({
    api_key: KEY,
    query,
  });

  return axios.get(`${BASE_URL}/search/movie?${params}`);
}

export function getMovieDetails(id) {
  const params = new URLSearchParams({
    api_key: KEY,
    language: 'en-US',
  });

  return axios.get(`${BASE_URL}/movie/${id}?${params}`);
}

export function getImg(path, size) {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
}

export function getMovieCast(id) {
  const params = new URLSearchParams({
    api_key: KEY,
    language: 'en-US',
  });

  return axios.get(`${BASE_URL}/movie/${id}/credits?${params}`);
}

export function getMovieReviews(id) {
  const params = new URLSearchParams({
    api_key: KEY,
    language: 'en-US',
  });

  return axios.get(`${BASE_URL}/movie/${id}/reviews?${params}`);
}
