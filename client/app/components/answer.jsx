import React from 'react';
import styles from '../styling/app.css';

const Answer = (props) => {
  return (
    <div className={styles.answerContainer}>

      <p className={styles.responseFrom}>Response from {props.answer.firstName + ' ' + props.answer.lastName}</p>
      <p className={styles.answer}>{props.answer.answerText}</p>

    </div>
  );
};

export default Answer;