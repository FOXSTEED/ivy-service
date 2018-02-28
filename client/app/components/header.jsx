import React from 'react';
import styles from '../styling/app.css';

const Header = () => (
  <div className={styles.header}>
  
    <div className={styles.titleContainer}>
      <h1 className={styles.title}>Questions & Answers</h1>
    </div>
    <div className={styles.askButton}>
      <button className={styles.button}>
        Ask a question
      </button>
    </div>

  </div>
);

export default Header;

