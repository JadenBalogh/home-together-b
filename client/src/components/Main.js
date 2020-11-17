import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Members from './Members';
import Listings from './Listings';
import About from './About';
import '../index.css';

// Main component that renders all pages in our app
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/members' component={Members} />
        <Route exact path='/listings' component={Listings} />
        <Route exact path='/About' component={About} />
      </Switch>
    );
  }
}

export default Main;
