// React & Material-ui imports
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { InputLabel, MenuItem } from '@material-ui/core';

// My Imports
import ListingList from './ListingList';
import PaginationControlled from './Pagination';
import { SearchClearSnackbar } from '../shared/snackbars';
import './Listings.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: '25px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


// Search page for members
function Listings(props) {
  const [listings, setListings] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [categoryId, setCategoryId] = useState(-1);

  useEffect(fetchCategoryOptions, []);
  useEffect(updateListings, [categoryId]);

  function updateListings() {
    const route = '/api/get-listings?';
    const params = new URLSearchParams(`categoryId=${categoryId}`).toString();
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route + params)
      .then((res) => res.json())
      .then((json) => {
        setListings(json);
      });
  }

  /*   function handleDropdownChange(selection) {
      let id = selection ? selection.value : -1;
      setCategoryId(id);
    } */

  function fetchCategoryOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-category-types')
      .then((res) => res.json())
      .then((json) => {
        let options = json.map((x) => {
          return { value: x.id, label: x.name };
        });
        setCategoryOptions(options);
      });
  }

  const classes = useStyles();
  // TODO: Update this to connect to the DB, current categories are only placeholders, the proper ones will be pulled from the DB
  return (
    <div className='listings-container'>
      <Typography component="h1" variant="h5">
        Find Services:
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="flex-end">
          <Grid item xs>
            <InputLabel>
              Select a Category:
            </InputLabel>
            <Select isClearable id="category" className='listing-select' name={'categoryId'} required value={props.category} onChange={props.handleDropdownChange}>
              <MenuItem value="1">Rentals</MenuItem>
              <MenuItem value="2">Home and Yard Services</MenuItem>
              <MenuItem value="3">Legal and Sales Services</MenuItem>
              <MenuItem value="4">Classes, Clubs, and Events</MenuItem>
            </Select>
          </Grid>
          <Grid item xs>
            <InputLabel>
              Select a Sub-category:
            </InputLabel>
            <Select isClearable id="sub-category" defaultValue="1" className='listing-select' name={'sub-categoryId'} required value={props.category} onChange={props.handleDropdownChange}>
              <MenuItem value="1">All Sub-categories</MenuItem>
              <MenuItem value="2">Sub 2</MenuItem>
              <MenuItem value="3">Sub 3</MenuItem>
              <MenuItem value="4">Sub 4</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center" alignItems="flex-start" wrap="wrap">
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="titleText"
              label="Listing Title"
              name="listingTitle"
              placeholder="Example"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="postalCode"
              label="Postal Code"
              name="postalCode"
              placeholder="V1V 1V1"
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="minimumRating"
              label="Minimum Rating"
              name="minimumRating"
              placeholder="0.0 to 5.0"
              autoFocus
            /></Grid>
          <Grid item xs={3}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="maximumRating"
              label="Maximum Rating"
              name="maximumRating"
              placeholder="0.0 to 5.0"
              autoFocus
            />
          </Grid>
        </Grid>
      </form>
      <SearchClearSnackbar SearchClearSnackbar={SearchClearSnackbar}></SearchClearSnackbar>
      <ListingList listings={listings}></ListingList>
      <Grid container direction="column" justify="center" alignItems="center">
      <PaginationControlled PaginationControlled={PaginationControlled}></PaginationControlled>
      </Grid>
    </div>
  );
}

export default Listings;
