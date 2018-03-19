import React from 'react';
import ReactDOM from 'react-dom';
import Question from './question.jsx';
import Header from './header.jsx';
import styles from '../styling/app.css';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: [],
      loading: true,
      // pathname: window.location.pathname,
    };
  }

  componentDidMount() {
    const idFromPathname = window.location.pathname.split('/')[2];
    console.time()
    fetch(`http://localhost:3004/api/listings/${this.props.ID || idFromPathname || 0}/q-and-a/`)
      .then(res => res.json())
      .then((result) => {
        console.log('pp',result)
        console.timeEnd()
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
          {this.state.realData.map((question, index) => (
            <Question
              question={question}
              key={question.questiontext}
            />
          ))}
        </div>

      </div>
    );
  }
}

export default QuestionsAndAnswers;
window.QuestionsAndAnswers = QuestionsAndAnswers;
