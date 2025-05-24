import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';
import { getMovieReviews } from '../../services/api';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      {loading && <p>Loading reviews...</p>}
      {error && <p>Error: {error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id} className={styles.reviewCard}>
              <h4>Author: {review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieReviews;
