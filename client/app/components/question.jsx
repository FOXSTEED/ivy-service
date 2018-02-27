import React from 'react';
import Answer from './answer.jsx';
import Avatar from './avatar.jsx';
import styles from '../styling/app.css';

const Question = (props) => {
  return (
    <div className="question">

      <Avatar
        avatar={props.question.avatar}
        firstName={props.question.firstName}
        lastName={props.question.lastName}
      />


      <p className={styles.question}>
        {props.question.questionText}
      </p>

      <p className={styles.date}>
        {props.question.date}
      </p>


      <div className="answers">
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
  );
};

export default Question;

