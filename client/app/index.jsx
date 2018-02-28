import React from 'react';
import ReactDOM from 'react-dom';
import attractionsData from '../../fakeData';
import Question from './components/question.jsx';
import Header from './components/header.jsx';
import styles from './styling/app.css';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temporaryData: attractionsData[0],
      realData: {},
      loading: true
    };
  }

  componentWillMount() {
    fetch('http://localhost:3004/attractions/7')
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

        <br></br>

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

ReactDOM.render(<QuestionsAndAnswers />, document.getElementById('questions-and-answers'));
