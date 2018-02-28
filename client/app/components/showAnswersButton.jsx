import React from 'react';
import styles from '../styling/app.css';

const ShowAnswersButton = (props) => {
  let showAnswersButton = null;
  
  if (props.answersDisplayed) {
    showAnswersButton = <button onClick={() => props.displayAllAnswers()} className={styles.secondaryButton}> Hide answers </button>
  } else {
    if (props.answers.length) {
      if (props.answers.length === 1) {
        showAnswersButton = null;
      } else if (props.answers.length === 2) {
        showAnswersButton = <button onClick={() => props.displayAllAnswers()} className={styles.secondaryButton}> Show 2 answers </button>;
      } else {
        showAnswersButton = <button onClick={() => props.displayAllAnswers()} className={styles.secondaryButton}> Show all {props.answers.length} answers </button>;
      }
    }
  }

  return (
    <span>
      { showAnswersButton }
    </span>
  );
};

export default ShowAnswersButton;
