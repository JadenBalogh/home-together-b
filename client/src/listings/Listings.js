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
  hidden: {
    visibility: 'hidden',
  },
}));

// Search page for members
function Listings(props) {
  const [listings, setListings] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState({});

  useEffect(fetchCategoryOptions, []);
  useEffect(updateListings, [subcategoryId]);

  function updateListings() {
    const route = '/api/get-listings?';
    const params = new URLSearchParams(`categoryId=${subcategoryId}`).toString();
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + route + params)
      .then((res) => res.json())
      .then((json) => {
        setListings(json);
      });
  }

  function fetchCategoryOptions() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    fetch(url + '/api/get-category-types')
      .then((res) => res.json())
      .then((options) => {
        setCategoryOptions(options.filter((x) => !x.parentId));
        let subCats = {};
        for (var o of options.filter((x) => x.parentId)) {
          let arr = subCats[o.parentId];
          subCats[o.parentId] = arr ? [...arr, o] : [o];
        }
        setSubcategoryOptions(subCats);
      });
  }

  function handleCategoryChange(event) {
    setCategoryId(event.target.value);
    setSubcategoryId('');
  }

  function handleSubcategoryChange(event) {
    let activeId = event.target.value;
    setSubcategoryId(activeId);
    console.log(activeId);
  }

  const classes = useStyles();
  return (
    <div className='listings-container'>
      <Typography component='h1' variant='h5'>
        Find Services:
      </Typography>
      <form className={classes.form} noValidate>
        <Grid container spacing={3} direction='row' justify='space-evenly' alignItems='flex-end'>
          <Grid item xs>
            <InputLabel>Select a Category:</InputLabel>
            <Select
              className='listing-select'
              name='categoryId'
              value={categoryId}
              required
              onChange={handleCategoryChange}
            >
              {categoryOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs className={subcategoryOptions[categoryId] ? '' : classes.hidden}>
            <InputLabel>Select a Sub-category:</InputLabel>
            <Select
              className='listing-select'
              name='subcategoryId'
              required
              value={subcategoryId}
              onChange={handleSubcategoryChange}
            >
              {subcategoryOptions[categoryId] ? (
                subcategoryOptions[categoryId].map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem key={-1}>-</MenuItem>
              )}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={2} justify='center' alignItems='flex-start' wrap='wrap'>
          <Grid item xs={3}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='titleText'
              label='Listing Title'
              name='listingTitle'
              placeholder='Example'
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='postalCode'
              label='Postal Code'
              name='postalCode'
              placeholder='V1V 1V1'
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='minimumRating'
              label='Minimum Rating'
              name='minimumRating'
              placeholder='0.0 to 5.0'
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              id='maximumRating'
              label='Maximum Rating'
              name='maximumRating'
              placeholder='0.0 to 5.0'
              autoFocus
            />
          </Grid>
        </Grid>
      </form>
      <SearchClearSnackbar SearchClearSnackbar={SearchClearSnackbar}></SearchClearSnackbar>
      <ListingList listings={listings}></ListingList>
      <Grid container direction='column' justify='center' alignItems='center'>
        <PaginationControlled PaginationControlled={PaginationControlled}></PaginationControlled>
      </Grid>
    </div>
  );
}

export default Listings;
