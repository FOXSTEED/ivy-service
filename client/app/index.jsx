import React from 'react';
import ReactDOM from 'react-dom';
//import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return <p> Hello React! made change</p>;
  }
}

//render(<App/>, document.getElementById('app'));

ReactDOM.render(<App/>, document.getElementById('app'))