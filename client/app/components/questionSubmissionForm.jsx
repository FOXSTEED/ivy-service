import React from 'react';
import styles from '../styling/app.css';
import styled from 'styled-components';
import { Button } from './answerSubmissionForm.jsx';
import { SecondaryButton } from './showAnswersButton.jsx';

const QuestionSubmissionFormContainer = styled.div`
  border-top-style: solid;
  border-color: lightgrey;
  border-width: 1px; 
`;

const QuestionSubmissionHeader = styled.p`
  font-family: Arial, Tahoma, sans-serif;
  font-size: 20px;
  color: #000a12;
`;

const TextEntry = styled.p`
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




const QuestionSubmissionForm = (props) => {
  return (
    <QuestionSubmissionFormContainer>
      <QuestionSubmissionHeader>Get quick answers from past visitors.</QuestionSubmissionHeader>
      <form>
          <TextEntry placeholder="Hi, what would you like to know about this attraction?">
          </TextEntry >
      </form>

      <Button> Submit </Button>
      <SecondaryButton onClick={() => props.displaySubmissionForm()}> Cancel </SecondaryButton>
    </QuestionSubmissionFormContainer>
  );
};

export default QuestionSubmissionForm;
