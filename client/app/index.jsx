import React from 'react';
import ReactDOM from 'react-dom';
import attractionsData from '../../fakeData';
import Question from './components/question.jsx';
import styles from './styling/app.css';

console.log(styles); 

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
    //console.log(window.location.href, typeof window.location.href );
    // http://localhost:3004/attractions/0
    fetch('http://localhost:3004/attractions/199')
      .then(res => res.json())
      .then((result) => {
        //console.log(result);
        this.setState({ 
          realData: result,
          loading: false,
        });
      });
  }

  render() {
    //console.log('real data ---->', this.state.realData);
    if (this.state.loading) {
      return (
        <p>This thang is looooaaadddiinnnggguuuuhhh hold your horses!!!</p>
      );
    }

    return (
      <div className={styles.main}>
        
        <h1 className={styles.title}>Questions & Answers</h1>

        <button className={styles.button}>
          Ask a question
        </button>

        <br></br>

        <div className="questionsAndAnswers">
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
