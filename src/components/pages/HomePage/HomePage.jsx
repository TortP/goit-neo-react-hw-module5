import React, { useEffect, useState } from 'react';
import MovieList from '../../MovieList/MovieList';
import styles from './HomePage.module.css';
import { getTrendingMovies } from '../../../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Trending Movies</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
