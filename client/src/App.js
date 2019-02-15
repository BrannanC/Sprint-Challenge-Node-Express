import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Projects from './Project/Projects';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Projects</h1>
        <Projects />
      </div>
    );
  }
}

export default App;
