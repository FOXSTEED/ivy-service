import React from 'react';
import ReactDOM from 'react-dom';
import attractionsData from '../../fakeData';
import Question from './components/question.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temporaryData: attractionsData[0],
    };
  }

  render() {
    console.log(this.state.temporaryData);
    return (
      <div className="main">

        <div className="questionsAndAnswers">
          {this.state.temporaryData.questions.map( (question, index) => (
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
