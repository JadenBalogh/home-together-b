import React, { Component } from 'react';
import { Grid, Card } from '@material-ui/core';
import './Home.css';

// Home page
class Home extends Component {
  render() {
    return (
      <Card className='page'>
        <Grid container className='homepage-container' direction='column'>
          <Grid item container className='logo-container' xs={12} direction='column'>
            <img className='logoimg' alt='Sample' src={require('../shared/htlogo.png').default} />
          </Grid>
          <Grid item container xs={12} direction='row' justify='center'>
            <Grid item xs>
              <img
                className='roundimg'
                alt='Sample'
                width='500'
                src={require('../shared/bigstock-Beautiful-Middle-Aged-Business-147085658.jpg').default}
              />
              <p>A Free Canadian Home-sharing website.</p>
            </Grid>
            <Grid item xs>
              <img
                className='roundimg'
                alt='Sample'
                width='500'
                src={require('../shared/bigstock-Beautiful-Middle-Aged-Business-147085658.jpg').default}
              />
              <p>Supporting the growth and success of shared living across the country!</p>
            </Grid>
          </Grid>
          <h2>HomeTogether.ca is free because:</h2>
          <Grid item xs>
            <p>Our mandate is to facilitate the growth and success of shared living in Canada.</p>
          </Grid>
          <Grid item container xs={12} direction='row'>
            <Grid item xs>
              <h3>Our Mandate</h3>
              <p>
                Home Together Canada is a volunteer-run, non-profit Association. Our mandate is to facilitate the growth
                and success of shared living in Canada. We do this by freely providing the two fundamental needs
                necessary to the success of both the individuals wishing to share homes, and the service providers and
                businesses wishing to serve this burgeoning and diverse group. We accomplish the first need - to
                maximize the number of individuals available to each other- by providing a single non-competitive,
                non-profit site with the basic preliminary tools individuals require to find others of similar mind. We
                accomplish the second need - for individuals to find and access sharing and matching services,
                businesses, housing and organizations - by providing free and equal descriptive listings with website
                links to all Canadian sharing providers. This provides individuals immediate information and access to
                the services they are in search of, and in turn, provides the businesses and services maximum and
                immediate exposure to this large and diverse group.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    );
  }
}

export default Home;
