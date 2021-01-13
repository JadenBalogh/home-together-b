import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../about/About';
import Members from '../members/Members';
import Listings from '../listings/Listings';
import Maps from '../map/Map';

// Main component that renders all pages in our app
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={About} />
        <Route exact path='/members' component={Members} />
        <Route exact path='/listings' component={Listings} />
        <Route exact path='/maps' component={Maps} />
      </Switch>
    );
  }
}

export default Main;
