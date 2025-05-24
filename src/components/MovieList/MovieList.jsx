import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={styles.grid}>
      {movies.map(movie => (
        <div key={movie.id} className={styles.card}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }} className={styles.link}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={movie.title || movie.name}
              className={styles.poster}
            />
            <h3 className={styles.title}>{movie.title || movie.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
