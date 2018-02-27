import React from 'react';

const Answer = (props) => {
  return (
    <div className="answer">
      <br></br>
      <div>
        -------- ANSWER {props.answer.answerText}
      </div>
    </div>
  );
};

export default Answer;