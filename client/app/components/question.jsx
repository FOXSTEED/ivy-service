import React from 'react';
import Answer from './answer.jsx';


const Question = (props) => {
  console.log('question')
  return (
    <div className="question">

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