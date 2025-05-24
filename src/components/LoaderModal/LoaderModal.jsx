import React from 'react';
import styles from './LoaderModal.module.css';

const LoaderModal = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoaderModal;
