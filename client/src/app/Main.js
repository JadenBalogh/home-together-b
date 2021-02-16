import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../about/About';
import Members from '../members/Members';
import Listings from '../listings/Listings';
import Signup from '../signup/Signup';
import SignIn from '../signin/SignIn';

// Main component that renders all pages in our app
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={About} />
        <Route exact path='/members' component={Members} />
        <Route exact path='/listings' component={Listings} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={SignIn} />
      </Switch>
    );
  }
}

export default Main;
