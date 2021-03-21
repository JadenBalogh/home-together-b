import React from 'react';
import { Grid, Divider } from '@material-ui/core';

export default function Footer() {
  return (
    <div className='footer'>
      <Grid container direction='column' className='footer-content'>
        <Grid item container xs={12} direction='row' justify='space-between' alignItems='center'>
          <Grid item xs={6} direction='column'>
            <h3>Contact:</h3>
            <p className='footer-text'>
              <a href='mailto:contact@HomeTogether.ca' class='flink'>
                Contact@hometogether.ca
              </a>
              <br />
              <a href='tel:+12505551234' class='flink'>
                (250) 555-1234
              </a>
            </p>
            <p className='footer-text'>1234 Home Together Street, Vancouver, BC, Canada.</p>
          </Grid>
          <Grid item xs={6}>
            <h3>Legal:</h3>
            <p className='footer-text'>
              <a href='/privacy-policy'>Privacy Policy</a>
              <br />
              <a href='/terms-of-service'>Terms of Service</a>
            </p>
            <p className='footer-text'>All Rights Reserved. 2015 - 2021.</p>
          </Grid>
        </Grid>
        <Divider />
        <Grid item xs={12}>
          <p className='footer-endnote'>
            <i>
              Home Together is a volunteer-run, non-profit Association facilitating the growth and success of shared
              living in Canada.
            </i>
          </p>
        </Grid>
      </Grid>
    </div>
  );
}
