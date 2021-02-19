import { AppBar } from '@material-ui/core';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../shared/Styles.css';

// Main navigation bar that is at the top of every page
class NavBar extends Component {
  render() {
    return (
      <AppBar position='static' style={{ background: '#181818' }}>
        <Toolbar className='navbar-toolbar'>
            <Grid item xs={12} sm={2} container direction='rows'
            alignItems='center'
            justify='flex-start'>
              <NavLink to='/' className='navbar-header'>
                <Typography variant="h5">HomeTogether.ca</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/'>
                <Typography>About</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/members'>
                <Typography>Find People</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/listings'>
                <Typography>Find Services</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/profile'>
                <Typography>Profile</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/edit-profile'>
                <Typography>Edit Profile</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/signup'>
                <Typography>Signup</Typography>
              </NavLink>
            </Grid>
            <Grid item xs={12} sm={1} container direction='rows' alignItems='center' justify='center' className='navbar-minis'>
              <NavLink to='/signin'>
                <Typography>Sign In</Typography>
              </NavLink>
            </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
