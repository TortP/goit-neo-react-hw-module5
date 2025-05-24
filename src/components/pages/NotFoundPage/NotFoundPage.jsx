import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div className={styles.container}>
    <h2>404 - Page Not Found</h2>
    <p>Sorry, the page you're looking for doesn't exist.</p>
    <Link to="/" className={styles.link}>Go to Home</Link>
  </div>
);

export default NotFoundPage;