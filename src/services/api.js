import axios from 'axios';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: ACCESS_TOKEN,
  },
});

export const getTrendingMovies = async () => {
  const response = await axiosInstance.get('/trending/movie/day');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axiosInstance.get('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axiosInstance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
