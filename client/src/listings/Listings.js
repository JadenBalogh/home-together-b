import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Card,
  Divider,
  Tooltip,
  InputLabel,
  FormControl,
  Select,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InfoIcon from '@material-ui/icons/Info';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ListingList from './ListingList';
import PaginationControlled from './Pagination';
import { SearchClearSnackbar } from '../shared/snackbars';
import LocationFilter from '../shared/LocationFilter';

// Search page for members
function Listings() {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    locationIds: [],
    title: '',
    minRating: '',
    maxRating: '',
  });
  const [subcategoryId, setSubcategoryId] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState({});
  const reset = useCallback(() => {
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
        setCategoryOptions(options.filter((x) => !x.parentId));
        let subCats = {};
        for (var o of options.filter((x) => x.parentId)) {
          let arr = subCats[o.parentId];
          subCats[o.parentId] = arr ? [...arr, o] : [o];
        }
        setSubcategoryOptions(subCats);
      });
  }

  function handleSubcategoryChange(event) {
    console.log(event.target.value);
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

  return (
    <Card>
      <Grid container direction='row'>
        <Grid item xs={4} container direction='column' alignItems='center' className='page'>
          <Typography component='h1' variant='h5' align='center'>
            Classifieds and Home Share Links
          </Typography>
          <Grid item container direction='row'>
            <Grid item xs={12}>
              <Divider light />
            </Grid>
          </Grid>
          <br />
          <Grid item container direction='row' alignItems='center'>
            <Tooltip
              title='Home Together offers free and fair promotion of all home sharing services to provide our users with easy
              access to the information and services they need.'
            >
              <InfoIcon />
            </Tooltip>
            &ensp;
            <Grid item xs>
              Find relevant home sharing services using the search options below.
            </Grid>
          </Grid>
          <br />
          <Grid item container direction='row' alignItems='center'>
            <SearchIcon fontSize='large' />
            <InputLabel>Search:</InputLabel>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                fullWidth
                label='Search...'
                name='title'
                value={filters.title}
                placeholder='Example'
                onChange={handleFilterChange}
                autoFocus
              />
            </Grid>
          </Grid>
          <br />
          <Grid item container direction='row' alignItems='center'>
            <LocationOnIcon fontSize='large' />
            <InputLabel>Filter by city:</InputLabel>
            <Grid item xs={12}>
              <LocationFilter label='Select your desired cities...' onChange={handleLocationsChange} />
            </Grid>
          </Grid>
          <br />
          <Grid item container direction='row' justify='center'>
            <Grid item>
              <SearchClearSnackbar clear={reset} />
            </Grid>
          </Grid>
        </Grid>
        <Divider flexItem orientation='vertical' />
        <Grid item xs container direction='column' alignItems='center' className='page'>
          <Grid item container direction='row' justify='center' alignItems='baseline'>
            <Typography variant='h6' align='center'>
              Category:
            </Typography>
            &ensp;
            <FormControl onChange={handleSubcategoryChange}>
              {/* <InputLabel htmlFor='categoryId'>Select a category...</InputLabel> */}
              <Select name='categoryId' native defaultValue='' id='categoryId'>
                <option value=''>All</option>
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
            </FormControl>
          </Grid>
          <br />
          <ListingList listings={listings}></ListingList>
          <br />
          <Grid container direction='column' justify='center' alignItems='center'>
            <PaginationControlled PaginationControlled={PaginationControlled}></PaginationControlled>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Listings;
