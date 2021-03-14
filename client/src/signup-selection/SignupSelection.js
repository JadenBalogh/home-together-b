import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import WorkIcon from '@material-ui/icons/Work';
import PersonIcon from '@material-ui/icons/Person';

class SignupSelection extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container component='main'>
        <div>
          <Typography component='h1' variant='h5'>
            Select Account Type
          </Typography>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Link href='/signup'>
                <IconButton>
                  <PersonIcon style={{ fontSize: 200 }}/>
                </IconButton>
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Link href='/business-signup'>
                <IconButton>
                  <WorkIcon style={{ fontSize: 200 }}/>
                </IconButton>
              </Link>              
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Typography component='h1' variant='h5'>
                Personal Account
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <Typography component='h1' variant='h5'>
                Business Account
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <p>
                <div>
                  Accounts for users looking to homeshare. Users can look for other members to homeshare with and share their homes.
                </div>
              </p>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              container
              direction='column'
              alignItems='center'
              justify='center'
            >
              <p>
                <div>
                  Accounts for users looking to create listings. Businesses can create and manage listings for services related to homesharing.
                </div>
              </p>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default SignupSelection;
