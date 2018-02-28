import React from 'react';
import QuestionSubmissionForm from './questionSubmissionForm.jsx';
import styles from '../styling/app.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsDisplayed: false,
    };
  }

  displaySubmissionForm() {
    const boolean = this.state.toggle;
    this.setState({
      formIsDisplayed: !boolean,
    });
  }

  render() {
    return (
      <div className={styles.header}>

        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Questions & Answers</h1>
        </div>

        <div className={styles.askButton}>
          <button className={styles.button} onClick={this.displaySubmissionForm.bind(this)}>
            Ask a question
          </button>
        </div>

        {this.state.formIsDisplayed ? <QuestionSubmissionForm /> : null}

      </div>
    );
  }
}

export default Header;

