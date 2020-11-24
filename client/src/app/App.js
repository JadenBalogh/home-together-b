import React, { Component } from 'react';
import Main from './Main';
import NavBar from './NavBar';
import './App.css';

// Base component of the app in which everything is rendered
class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavBar />
        <Main />
      </div>
    );
  }
}

export default App;
