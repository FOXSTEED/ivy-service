import React from 'react';
import styles from '../styling/app.css';

const Answer = (props) => {
  return (
    <div className={styles.answerContainer}>

      <p className={styles.responseFrom}>
        Response from {props.firstName + ' ' + props.lastName + ' | ' + (props.flag === true ? '⚑' : '⚐')}
      </p>
      
      <p className={styles.answer}>{props.answerText}</p>
    </div>
  );
};

export default Answer;
