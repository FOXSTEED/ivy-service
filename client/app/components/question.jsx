import React from 'react';
import Answer from './answer.jsx';
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
        <p className={styles.question}>
          {props.question.questionText}
        </p>

        <p className={styles.date}>
          {props.question.date}
        </p>

        <button className={styles.button}>
          Answer
        </button>

        <br>
        </br>

        <button className={styles.showAnswersButton}>
          Show all X answers
        </button>

        <div className={styles.answersContainer}>
          {props.question.answers.map((answer, index) => {
            return (
              <Answer 
                answer={answer}
                key={index}
              />
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default Question;

