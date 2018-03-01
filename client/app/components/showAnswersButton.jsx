import React from 'react';
import styles from '../styling/app.css';

const ShowAnswersButton = (props) => {
  let buttonContent = '';

  if (props.answersDisplayed) {
    buttonContent = 'Hide Answers';
  } else if (props.answers.length === 2) {
    buttonContent = 'Show 2 answers';
  } else {
    buttonContent = `Show all ${props.answers.length} answers`;
  }

  return (
    <span>
      {props.answers.length <= 1 ? null :
      <button onClick={() => props.displayAllAnswers()} className={styles.secondaryButton}>
        {buttonContent}
      </button>}
    </span>
  );
};

export default ShowAnswersButton;

