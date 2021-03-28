import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Card, Divider, Button, Box } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import headerImg from '../images/image10.jpg';
import mandateImg from '../images/image8.jpg';
import './Home.css';

// Home page
function Home() {
  let history = useHistory();

  return (
    <Card className='page'>
      <Grid container direction='column'>
        <img className='home-header-img' alt='' src={headerImg} />
        <h1 className='home-header-text'>Home Together Canada</h1>
        <h2 className='home-subtitle-left'>A free home-sharing website...</h2>
        <h2 className='home-subtitle-right'>...supporting the growth and success of shared living across Canada.</h2>
        <Divider />
        <Grid item container direction='row' className='home-mandate-container'>
          <Grid item xs={4}>
            <img className='home-mandate-img' alt='' src={mandateImg} />
          </Grid>
          <Grid item xs={8} container direction='column' alignItems='center'>
            <h1 className='home-mandate-text'>HomeTogether.ca is free because...</h1>
            <h4 className='home-mandate-subtitle'>
              Our mandate is to facilitate the growth and success of shared living in Canada.
            </h4>
            <Grid item xs container direction='row' justify='center' alignItems='flex-end'>
              <div className='home-mandate-more-container'>
                <Button onClick={() => history.push('/about')}>
                  <h4 className='home-mandate-more'>Read more...</h4>
                  <ArrowForwardIcon fontSize='small' />
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item xs></Grid>
        <Grid item container xs={12} direction='row'>
          <Grid item xs></Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Home;
