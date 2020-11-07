import React, { Component } from 'react';
import '../stylesheets/App.css';
import '../components/Home.js';
import Main from './Main';
import NavBar from './NavBar';
import reportWebVitals from '../reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
