import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../MovieList/MovieList';
import styles from './MoviesPage.module.css';
import { searchMovies } from '../../../services/api';
import LoaderModal from '../../LoaderModal/LoaderModal';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const value = form.elements.query.value.trim();
    if (value) setSearchParams({ query: value });
    form.reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Search movies..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      {loading && <LoaderModal />}
      {error && <p>Error: {error}</p>}
      {!loading && query && movies.length === 0 && (
        <p className={styles.message}>
          Sorry, no results found for your query. Please try again.
        </p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
