import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, render } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionsAndAnswers from '../client/app/components/questionsAndAnswers.jsx';
import Header from '../client/app/components/header.jsx';
import Question from '../client/app/components/question.jsx';
import Avatar from '../client/app/components/avatar.jsx';
import ShowAnswersButton from '../client/app/components/showAnswersButton.jsx';
import AnswerSubmissionForm from '../client/app/components/answerSubmissionForm.jsx';
import QuestionSubmissionForm from '../client/app/components/questionSubmissionForm.jsx';
import Answers from '../client/app/components/answers.jsx';
import Answer from '../client/app/components/answer.jsx';
import attractionsData from '../fakeData.js';


configure({ adapter: new Adapter() });

const database = require('../database/data');

describe('Tests client', () => {

  describe('Basic tests', () => {
    it('renders without crashing on initial page load', () => {
      const div = document.createElement('div');
      ReactDOM.render(<QuestionsAndAnswers />, div);
    });
  
    it('renders  1 component on inital page load', () => {
      const wrapper = shallow(<QuestionsAndAnswers />);
      expect(wrapper).toHaveLength(1);
    });
  
    it('renders props correctly', () => {
      const wrapper = shallow(<QuestionsAndAnswers name="something"/>);
      expect(wrapper.instance().props.name).toBe('something');
    });
  });
  
  describe('QuestionsAndAnswers', () => {

    const wrapper = mount(<QuestionsAndAnswers />);
    const data = attractionsData[0];
    wrapper.setState({ realData: data });
    wrapper.setState({ loading: false });

    it('always renders a div with data', () => {
      const divs = wrapper.find("div");
      expect(divs.length).toBeGreaterThan(0);
    });

    it('renders Header component after fetching data', () => {
      expect(wrapper.find(Header).length).toBeGreaterThan(0);
    });

    it('renders Question component after fetching data', () => {
      expect(wrapper.find(Question).length).toBeGreaterThan(0);
    });

    it('renders Avatar component after fetching data', () => {
      expect(wrapper.find(Avatar).length).toBeGreaterThan(0);
    });
  
    it('renders Answers component after fetching data', () => {
      expect(wrapper.find(Answers).length).toBeGreaterThan(0);
    });
  });

  
  describe('Header Component', () => {
    it('should change formIsDisplayed in component state to true on button click', () => {
      const wrapper = shallow(<Header />);
      console.log(wrapper.debug());
      const button = wrapper.find('button.headerButton');
      button.simulate('click');
      expect(wrapper.state().formIsDisplayed).toEqual(true);
    });
  
    it('should not show question submission form on initial page load', () => {
      const wrapper = shallow(<Header />);
      expect(wrapper.find('QuestionSubmissionForm').length).toEqual(0);
    });
  
    it('should show question submission form once button is clicked', () => {
      const wrapper = shallow(<Header />);
      wrapper.setState({ formIsDisplayed: true });
      expect(wrapper.find('QuestionSubmissionForm').length).toEqual(1);
    });
  });
  
  describe('Question Component', () => {
  
    it('renders 1 component', () => {
      const wrapper = shallow(<Question question={attractionsData[0].questions[0]} />);
      expect(wrapper).toHaveLength(1);
    });
  
    it('renders  props correctly', () => {
      const wrapper = shallow(<Question name={'something'} question={attractionsData[0].questions[0]}/>);
      expect(wrapper.instance().props.name).toBe('something');
    });
  
    it('should display one answer from data on initial page load', () => {
      const data = attractionsData[0].questions[0];
      const wrapper = shallow(<Question question={data} />);
      expect(wrapper.find('Answers').length).toEqual(1);
    });
  
    it('should change answerFormDisplayed in component state to true on button click', () => {
      const wrapper = shallow(<Question question={attractionsData[0].questions[0]} />);
      const button = wrapper.find('button.button');
      button.simulate('click');
      expect(wrapper.state().answerFormDisplayed).toEqual(true);
    });
  });
});

// Testing for database
describe('Tests database', () => {
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
  
})