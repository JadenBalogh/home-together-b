import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../shared/Styles.css';

// Main navigation bar that is at the top of every page
class NavBar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><NavLink to='/' className='navbar-header'>HomeTogether.ca</NavLink></li>
          <li><NavLink to='/'>About</NavLink></li>
          <li><NavLink to='/members'>Find People</NavLink></li>
          <li><NavLink to='/listings'>Find Services</NavLink></li>
          <li><NavLink to='/maps'>Map</NavLink></li>
          <li><NavLink to='/signup'>Signup</NavLink></li>
          <li><NavLink to='/signin'>Sign In</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
