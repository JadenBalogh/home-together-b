import React, { Component } from 'react';

import vintageHouseImg from './stock-bike.jpg'
import floorPlanImg from './stock-blueprints.jpg'
import writingImg from './stock-person-writing.jpg'

// About page
class About extends Component {
  render() {
    return (


      <div class="about">
        <h1>Welcome to HomeTogether.ca</h1>
        <div class="infobox flex flex-justify-between flex-item-center border mt-20 mb-20 p-20 round-20 hover-shadow">
          <div class="flex-grow-1 pr-20">
            <h3>Our Purpose</h3>
            <p>
              HomeTogether is the non-profit hub for all things home sharing. Differing from other for-profit enterprises in the same space HomeTogether aims to compete with nobody, by offering fair promotion of everyone.
              </p>
            <p>
              Users can browse local services, search for potential housemates, connect with local classes and seminars, seek out legal advice, and more. Organizations can list their services, events and more via our listing system for a small fee taken via PayPal which helps cover site costs. Organizations and Members directly involved in home sharing (e.g Government Shared Housing Projects) can list for free.
              </p>
          </div>
          <div>
            <img class='round-20' src={vintageHouseImg} />
          </div>
        </div>
        <div class="infobox flex flex-justify-between flex-item-center border mt-20 mb-20 p-20 round-20 hover-shadow">
          <div>
            <img class='round-20' src={floorPlanImg} />
          </div>
          <div class="flex-grow-1 pl-20">
            <h3>Our History</h3>

            <p>
              Built on a modern web-stack of MySQL, Express, Node, and React; HomeTogether.ca was made for the 21st Century. 
              </p>
          </div>
        </div>
        <div class="infobox flex flex-justify-between flex-item-center border mt-20 mb-20 p-20 round-20 hover-shadow">
          <div class="flex-grow-1 pr-20">
            <h3>Contact Us</h3>
            <p>
              Phone: 111-222-3333 <br/>
              E-Mail: Contact@HomeTogether.ca <br/>
              Address: 1234 Home Together Street, Vancouver, BC, Canada. <br/>
            </p>
          </div>
          <div>
            <img class='round-20' src={writingImg} />
          </div>
        </div>
      </div>
    );
  }
}

export default About;
