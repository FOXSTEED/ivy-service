import 'moment-timezone';
import React from 'react';
import Answers from './answers.jsx';
import Avatar from './avatar.jsx';
import { ShowAnswersButton } from './showAnswersButton.jsx';
import { AnswerSubmissionForm, Button } from './answerSubmissionForm.jsx';
import Moment from 'react-moment';
import styles from '../styling/app.css';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  border-top-style: solid;
  border-color: lightgrey;
  border-width: 1px; 
`;

const QuestionCss = styled.p`
  font-family: Arial, Tahoma, sans-serif;
`;

const Data = styled.p`
  font-family: Arial, Tahoma, sans-serif;
  font-size: 11px;
  color: rgb(128,128,128);
`;

Moment.globalFormat = 'MMMM D YYYY';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersDisplayed: false,
      answerFormDisplayed: false,
    };

    this.displayAllAnswers = this.displayAllAnswers.bind(this);
    this.displayAnswerForm = this.displayAnswerForm.bind(this);
  }

  displayAllAnswers() {
    const boolean = this.state.answersDisplayed;
    this.setState({
      answersDisplayed: !boolean,
    });
  }

  displayAnswerForm() {
    const boolean = this.state.answerFormDisplayed;
    this.setState({
      answerFormDisplayed: !boolean,
    });
  }

  render() {
    const date = new Date(this.props.question.date.toString().slice(0, 10));
    return (
      <QuestionContainer>

        <Avatar
          avatar={this.props.question.avatar}
          firstName={this.props.question.firstname}
          lastName={this.props.question.lastname}
        />

        <div>
          <QuestionCss>{this.props.question.questiontext}</QuestionCss>
          <Data>{<Moment date={date}/>}</Data>

          <Button onClick={() => this.displayAnswerForm()}>
            Answer
          </Button>

          <ShowAnswersButton 
            displayAllAnswers={this.displayAllAnswers} 
            answers={this.props.question.answers}
            answersDisplayed={this.state.answersDisplayed}
          />

          {this.state.answerFormDisplayed ?
            <AnswerSubmissionForm 
              displayAnswerForm={this.displayAnswerForm}
              answerFormDisplayed={this.state.answerFormDisplayed}
            /> : null}

          <Answers answers={this.props.question.answers.slice(0, 1)} />

          {this.state.answersDisplayed ?
            <Answers
              answers={this.props.question.answers.slice(1)}
            /> : null}

        </div>

      </QuestionContainer>
    );
  }
}

export default Question;
