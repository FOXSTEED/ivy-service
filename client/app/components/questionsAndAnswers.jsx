import React from 'react';
import ReactDOM from 'react-dom';
import Question from './question.jsx';
import Header from './header.jsx';
import styled from 'styled-components';

const Main = styled.div`
  padding: 10px;
`;


export default class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realData: [],
      loading: true,
    };
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    let path = window.location.pathname.split('/');
    let idFromPathname = Number(path[path.length-2])
    console.time()
    fetch(`http://localhost:3004/api/listings/${this.props.ID || idFromPathname || 0}/q-and-a/`)
      .then(res => res.json())
      .then((result) => {
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
      <Main>
        <div>
          {this.state.realData.map((question, index) => (
            <Question
              question={question}
              key={question.questiontext}
            />
          ))}
        </div>
      </Main>
    );
  }
}


