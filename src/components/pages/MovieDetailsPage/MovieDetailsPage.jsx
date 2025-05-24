import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import styles from './MovieDetailsPage.module.css';
import { getMovieDetails } from '../../../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>← Go back</Link>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {movie && (
        <div className={styles.details}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Image'
            }
            alt={movie.title}
          />
          <div className={styles['details-text']}>
            <h2>{movie.title}</h2>
            <p>User Score: {movie.vote_average}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <div className={styles.genres}>
              {movie.genres.map(genre => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.additional}>
        <h3>Additional Information</h3>
        <ul>
          <li><Link to="cast">Cast</Link></li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;