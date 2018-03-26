import React from 'react';
import Answer from './answer.jsx';


const Answers = props => (
  <div>
    {props.answers.map((answer, index) => (
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
