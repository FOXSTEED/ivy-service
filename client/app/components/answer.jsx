import React from 'react';
import styled from 'styled-components';

const AnswerContainer = styled.div`
  border-left-style: solid;
  border-color: lightgrey;
  border-width: 1px; 
  padding-left: 28px;
`;

const ResponseFrom = styled.p`
  font-family: Arial, Tahoma, sans-serif;
  font-size: 13px;
  color: #2c2c2c;
`;
const AnswerCss = styled.p`
  font-family: sans-serif;
  font-size: 13px;
  color: rgb(128,128,128);
  font-weight: lighter;
`;


const Answer = (props) => {
  return (
    <AnswerContainer>

      <ResponseFrom>
        Response from {`${props.firstName} ${props.lastName} | ${props.flag === true ? '⚑' : '⚐'}`}
      </ResponseFrom>

      <AnswerCss>{props.answerText}</AnswerCss>
    </AnswerContainer>
  );
};

export default Answer;
