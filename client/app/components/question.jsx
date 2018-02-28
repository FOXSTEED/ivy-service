import React from 'react';
import Answers from './answers.jsx';
import Avatar from './avatar.jsx';
import styles from '../styling/app.css';

const Question = (props) => {
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
        <button className={styles.secondaryButton}>  Show all {props.question.answers.length} answers  </button>

        <Answers 
          answers={props.question.answers}
        />

      </div>

    </div>
  );
};

export default Question;

