import React from 'react';
import AboutBlockLeft from './AboutBlockLeft';
import AboutBlockRight from './AboutBlockRight';
import bikeImg from './stock-bike.jpg';
import blueprintsImg from './stock-blueprints.jpg';
import personWritingImg from './stock-person-writing.jpg';
import './About.css';

// About page
function About(props) {
  return (
    <div className='about'>
      <h1>Welcome to HomeTogether.ca</h1>
      <AboutBlockLeft
        title='Our Purpose'
        desc={
          <div>
            HomeTogether is the non-profit hub for all things home sharing. Differing from other for-profit enterprises
            in the same space, HomeTogether aims to compete with nobody, by offering fair promotion of everyone.
            <br />
            <br />
            Users can browse local services, search for potential housemates, connect with local classes and seminars,
            seek out legal advice, and more. Organizations can list their services, events and more via our listing
            system for a small fee taken via PayPal which helps cover site costs. Organizations and Members directly
            involved in home sharing (e.g Government Shared Housing Projects) can list for free.
          </div>
        }
        image={bikeImg}
      />
      <AboutBlockRight
        title='Our History'
        desc={
          <div>
            Built on a modern web-stack of MySQL, Express, Node, and React; HomeTogether.ca was made for the 21st
            Century.
          </div>
        }
        image={blueprintsImg}
      />
      <AboutBlockLeft
        title='Contact Us'
        desc={
          <div>
            Phone: 111-222-3333<br/>
            E-Mail: Contact@HomeTogether.ca<br/>
            Address: 1234 Home Together Street, Vancouver, BC, Canada.<br/>
          </div>
        }
        image={personWritingImg}
      />
    </div>
  );
}

export default About;
