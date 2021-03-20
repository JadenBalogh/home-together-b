import React from 'react';
import Grid from '@material-ui/core/Grid';

function AboutBlock(props) {
  return (
    <Grid className='about-block' direction='column' alignItems='center'>
      <h2 className='about-block-header'>{props.title}</h2>
      <p>{props.desc}</p>
      <img className='about-block-img' alt='' src={props.image} />
    </Grid>
  );
}

export default AboutBlock;
