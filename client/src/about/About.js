import React from 'react';
import AboutBlock from './AboutBlock';
import bikeImg from './stock-bike.jpg';
import blueprintsImg from './stock-blueprints.jpg';
import Footer from '../footer/Footer';
import './About.css';

// About page
function About(props) {
  return (
    <div className='about'>
      <AboutBlock
        title='About Us'
        desc={
          <div>
            In late 2015 Home Together Canada&#39;s founding member placed an online ad in search of others to share her
            home. The number of responses and the diversity of needs and desires that came from those responses and many
            more that followed, motivated her to research why living collectively in a shared home was so desired and
            yet so hard to attain.
            <br />
            <br />
            What she found was that sharing homes and living collectively with others was the outward desire of many and
            the silent dream of many more. But they were lacking: 1) a way to safely find other individuals wanting to
            share a home that was large enough for them to find others that were compatible, and 2) the help they needed
            to move forward and create a shared home, whether that be through workshops, seminars, sharing businesses or
            other sharing services groups.
            <br />
            <br />
            It became apparent that it was not only the individuals that were having difficulties finding success, but
            also the businesses and groups trying to provide for this large and diverse group.
          </div>
        }
        image={bikeImg}
      />
      <AboutBlock
        title='In early 2017, a volunteer Board was formed and Home Together Canada became
        an incorporated, non-profit association.'
        desc={
          <div>
            <p style={{ color: 'red' }}></p>The question to be answered was, how to find a solution that would bring
            more people together in one place so they had adequate numbers to find compatible others and how to ensure
            those individuals could find the services and help they need to succeed at sharing a home together.
            <br />
            <br />
            Through extensive on-line research, community meetings, information booths, reaching out and collaborating
            with groups working to create services, communicating with city and provincial organizations, and a first
            draft website with nearly four hundred participants;
            <br />
            <br />
            Home Together Canada determined that the solution was to create and provide a central <u>
              non-competitive
            </u>{' '}
            stepping stone site where 1) all Canadian&#39;s interested in any kind of shared or companion living would
            freely register to find others of like mind and 2) where all existing and new home sharing services, housing
            and businesses are provided full and free listing of their service with links to their sites.
            <br />
            <br />
            This determination came from many volunteer hours culminating in the conclusion that maximizing the number
            of individuals available to each other in one place 1) provides individuals enough diversity in choice to
            find others of like mind no matter what matching service or housing provider they are or wish to register
            with and 2) ensures new and existing groups and businesses have immediate exposure to the ever growing
            number of Canadians wanting and needing the sharing services they provide, which at the same time ensures
            individuals will have immediate access to the services they want and need.
            <br />
            <br />
            As a volunteer board we facilitate the growth and success of shared living in Canada by freely providing
            hometogether.ca across the nation.
          </div>
        }
        image={blueprintsImg}
      />
      <Footer Footer={Footer}></Footer>
    </div>
  );
}

export default About;
