import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

// Main navigation bar that is at the top of every page
class NavBar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/members'>Find People</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
