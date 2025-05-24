import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import { getMovieCast } from '../../services/api';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const data = await getMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  const filteredCast = cast.filter(actor => actor.profile_path);

  return (
    <div className={styles.cast}>
      {loading && <p>Loading cast...</p>}
      {error && <p>Error: {error}</p>}
      {filteredCast.length > 0 ? (
        <ul className={styles['cast-list']}>
          {filteredCast.map(actor => (
            <li key={actor.id || actor.credit_id} className={styles['cast-card']}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieCast;
