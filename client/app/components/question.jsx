import React from 'react';
import Answers from './answers.jsx';
import Avatar from './avatar.jsx';
import styles from '../styling/app.css';

const Question = (props) => {

  let showAnswersButton = null;
  if (props.question.answers.length) {
    if (props.question.answers.length === 1) {
      showAnswersButton = <button className={styles.secondaryButton}> Show answer </button>;
    } else if (props.question.answers.length === 2) {
      showAnswersButton = <button className={styles.secondaryButton}> Show answers </button>;
    } else {
      showAnswersButton = <button className={styles.secondaryButton}> Show all {props.question.answers.length} answers </button>;
    }
  }

  return (
    <div className={styles.questionContainer}>

      <Avatar
        avatar={props.question.avatar}
        firstName={props.question.firstName}
        lastName={props.question.lastName}
      />


      <div className={styles.questionAndAnswerContainer}>

        <p className={styles.question}> {props.question.questionText} </p>
        <p className={styles.date}> {props.question.date}</p>

        <button className={styles.button}> Answer </button>
        {showAnswersButton}

        <Answers 
          answers={props.question.answers}
        />

      </div>

    </div>
  );
};

export default Question;
