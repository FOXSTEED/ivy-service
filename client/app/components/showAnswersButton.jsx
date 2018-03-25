import React from 'react';
import styled from 'styled-components';

const SecondaryButton = styled.button`
  display: inline;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  kerning: normal;
  border-color: #e5e5e5 #767676 #767676 #e5e5e5;
  background-color: #fff;
  color: #00a680;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 2px;
  border-width: 1px;
  margin-left: 10px;
`;

const ShowAnswersButton = (props) => {
  let buttonContent = '';

  if (props.answersDisplayed) {
    buttonContent = 'Hide Answers';
  } else if (props.answers.length === 2) {
    buttonContent = 'Show 2 answers';
  } else {
    buttonContent = `Show all ${props.answers.length} answers`;
  }

  return (
    <span>
      {props.answers.length <= 1 ? null :
      <SecondaryButton onClick={() => props.displayAllAnswers()}>
        {buttonContent}
      </SecondaryButton>}
    </span>
  );
};

module.exports = {
  ShowAnswersButton: ShowAnswersButton,
  SecondaryButton : SecondaryButton 
}
