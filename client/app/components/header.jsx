import React from 'react';
import QuestionSubmissionForm from './questionSubmissionForm.jsx';
import styled from 'styled-components';

const HeaderCss = styled.div`
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  display: inline-block;
`;

const Title = styled.h1`
  font-family: Arial, Tahoma, sans-serif;
  font-size: 28px;
`;

const AskButton = styled.button`
  display: inline-block;
  float: right;
  margin-top: 18px;
`;

const HeaderButton = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  kerning: normal;
  color: white;
  background-color: #00a680;
  padding-left: 14px;
  padding-right: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 2px;
  border-color:#00a680 #267060 #267060 #00a680;
  text-align: center;
  border-width: 1px;
`;


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsDisplayed: false,
    };

    this.displaySubmissionForm = this.displaySubmissionForm.bind(this);
  }

  displaySubmissionForm() {
    const boolean = this.state.formIsDisplayed;
    this.setState({
      formIsDisplayed: !boolean,
    });
  }

  render() {
    return (
      <HeaderCss>

        <TitleContainer>
          <Title>Questions & Answers</Title>
        </TitleContainer>

        <AskButton>
          <HeaderButton onClick={this.displaySubmissionForm}>
            Ask a question
          </HeaderButton>
        </AskButton>

        {this.state.formIsDisplayed ?
          <QuestionSubmissionForm
            displaySubmissionForm={this.displaySubmissionForm}
          /> : null}

      </HeaderCss>
    );
  }
}

export default Header;

