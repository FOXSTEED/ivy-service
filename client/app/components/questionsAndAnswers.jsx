import React from 'react';
import ReactDOM from 'react-dom';
import Question from './question.jsx';
import Header from './header.jsx';
import styles from '../styling/app.css';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: {},
      loading: true,
      pathname: window.location.pathname,
    };
  }

  componentDidMount() {
    const idFromPathname = this.state.pathname.split('/')[2];
    fetch(`http://localhost:3004/api/listings/${this.props.ID || idFromPathname || 0}/q-and-a/`)
      .then(res => res.json())
      .then((result) => {
        this.setState({ 
          realData: result,
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <p>Page is loading</p>
      );
    }

    return (
      <div className={styles.main}>

        <Header />

        <div className={styles.allQuestionsAndAnswersContainer}>
          {this.state.realData.questions.map((question, index) => (
            <Question
              question={question}
              key={question.questionText}
            />
          ))}
        </div>

      </div>
    );
  }
}

export default QuestionsAndAnswers;
window.QuestionsAndAnswers = QuestionsAndAnswers;
