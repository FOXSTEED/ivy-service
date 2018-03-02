import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import QuestionsAndAnswers from '../client/app/components/questionsAndAnswers.jsx';
import 'isomorphic-fetch'; // / ?????? WTF
const database = require('../database/data');

describe('React', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QuestionsAndAnswers />, div);
  });
});

describe('Entries in database', () => {
  test('Should have 200 items corresponding to agreed upon number of attractions', (done) => {
    function callback(err, num) {
      if (err) {
        console.log('error getting count');
      }
      expect(num).toEqual(200);
      done();
    }
    database.QuestionModel.count(callback);
  });

  test('Should return only one object when querying database by id', (done) => {
    function callback(err, data) {
      if (err) {
        console.log('error retreiving data');
      }
      expect(typeof data).toEqual('object');
      done();
    }
    database.getById(0, callback);
  });

  test('Fake Q&A data should contain at least one question per attraction', (done) => {
    function callback(err, data) {
      if (err) {
        console.log('error retreiving data');
      }
      expect(data.questions.length >= 1).toEqual(true);
      done();
    }

    database.getById(50, callback);
  });

  test('Fake Q&A data should contain at least one answer per question', (done) => {
    function callback(err, data) {
      if (err) {
        console.log('error retreiving data');
      }
      expect(data.questions[0].answers.length >= 1).toEqual(true);
      done();
    }
    database.getById(100, callback);
  });
});
