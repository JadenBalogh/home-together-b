import { NavLink, useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Link } from '@material-ui/core';
import NavItem from './NavItem';
import './NavBar.css';

// Main navigation bar that is at the top of every page
export default function NavBar() {
  let history = useHistory();

  let logout = (event) => {
    event.preventDefault();
    sessionStorage.clear();
    history.push('/');
    window.location.reload();
  };

  return (
    <AppBar position='static' style={{ background: '#181818' }}>
      <Toolbar className='navbar-toolbar'>
        <Grid container>
          <Grid item xs={3} container alignItems='center' justify='flex-start'>
            <NavLink to='/' className='navbar-header-home'>
              <Typography variant='h5'>HomeTogether.ca</Typography>
            </NavLink>
          </Grid>
          <Grid item xs={9} container alignItems='center' justify='flex-end'>
            <NavItem path='/about' label='About' />
            {sessionStorage.getItem('id') ? <NavItem path='/members' label='Members' /> : <></>}
            <NavItem path='/listings' label='Classifieds & Home Share Links' />
            {sessionStorage.getItem('id') ? (
              <>
                <NavItem
                  path='/create-listing'
                  label={sessionStorage.getItem('accountType') === '1' ? 'New Listing' : 'List Member Home'}
                />
                <NavItem
                  path='/manage-listings'
                  label={sessionStorage.getItem('accountType') === '1' ? 'Manage Listings' : 'Manage Listing'}
                />
                <NavItem
                  path={sessionStorage.getItem('accountType') === '1' ? '/business-profile' : '/profile'}
                  label={sessionStorage.getItem('accountType') === '1' ? 'Account Details' : 'My Account'}
                />
                <div className='nav-item'>
                  <Link href='#' onClick={logout}>
                    <Typography className='navbar-minis'>Logout</Typography>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <NavItem path='/signup-selection' label='Signup' />
                <NavItem path='/signin' label='Login' />
              </>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
