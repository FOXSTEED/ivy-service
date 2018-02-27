import React from 'react';
import Answer from './answer.jsx';
import Avatar from './avatar.jsx';


const Question = (props) => {
  console.log('question')
  return (
    <div className="question">

      <Avatar
        avatar={props.question.avatar}
      />

      <br></br>
      QUESTION: 
      <br></br>
      {props.question.questionText}
      <br></br>

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

