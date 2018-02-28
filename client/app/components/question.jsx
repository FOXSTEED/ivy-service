import React from 'react';
import Answer from './answer.jsx';
import Answers from './answers.jsx';
import Avatar from './avatar.jsx';
import ShowAnswersButton from './showAnswersButton.jsx';
import styles from '../styling/app.css';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answersDisplayed: false
    }
  }

  displayAllAnswers() {
    const boolean = this.state.answersDisplayed;
    this.setState({
      answersDisplayed: !boolean,
    });
  }

  render() {
    return (
      <div className={styles.questionContainer}>

        <Avatar
          avatar={this.props.question.avatar}
          firstName={this.props.question.firstName}
          lastName={this.props.question.lastName}
        />


        <div className={styles.questionAndAnswerContainer}>

          <p className={styles.question}> {this.props.question.questionText} </p>
          <p className={styles.date}> {this.props.question.date}</p>

          <button className={styles.button}> Answer </button>
          <ShowAnswersButton 
            displayAllAnswers={this.displayAllAnswers.bind(this)} 
            answers={this.props.question.answers}
            answersDisplayed={this.state.answersDisplayed}
          />
          
          <Answers answers={this.props.question.answers.slice(0,1)}/>
          {this.state.answersDisplayed ? <Answers answers={this.props.question.answers.slice(1)}/> : null}

        </div>

      </div>
    );
  }
};

export default Question;
