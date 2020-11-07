import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../index.css';

// Main component that renders all pages in our app
class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/members' component={Members} />
      </Switch>
    );
  }
}

export default Main;
