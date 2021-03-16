import React, { Component } from "react";
import Footer from "../footer/Footer";
import Grid from "@material-ui/core/Grid";
import "../footer/Footer.css";

// Home page
class Home extends Component {
  render() {
    return (
      <div className="homepage-container">
        <Grid container className="homepage-container" direction="column">
          <Grid item container className="logo-container" item xs={12} direction="column">
            <img className='logoimg' alt='Sample' src={require('../shared/htlogo.png').default} /></Grid>
          <Grid item container item xs={12} direction="row">
            <Grid item xs>
              <img className='roundimg' alt='Sample' src={require('../about/stock-bike.jpg').default} />
              <p>A Free Canadian Home-sharing website.</p>
            </Grid>
            <Grid item xs>
              <img className='roundimg' alt='Sample' src={require('../about/stock-bike.jpg').default} />
              <p>Supporting the growth and success of shared living across the country!</p>
            </Grid>
            <Grid item xs>
              <img className='roundimg' alt='Sample' src={require('../about/stock-bike.jpg').default} />
              <p>Our mandate is to facilitate the growth and success of shared living in Canada.</p>
            </Grid>
          </Grid>
          <Grid item container item xs={12} direction="row">
            <Grid item xs>
              <h3>Our Mandate</h3>
              <p>
                Home Together Canada is a volunteer-run, non-profit Association. Our mandate is to facilitate the growth and success of shared living in Canada. We do this by freely providing the two fundamental needs
                necessary to the success of both the individuals wishing to share homes, and the service providers and businesses wishing to serve this burgeoning and diverse group. We accomplish the first need - to maximize
                the number of individuals available to each other- by providing a single non-competitive, non-profit site with the basic preliminary tools individuals require to find others of similar mind. We accomplish the
                second need - for individuals to find and access sharing and matching services, businesses, housing and organizations - by providing free and equal descriptive listings with website links to all Canadian
                sharing providers. This provides individuals immediate information and access to the services they are in search of, and in turn, provides the businesses and services maximum and immediate exposure to this
                large and diverse group.
                            </p>
            </Grid>
          </Grid>
        </Grid>
        <Footer Footer={Footer}></Footer>
      </div>
    );
  }
}

export default Home;
