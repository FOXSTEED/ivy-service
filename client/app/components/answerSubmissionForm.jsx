import React from 'react';
import styled from 'styled-components';
import { SecondaryButton } from './showAnswersButton.jsx';

const AnswerSubmissionHeader = styled.p`
  font-family: Arial, Tahoma, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #767676;
`;

const TextEntry = styled.textarea`
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: inset 0 2px 1px rgba(0,0,0,0.1);
  font-size: 14px;
  width: 100%;
  resize: vertical;
  margin-bottom: 10px;
`;


const Button = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  kerning: normal;
  color: white;
  background-color: #00a680;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 2px;
  border-color:#00a680 #267060 #267060 #00a680;
  text-align: center;
  border-width: 1px;
`;

const AnswerSubmissionForm = (props) => {
  return (
    <div>
      <AnswerSubmissionHeader> WHAT IS YOUR ANSWER?</AnswerSubmissionHeader>
      <form>
        <TextEntry placeholder="Can you answer this question? Enter your answer here">
        </TextEntry>
      </form>

      <Button> Submit </Button>
      <SecondaryButton onClick={() => props.displayAnswerForm()}> Cancel </SecondaryButton>
    </div>
  );
};

module.exports = {
  AnswerSubmissionForm: AnswerSubmissionForm,
  Button: Button
}