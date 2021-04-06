import React, { Component } from 'react';
import Main from './main/Main';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import './App.css';

// Base component of the app in which everything is rendered
class App extends Component {
  render() {
    return (
      <div className='App'>
        <NavBar />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
