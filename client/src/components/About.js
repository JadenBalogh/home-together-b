import React, { Component } from 'react';

import teamImg from '../images/team.jpg'
import '../index.css';

// About page
class About extends Component {
  render() {
    return (
      <div class="about">
        <h1>Welcome To HomeTogether.ca</h1>
        <div class="flex flex-justify-between flex-item-center border p-20 round-20 hover-shadow">
          <div class="flex-grow-1 pr-20">
            <h3>Our Purpose...</h3>
              <p>
              As an established and ambitious international Management School, research is at the heart of our success and informs our teaching, pushes boundaries and transforms lives. Through our collaborative approach and cutting edge knowledge we strive to be a beacon for top talent.
              </p>
              <p>
              As an established and ambitious international Management School, research is at the heart of our success and informs our teaching, pushes boundaries and transforms lives. Through our collaborative approach and cutting edge knowledge we strive to be a beacon for top talent.
              </p>
          </div>
          <div>
            <img class='round-20' src={teamImg} />
          </div>
        </div>
        <div class="flex flex-justify-between flex-item-center border mt-20 mb-20 p-20 round-20 hover-shadow">
        <div>
            <img class='round-20' src={teamImg} />
          </div>
          <div class="flex-grow-1 pl-20">
            <h3>Our History...</h3>
            
              <p>
              As an established and ambitious international Management School, research is at the heart of our success and informs our teaching, pushes boundaries and transforms lives. Through our collaborative approach and cutting edge knowledge we strive to be a beacon for top talent.
              </p>
              <p>
              As an established and ambitious international Management School, research is at the heart of our success and informs our teaching, pushes boundaries and transforms lives. Through our collaborative approach and cutting edge knowledge we strive to be a beacon for top talent.
              </p>
          </div>
          
        </div>
      </div>
    );
  }
}

export default About;
