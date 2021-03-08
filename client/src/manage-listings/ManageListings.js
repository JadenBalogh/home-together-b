import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import '../shared/List.css';

const useStyles = makeStyles({
  table: {
    width: 800,
  },
  row: {
    position: 'relative',
    border: 'solid 1px gray',
    boxShadow: '1px 1px gray',
    padding: 15,
    '&:hover': {
      boxShadow: '3px 3px gray',
      top: -2,
      left: -2,
    },
  },
  title: {
    cursor: 'pointer',
  },
});

export default function ManageListings() {
  const classes = useStyles();
  let [listings, setListings] = useState([]);

  let loadListings = () => {
    console.log('yuh');
    let id = sessionStorage.getItem('id') || 1;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-listings-by-user?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        console.log(result);
        setListings(result);
      });
  };

  let handleView = (id) => {
    // TODO: Load listing view page
    console.log('view');
  };

  let handleEdit = (id) => {
    // TODO: Load edit listing page
    console.log('edit');
  };

  let handleDelete = (id) => {
    // TODO: Delete listing
    console.log('delete');
  };

  useEffect(loadListings, [setListings]);

  return (
    <div className='list-container'>
      <Typography component='h1' variant='h5'>
        My Listings
      </Typography>
      <br />
      <Grid className={classes.table} container alignItems='center' justify='space-between'>
        {listings.map((listing) => (
          <Grid className={classes.row} container alignItems='center' justify='space-between'>
            <Grid
              className={classes.title}
              item
              container
              spacing={2}
              alignItems='center'
              justify='flex-start'
              xs={9}
              onClick={handleView}
            >
              <Grid item>
                <Typography variant='h6'>{listing.title}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>({listing.categoryName})</Typography>
              </Grid>
              <ChevronRightIcon />
            </Grid>
            <Grid item container spacing={2} alignItems='center' justify='flex-end' xs={3}>
              <Grid item>
                <Button variant='contained' color='primary' onClick={handleEdit}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={handleDelete}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
