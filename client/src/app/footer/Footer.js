import React from 'react';
import Grid from '@material-ui/core/Grid';

function Footer(props) {
  return (
    <Grid className='footer-container' direction='row'>
      <Grid item xs={3}>
        <h3>About:</h3>
        <p>
          Home Together is a volunteer-run, non-profit Association facilitating the growth and success of shared living
          in Canada.
        </p>
      </Grid>

      <Grid item xs={3} direction='column'>
        <h3>Contact:</h3>
        <a href='mailto:contact@HomeTogether.ca' class='flink'>
          Contact@hometogether.ca
        </a>
        <br></br>
        <a href='tel:+12505551234' class='flink'>
          (250) 555-1234
        </a>
        <p>1234 Home Together Street, Vancouver, BC, Canada.</p>
      </Grid>

      <Grid item xs={3}>
        <h3>Legal:</h3>
        <p>
          <a href='/privacy-policy'>Privacy Policy</a>
          <br></br> <a href='/terms-of-service'>Terms of Service</a>
          <br></br>
          <br></br>2015 - 2021. <br></br> All Rights Reserved
        </p>
      </Grid>
    </Grid>
  );
}

export default Footer;
