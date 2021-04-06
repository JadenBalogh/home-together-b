import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Grid, Button, Card } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import './Listings.css';

export default function ManageListings() {
  let history = useHistory();
  let [listings, setListings] = useState([]);

  let loadListings = () => {
    let id = sessionStorage.getItem('id') || 1;

    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-listings-by-user?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        setListings(result);
      });
  };

  let handleCreate = () => {
    history.push('/create-listing');
  };

  let handleView = (id) => {
    history.push('/listing/' + id);
  };

  let handleEdit = (id) => {
    history.push('/edit-listing/' + id);
  };

  let handleDelete = (id) => {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/delete-listing?';
    fetch(url + route, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    }).then(() => {
      loadListings();
    });
  };

  useEffect(loadListings, [setListings]);

  return (
    <Card className='page'>
      <Grid container justify='center'>
        <Typography component='h1' variant='h5'>
          {sessionStorage.getItem('accountType') === '1' ? 'My Listings' : 'My Homes'}
        </Typography>
      </Grid>
      <br />
      <Grid container alignItems='center' justify='space-between'>
        {listings.map((listing) => (
          <Grid key={listing.id} className='listing-row' container alignItems='center' justify='space-between'>
            <Grid
              className='listing-title'
              item
              container
              spacing={2}
              alignItems='center'
              justify='flex-start'
              xs={9}
              onClick={() => handleView(listing.id)}
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
                <Button variant='contained' color='primary' onClick={() => handleEdit(listing.id)}>
                  Edit
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' color='secondary' onClick={() => handleDelete(listing.id)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <br />
      <Grid container>
        <Grid item align='center' xs={12}>
          <Button variant='contained' color='primary' onClick={handleCreate}>
            {sessionStorage.getItem('accountType') === '1' ? 'New Listing' : 'Add Home'}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
