import React from 'react';
import Grid from '@material-ui/core/Grid';

function AboutBlockCenter(props) {
  return (
    <Grid className='about-block-center' direction='column' >
      <Grid item xs={12} container alignItems='center' justify='center'>
        <h1 className='about-block-header'>{props.title}</h1>
      </Grid>
      <Grid className='about-block-desc' item xs={12} container alignItems='center' justify='center'>
        <p>{props.desc}</p>
      </Grid>
    </Grid>
  );
}

export default AboutBlockCenter;
