import 'moment-timezone';
import React from 'react';
import Answers from './answers.jsx';
import Avatar from './avatar.jsx';
import ShowAnswersButton from './showAnswersButton.jsx';
import AnswerSubmissionForm from './answerSubmissionForm.jsx';
import Moment from 'react-moment';
import styles from '../styling/app.css';

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
      <div className={styles.questionContainer}>

        <Avatar
          avatar={this.props.question.avatar}
          firstName={this.props.question.firstName}
          lastName={this.props.question.lastName}
        />

        <div className={styles.questionAndAnswerContainer}>

          <p className={styles.question}> {this.props.question.questionText} </p>
          <p className={styles.date}> {<Moment date={date}/>} </p>

          <button onClick={() => this.displayAnswerForm()} className={styles.button} >
            Answer
          </button>

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

      </div>
    );
  }
}

export default Question;
