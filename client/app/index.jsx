import React from 'react';
import ReactDOM from 'react-dom';
import QuestionsAndAnswers from './components/questionsAndAnswers.jsx';

ReactDOM.render(
  <QuestionsAndAnswers pathname={window.location.pathname}/>,
  document.getElementById('questions-and-answers'),
);

