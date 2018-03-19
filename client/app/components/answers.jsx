import React from 'react';
import Answer from './answer.jsx';
import styles from '../styling/app.css';


const Answers = props => (
  <div className={styles.answersContainer}>
    {props.answers.map((answer, index) => (
      // console.log(answer)
      <Answer
        answer={answer}
        key={index}
        answerText={answer.answertext}
        downvotes={answer.downvotes}
        upvotes={answer.upvotes}
        flag={answer.flag}
        firstName={answer.firstname}
        lastName={answer.lastname}
      />
    ))}
  </div>
);

export default Answers;
