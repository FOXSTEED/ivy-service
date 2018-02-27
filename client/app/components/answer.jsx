import React from 'react';

const Answer = (props) => {
  return (
    <div className="answer">
      <br></br>
      <div>
      <h4>-------- ANSWER </h4> <p>{props.answer.answerText}</p>
      </div>
    </div>
  );
};

export default Answer;