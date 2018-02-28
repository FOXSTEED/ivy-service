import React from 'react';
import Answer from './answer.jsx';
import styles from '../styling/app.css';


const Answers = props => (
  <div className={styles.answersContainer}>
    {props.answers.map((answer, index) => (
      <Answer
        answer={answer}
        key={index}
        answerText={answer.answerText}
        downvotes={answer.downvotes}
        upvotes={answer.upvotes}
        flag={answer.flag}
        firstName={answer.firstName}
        lastName={answer.lastName}
      />
    ))}
  </div>
);

export default Answers;
