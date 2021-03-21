import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Card, Button, Grid, Typography, Divider } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import './Listings.css';

export default function Listing() {
  const { id } = useParams();
  let history = useHistory();
  let [listing, setListing] = useState({});

  let loadListing = () => {
    const url = process.env.REACT_APP_LOCAL_URL || '';
    const route = '/api/get-listing?';
    const params = new URLSearchParams('id=' + id).toString();
    fetch(url + route + params)
      .then((raw) => raw.json())
      .then((result) => {
        if (result.err) {
          window.alert(result.err);
          return;
        }
        setListing({ ...result });
      });
  };

  useEffect(loadListing, [id]);

  return (
    <Card className='page'>
      <Grid container>
        <Grid item container xs={10}>
          <Grid item container spacing={2} alignItems='center' justify='flex-start'>
            <Grid item>
              <Typography variant='h5'>{listing.title}</Typography>
            </Grid>
            <Grid item>
              <Typography variant='subtitle1'>({listing.categoryName})</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container alignItems='center' justify='flex-end' xs={2}>
          <Grid item>
            <Rating name='rating' value={Number(listing.ratingAverage)} defaultValue={5} precision={0.5} readOnly />
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <br />
      <Grid container direction='column'>
        <Grid item container xs={12}>
          <Grid item xs={4}>
            <img className='listing-image' alt='Sample' src={require('../shared/img.png').default} />
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body1'>
              <b>About</b>
            </Typography>
            <Typography variant='body1'>{listing.description}</Typography>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid item container xs={12} justify='space-between'>
          <Grid item container xs={4} justify='flex-start'>
            <Typography variant='body2'>
              <b>Website</b>
            </Typography>
          </Grid>
          <Grid item container xs={4} justify='center'>
            <Typography variant='body2'>
              <b>Email</b>
            </Typography>
          </Grid>
          <Grid item container xs={4} justify='flex-end'>
            <Typography variant='body2'>
              <b>Phone Number</b>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12} justify='space-between'>
          <Grid item container xs={4} justify='flex-start'>
            <Typography variant='body2'>{listing.website}</Typography>
          </Grid>
          <Grid item container xs={4} justify='center'>
            <Typography variant='body2'>{listing.email}</Typography>
          </Grid>
          <Grid item container xs={4} justify='flex-end'>
            <Typography variant='body2'>{listing.phone}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <Divider />
      <br />
      <Grid container>
        <Grid item container xs={12} justify='center' spacing={2}>
          <Grid item align='center' xs={2}>
            <Button variant='contained' onClick={history.goBack}>
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
