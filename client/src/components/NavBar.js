import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';

// Main navigation bar that is at the top of every page
class NavBar extends Component {
  render() {
    return (
      <nav>
        <ul class="a-dropmenu">
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/members'>Find People</NavLink></li>
          <li><NavLink to='/listings'>Find Services</NavLink>
            <ul>
              <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span>Rentals</span><span>&gt;</span></NavLink>
                <ul>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                </ul>
              </li>
              <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span>House and Yard</span><span>&gt;</span></NavLink>
                <ul>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                </ul>
              </li>
              <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span>Legal and Sales</span><span>&gt;</span></NavLink>
                 <ul>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                </ul>
              </li>
              <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span>Classes, Clubs +</span><span>&gt;</span></NavLink>
                <ul>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                  <li><NavLink class='flex flex-justify-between flex-item-center' to='/about'><span class="flex-grow-1">LawnDoers</span><span>lawndoers.com</span><span>1-800-345-6543</span></NavLink></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;
