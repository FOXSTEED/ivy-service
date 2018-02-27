import React from 'react';
import styles from '../styling/app.css';

const Header = () => (
  <div className={styles.header}>
  
    <h1 className={styles.title}>Questions & Answers</h1>

    <button className={styles.button}>
      Ask a question
    </button>

  </div>
);

export default Header;

