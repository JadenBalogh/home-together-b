import React, { useState, useEffect, useCallback } from 'react';
import { Select, Grid, Typography, TextField, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ListingList from './ListingList';
import PaginationControlled from './Pagination';
import { SearchClearSnackbar } from '../shared/snackbars';
import Footer from '../footer/Footer';
import './Listings.css';
import LocationFilter from '../shared/LocationFilter';

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
  multiLabel: {
    marginTop: '15px',
    marginBottom: '5px',
  },
}));

// Search page for members
function Listings(props) {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    locationIds: [],
    title: '',
    minRating: '',
    maxRating: '',
  });
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState({});
  const reset = useCallback(() => {
    setCategoryId('');
    setSubcategoryId('');
    setFilters({ locationIds: [], title: '', minRating: '', maxRating: '' });
  }, []);

  useEffect(fetchCategoryOptions, []);
  useEffect(updateListings, [subcategoryId, filters]);

  function updateListings() {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-listings?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId: subcategoryId, filters }),
    })
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
        console.log("---options--", options)
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
  }

  function handleFilterChange(event) {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  }

  function handleLocationsChange(event, options) {
    setFilters({
      ...filters,
      locationIds: options.map((x) => x.value),
    });
  }

  console.log("----setSubcategoryOptions---", subcategoryOptions)
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
              native
              onChange={handleCategoryChange}
            >
              <option value='' />
              {categoryOptions.length > 0 && Object.keys(subcategoryOptions).length > 0 ? (
                categoryOptions.map((cat) => (
                  <optgroup key={cat.id} label={`${cat.name}`}>
                    {subcategoryOptions[cat.id] ? (
                      subcategoryOptions[cat.id].map((subcat) => (
                        <option key={subcat.id} value={subcat.id}>{`${subcat.name}`}</option>
                      ))
                    ) : (
                      <></>
                    )}
                  </optgroup>
                ))
              ) : (
                <option value='' />
              )}
            </Select>
          </Grid>
          {/* <Grid item xs  >
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
          </Grid> */}
        </Grid>
        <Grid container spacing={2} justify='center' alignItems='center' wrap='wrap'>
          <Grid item xs={3}>
            <LocationFilter onChange={handleLocationsChange} />
          </Grid>
          <Grid item xs={3}>
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Listing Title'
              name='title'
              value={filters['title']}
              placeholder='Example'
              onChange={handleFilterChange}
              autoFocus
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type='number'
              variant='outlined'
              margin='normal'
              fullWidth
              label='Minimum Rating'
              value={filters['minRating']}
              name='minRating'
              placeholder='0.0 to 5.0'
              onChange={handleFilterChange}
              autoFocus
            />
          </Grid>
        </Grid>
      </form>
      <SearchClearSnackbar clear={reset} />
      <br />
      <ListingList listings={listings}></ListingList>
      <br />
      <Grid container direction='column' justify='center' alignItems='center'>
        <PaginationControlled PaginationControlled={PaginationControlled}></PaginationControlled>
      </Grid>
      <Footer Footer={Footer}></Footer>
    </div>
  );
}

export default Listings;
